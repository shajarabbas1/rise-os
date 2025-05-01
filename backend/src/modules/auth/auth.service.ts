import { hash, compare } from 'bcryptjs';

import { Injectable, UnauthorizedException } from '@nestjs/common';

import UserService from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import LoginDto from './dto/login.dto';
import UserEmailDto from './dto/email.dto';
import UpdateUserDto from '../user/dto/update-user.dto';
import SignupUserDto from './dto/signup-user.dto';

@Injectable()
export default class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async generateJwt(user: any, extendPayload = true) {
    const payload = {
      id: user.id,
      name: user.fullName,
      email: user.email,
      role: user.role,
    };

    // Override the expiry to 20 minutes if shortLived is true
    const options = !extendPayload ? { expiresIn: '50m' } : undefined; // Use default options if not short-lived
    const accessToken = await this.jwtService.signAsync(payload, options);

    return accessToken;
  }

  async create(payload: SignupUserDto) {
    const user = await this.userService.create(payload);
    const accessToken = await this.generateJwt(user);

    return { ...user, accessToken };
  }

  async verifyEmail(emailOTP: string): Promise<boolean> {
    return await this.userService.verifyEmail(emailOTP);
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    const user = await this.userService.findByEmail(email, false);

    if (!user) {
      throw new UnauthorizedException('Invalid username or password');
    }

    const passwordMatch =
      user.password && (await compare(password, user?.password));

    if (!passwordMatch) {
      throw new UnauthorizedException('Invalid username or password');
    }

    const accessToken = await this.generateJwt(user);

    return { ...user, accessToken };
  }

  async forgotPassword(email: string): Promise<boolean> {
    const user = await this.userService.findByEmail(email);
    const token = await this.generateJwt(user, false);

    const frontendURL = this.configService.getOrThrow<string>('FRONTEND_URL');
    const forgetPasswordURL = `${frontendURL}resetpassword?token=${token}`;

    await this.userService.forgotPassword(email, token, forgetPasswordURL);

    return true;
  }

  async updatePasswordByToken(token: string, password: string) {
    try {
      const secret = this.configService.getOrThrow<string>('JWT_SECRET_KEY');

      const payload = await this.jwtService.verifyAsync(token, { secret });

      // Fetch the user based on the id in the payload
      const user = await this.userService.findById(payload.id);

      // Check if forgetPasswordToken exists and matches the provided token
      if (!user.forgetPasswordToken || user.forgetPasswordToken !== token) {
        throw new UnauthorizedException(
          'Invalid or expired Forget password link.',
        );
      }

      // Hash the new password and clear the forget password token
      user.password = await hash(password.toString(), 10);
      user.forgetPasswordToken = null;

      // Save the updated user
      await this.userService.saveUser(user);

      return true;
    } catch (error) {
      console.error('JWT Verification Error:', error);
      throw error.name === 'TokenExpiredError'
        ? new UnauthorizedException('Token has expired.')
        : new UnauthorizedException('Invalid or expired Forget password link.');
    }
  }

  async checkExistingUserByEmail(email: string): Promise<boolean> {
    const user = await this.userService.findByEmail(email, false);
    return user ? true : false;
  }

  async resendEmailVerification(payload: UserEmailDto) {
    return await this.userService.resendEmailVerification(payload);
  }

  async setUserNameAndPasword(updateUserDto: UpdateUserDto) {
    const user = await this.userService.setUserNameAndPasword(updateUserDto);

    const accessToken = await this.generateJwt(user);

    return { ...user, accessToken };
  }
}
