import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID, IsObject } from 'class-validator';

export class CreateFormResponseDto {
  @ApiProperty({
    example: '34c86666-afc2-4f71-8363-7da6f123c534',
    description: 'ID of the form the response is for.',
  })
  @IsUUID()
  @IsNotEmpty()
  formId: string;

  @ApiProperty({
    example: 'a0e92e20-85b8-4f47-8f0e-7fb6e45d9cf3',
    description: 'ID of the user submitting the form.',
  })
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({
    example: {
      ndisnumber: '12341213',
      fullName: 'John Doe',
      service: 'Testing Service creation',
    },
    description: 'The actual data filled out by the user.',
  })
  @IsNotEmpty()
  @IsObject()
  response: Record<string, any>;
}
