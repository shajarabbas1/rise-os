import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString, MinLength } from 'class-validator';

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

  @ApiProperty({
    example: ['medical', 'wellness', 'therapy'],
    description: 'Tags related to the category.',
    required: false,
    type: [String],
  })
  @IsArray()
  @IsString({ each: true })
  tags: string[];
}
