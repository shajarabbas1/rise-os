import { generate } from 'otp-generator';
import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { hash } from 'bcryptjs';
import FilterUserDto from './dto/filter-user.dto';
import OffsetPaginationArgs from 'src/common/infra/offset-pagination/offset-pagination.args';
import offsetPaginate from 'src/common/infra/offset-pagination/offset-paginate';
import User from './entities/user.entity';
import { FindManyOptions, Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import UpdateUserDto from './dto/update-user.dto';
import MailGunService from '../app-shared/services/mail-gun.service';
import UserEmailDto from '../auth/dto/email.dto';

@Injectable()
export default class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    private mailGunService: MailGunService,
  ) {}

  generateOTP() {
    // 6 digit OTP code
    return generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });
  }

  async findById(
    id: string,
    throwException = true,
    loadRelations = true,
  ): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
      ...(loadRelations && {
        relations: [
          'userCategories',
          'userCategories.category',
          'userSubCategories',
          'userSubCategories.subCategory',
        ],
      }),
    });

    if (!user && throwException) {
      throw new NotFoundException('User not found against given Id');
    }

    return user;
  }

  async findByEmail(email: string, throwException = true) {
    const user = await this.userRepository.findOne({
      where: { email: email.toLowerCase() },
      withDeleted: true,
      select: [
        'id',
        'fullName',
        'email',
        'emailVerified',
        'deletedAt',
        'password',
        'role',
      ],
    });

    if (!user && throwException) {
      throw new NotFoundException('Record not found against given email');
    }

    return user;
  }

  async create(payload: UserEmailDto) {
    const { email } = payload;

    // Check if the email is already in use
    const existingRecord = await this.findByEmail(email, false);

    if (existingRecord && !existingRecord.deletedAt) {
      throw new ConflictException(
        'Email is already registered, Please use different email',
      );
    }

    if (existingRecord && existingRecord.deletedAt) {
      await this.userRepository.delete(existingRecord.id); // Permanently delete the record
    }

    const user = this.userRepository.create({
      email,
      emailOTP: this.generateOTP(),
    });

    // send email to user for email verification
    // await this.mailGunService.sendEmail(
    //   email,
    //   'Please verify your email.',
    //   'Below is your OTP code for email verification',
    //   `<strong> ${emailOTP}</strong>`,
    // );

    return await this.userRepository.save(user);
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const { fullName } = updateUserDto;

    const updateUser = await this.userRepository.update(id, {
      fullName,
    });

    if (updateUser.affected === 0) {
      throw new NotFoundException('Record not found against given Id');
    }

    return await this.findById(id);
  }

  async findAll(
    paginationArgs: OffsetPaginationArgs,
    filterUserInput: FilterUserDto,
  ) {
    const { email, fullName, createdAt, updatedAt, ...otherFilters } =
      filterUserInput;

    // Prepare filterOptions
    const filterOptions: FindManyOptions<User> = {
      where: {
        deletedAt: null,
        ...(email ? { email: Like(`%${email}%`) } : {}),
        ...(fullName ? { fullName: Like(`%${fullName}%`) } : {}),
        ...otherFilters,
      },

      order: { createdAt: 'DESC' },
    };

    const result = await offsetPaginate(
      this.userRepository,
      paginationArgs,
      filterOptions,
    );

    return result;
  }

  async delete(id: string): Promise<boolean> {
    await this.findById(id);

    await this.userRepository.softDelete(id);

    return true;
  }

  // verify user email by otp code
  async verifyEmail(emailOTP: string): Promise<boolean> {
    const user = await this.userRepository.findOne({
      where: { emailOTP },
    });

    if (!user) {
      throw new NotFoundException(
        'Your login code was incorrect or expired. Please try again.',
      );
    }

    await this.userRepository.update(user.id, {
      emailVerified: true,
      emailOTP: null,
    });

    return true;
  }

  // send password update link to user email with token
  async forgotPassword(
    email: string,
    token: string,
    forgetPasswordURL: string,
  ): Promise<boolean> {
    const user = await this.findByEmail(email);

    await this.userRepository.update(user.id, { forgetPasswordToken: token });

    // send email to user including link to update password
    await this.mailGunService.sendEmail(
      email,
      'Use the link to reset your password',
      'Click on the link below to reset your password',
      `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 20px auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
        <h2 style="color: #333;">Reset Your Password</h2>
        <p>Hello,</p>
        <p>You recently requested to reset your password. Click the button below to proceed:</p>
        <a href="${forgetPasswordURL}" style="display: inline-block; padding: 10px 15px; font-size: 16px; color: white; background-color: #007bff; text-decoration: none; border-radius: 5px;">Reset Password</a>
        <p>If you did not request this, please ignore this email.</p>
        <p>Thanks, <br/> Your App Team</p>
      </div>`,
    );

    return true;
  }

  async saveUser(user: User) {
    return await this.userRepository.save(user);
  }

  async resendEmailVerification(payload: UserEmailDto): Promise<boolean> {
    const user = await this.findByEmail(payload.email);

    if (user.emailVerified) {
      throw new BadRequestException(
        'Email already verified, please proceed further.',
      );
    }
    // to send otp to the user email for email verification
    const emailOTP = this.generateOTP();

    user.emailOTP = emailOTP;
    await this.userRepository.save(user);

    // send email to user for email verification
    // await this.mailGunService.sendEmail(
    //   email,
    //   'Please verify your email.',
    //   'Below is your OTP code for email verification',
    //   `<strong> ${emailOTP}</strong>`,
    // );

    return true;
  }

  async setUserNameAndPasword(payload: UpdateUserDto): Promise<User> {
    const user = await this.findByEmail(payload.email);

    if (user.isRegistrationComplete) {
      throw new BadRequestException(
        'User registration is already completed, please use different endpoint to update the profile',
      );
    }

    const { fullName, password } = payload;
    const hashedPassword = await hash(password, 10);

    await this.userRepository.update(user.id, {
      fullName,
      password: hashedPassword,
      isRegistrationComplete: true,
    });

    return await this.findById(user.id, true, false);
  }
}
