import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export default class CreateUserDto {
  @IsOptional()
  @IsBoolean()
  emailVerified?: boolean;

  @ApiProperty({
    example: 'Waqar Hussain',
    description: 'The full name of the user.',
    required: true,
  })
  @IsNotEmpty()
  @MinLength(3)
  @IsString()
  fullName: string;

  @ApiProperty({
    example: 'waqar.hussain@piecyfer.com',
    required: true,
  })
  @IsEmail()
  @IsOptional()
  @MinLength(5)
  @IsString()
  email?: string;

  @ApiProperty({
    example: 'admin',
    required: true,
  })
  @IsString()
  @IsOptional()
  password?: string;

  @ApiProperty({
    example: 'cus_J7LFL2JjL7qS9a',
    description: 'The Stripe Customer ID for the user.',
    required: false,
  })
  @IsOptional()
  @IsString()
  stripeCustomerId?: string;
}
