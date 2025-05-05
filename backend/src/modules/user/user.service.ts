import { generate } from 'otp-generator';
import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { hash } from 'bcryptjs';
import FilterUserDto from './dto/filter-user.dto';
import OffsetPaginationArgs from '../../common/infra/offset-pagination/offset-pagination.args';
import offsetPaginate from '../../common/infra/offset-pagination/offset-paginate';
import User from './entities/user.entity';
import { FindManyOptions, Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import UpdateUserDto from './dto/update-user.dto';
import UserEmailDto from '../auth/dto/email.dto';
import SignupUserDto from '../auth/dto/signup-user.dto';
import EmailTemplateService from '../app-shared/services/email-template.service';
import { EmailTemplateConstant } from '../../constant';
import HandlebarService from '../app-shared/services/handlebar.service';
import QueueService from '../queue-module/queue.service';

@Injectable()
export default class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    private emailTemplateService: EmailTemplateService,
    private handlebarService: HandlebarService,

    private queueService: QueueService,
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

  async updateStripeCustomerId(userId: string, customerId: string) {
    await this.userRepository.update(userId, { stripeCustomerId: customerId });
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

  async create(payload: SignupUserDto) {
    const { email, fullName, password } = payload;
    const hashedPassword = await hash(password, 10);

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
      password: hashedPassword,
      fullName,
    });

    const emailTemplate = await this.emailTemplateService.findById(
      EmailTemplateConstant.welcomeEmailId,
    );

    const html = this.handlebarService.compile(emailTemplate.htmlContent, {
      fullName: user.fullName,
    });

    const emailData = { to: email, subject: emailTemplate.subject, html };
    await this.queueService.queueEmail(emailData);

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

  async findByStripeCustomerId(stripeCustomerId: string): Promise<User> {
    return this.userRepository.findOne({ where: { stripeCustomerId } });
  }

  async updateSubscription(
    stripeCustomerId: string,
    subscriptionId: string,
    status: string,
  ): Promise<User> {
    const user = await this.findByStripeCustomerId(stripeCustomerId);

    if (!user) {
      throw new Error('User not found');
    }

    await this.userRepository.update(user.id, {
      subscriptionId,
      subscriptionStatus: status,
      isPremium: ['active', 'trialing'].includes(status),
    });

    // Send confirmation email
    if (['active', 'trialing'].includes(status)) {
      // await this.mailService.sendSubscriptionConfirmation(user.email, status);
    }

    return this.findById(user.id);
  }

  async removeSubscription(stripeCustomerId: string): Promise<User> {
    const user = await this.findByStripeCustomerId(stripeCustomerId);

    if (!user) {
      throw new Error('User not found');
    }

    await this.userRepository.update(user.id, {
      subscriptionId: null,
      subscriptionStatus: 'canceled',
      isPremium: false,
    });

    // await this.mailService.sendSubscriptionCancellation(user.email);

    return this.findById(user.id);
  }

  async notifyPaymentFailed(stripeCustomerId: string): Promise<void> {
    const user = await this.findByStripeCustomerId(stripeCustomerId);

    if (!user) {
      throw new Error('User not found');
    }

    // await this.mailService.sendPaymentFailedNotification(user.email);
  }
}
