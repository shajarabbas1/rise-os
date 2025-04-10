import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export default class CreateCategoryDto {
  @ApiProperty({
    example: 'Health Services',
    description: 'The name of the category.',
    required: true,
  })
  @IsNotEmpty()
  @MinLength(3)
  @IsString()
  name: string;

  @ApiProperty({
    example: 'Services related to health and wellness.',
    description: 'A description of the category.',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  description: string;
}
