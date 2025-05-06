import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Get,
  Res,
  Put,
  UseGuards,
  Req,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import AuthService from './auth.service';
import LoginDto from './dto/login.dto';
import UserEmailDto from './dto/email.dto';
import UpdateUserDto from '../user/dto/update-user.dto';
import SignupUserDto from './dto/signup-user.dto';
import { Response } from 'express';
import { AuthenticationGuard } from '../../common/guards/authentication.guard';

@Controller('auth')
@ApiTags('Auth')
export default class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  @ApiOperation({
    summary: 'Sign up a new user',
    description:
      'Creates a new user account. The email must be unique, and all required fields must be provided.',
  })
  @ApiResponse({
    status: 201,
    description: 'User successfully created.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request: Invalid input data.',
  })
  @ApiResponse({
    status: 409,
    description: 'Conflict: Email is already in use.',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error: Something went wrong.',
  })
  async signUp(
    @Body() payload: SignupUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const data = await this.authService.create(payload);
    res.cookie('accessToken', data.accessToken, {
      httpOnly: true,
      secure: false,
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      sameSite: 'lax',
      path: '/',
    });
    return {
      message: 'User created successfully.',
      statusCode: HttpStatus.CREATED,
      data,
    };
  }

  @Post('/login')
  @ApiOperation({ summary: 'Log in a user to the system' })
  @ApiResponse({
    status: 200,
    description:
      'User successfully logged in. Returns a token for authentication.',
  })
  @ApiResponse({
    status: 401,
    description: 'Invalid credentials provided.',
  })
  @HttpCode(200) // We are not creating a new records so the status will be OK instead of CREATED
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const data = await this.authService.login(loginDto);

    const dataToSend = {
      message: 'Login successful',
      statusCode: HttpStatus.OK,
      data,
    };
    res.cookie('accessToken', data.accessToken, {
      httpOnly: true,
      secure: false,
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      sameSite: 'lax',
      path: '/',
    });
    return dataToSend;
  }

  @Get('validate-token')
  @UseGuards(AuthenticationGuard)
  validateToken(@Req() req: any) {
    return { message: 'successfully', user: req.user };
  }

  @Post('/resend-otp')
  @ApiOperation({
    summary: 'Resend OTP for email verification',
    description: 'Resends the OTP (for email verification) to the user email.',
  })
  @ApiResponse({
    status: 201,
    description: 'OTP successfully sent to the user email.',
  })
  @ApiResponse({
    status: 404,
    description: 'User not found.',
  })
  async resendEmailVerification(@Body() payload: UserEmailDto) {
    const data = await this.authService.resendEmailVerification(payload);

    return {
      message: 'OTP sent successfully, please check your email.',
      statusCode: HttpStatus.CREATED,
      data,
    };
  }

  @Post('validate-email')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Check whether a user exists with the given email.',
  })
  @ApiResponse({
    status: 200,
    description: 'True if user exists, otherwise false.',
  })
  async checkExistingUserByEmail(@Body() payload: UserEmailDto) {
    const { email } = payload;

    const isExist = await this.authService.checkExistingUserByEmail(email);

    return {
      data: isExist,
      statusCode: HttpStatus.OK,
    };
  }

  @Patch(':emailOTP')
  @ApiOperation({ summary: 'Verify user email by OTP code' })
  @ApiParam({
    name: 'emailOTP',
    description: 'Enter the OTP from the email',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'User email verified successful.',
  })
  async updateUser(@Param('emailOTP') emailOTP: string) {
    await this.authService.verifyEmail(emailOTP);

    return {
      message: 'Email verified successfully',
      statusCode: 200,
    };
  }

  @Post('sendresetpasswordlink')
  @HttpCode(200)
  @ApiOperation({ summary: 'Send password reset link to user email' })
  @ApiResponse({
    status: 200,
    description: 'Password reset link sent successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'User with this email does not exist',
  })
  async findById(@Body() payload: UserEmailDto) {
    await this.authService.forgotPassword(payload.email);

    return {
      message:
        'Password reset link has been sent to your email. Please check your inbox.',
      statusCode: HttpStatus.OK,
    };
  }

  @Patch('update-password/:token')
  @ApiOperation({ summary: 'Update password using a token' })
  @ApiParam({
    name: 'token',
    type: String,
    description: 'The reset password token sent to the user',
  })
  @ApiBody({
    type: String,
    description: 'The new password data.',
  })
  @ApiResponse({
    status: 200,
    description: 'Password updated successfully.',
  })
  @ApiResponse({
    status: 400,
    description:
      'Bad request - Invalid or expired token, or other validation issues.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Token verification failed.',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error.',
  })
  async updatePasswordByToken(
    @Param('token') token: string,
    @Body() password: string,
  ) {
    await this.authService.updatePasswordByToken(token, password);

    return {
      message: 'Password updated successfully.',
      statusCode: HttpStatus.OK,
    };
  }

  @Put()
  @ApiOperation({
    summary: 'Set user full name, password and return user with token.',
  })
  @ApiResponse({
    status: 200,
    description: 'User details updated successful.',
  })
  async setUserNameAndPasword(@Body() updateUserDto: UpdateUserDto) {
    const data = await this.authService.setUserNameAndPasword(updateUserDto);

    return {
      message: 'User data updated successfully',
      statusCode: 200,
      data,
    };
  }
}
