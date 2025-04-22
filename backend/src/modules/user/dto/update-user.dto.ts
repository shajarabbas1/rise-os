import { IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export default class UpdateUserDto {
  @ApiProperty({
    example: 'waqar.hussain@piecyfer.com',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'John',
    required: false,
    description: 'The full name of the user.',
  })
  @IsOptional()
  @IsNotEmpty()
  @MinLength(3)
  @IsString()
  fullName?: string;

  @ApiProperty({
    example: 'admin',
    required: true,
  })
  @IsString()
  @IsOptional()
  password?: string;
}
