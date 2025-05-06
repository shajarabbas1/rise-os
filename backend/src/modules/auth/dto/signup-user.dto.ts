import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export default class SignupUserDto {
  @ApiProperty({
    example: 'waqar.hussain@piecyfer.com',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'John Doe',
    required: true,
    description: 'The full name of the user.',
  })
  @IsNotEmpty()
  @MinLength(3)
  @IsString()
  fullName: string;

  @ApiProperty({
    example: 'admin',
    required: true,
  })
  @IsString()
  password?: string;
}
