import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength, IsUUID } from 'class-validator';

export default class CreateSubCategoryDto {
  @ApiProperty({
    example: 'Group Therapy',
    description: 'The name of the sub-category.',
    required: true,
  })
  @IsNotEmpty()
  @MinLength(3)
  @IsString()
  name: string;

  @ApiProperty({
    example: 'Services related to health and wellness.',
    description: 'A description of the sub-category.',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({
    example: 'ec528ef7-b34f-497a-a7e2-0a26f35ac7c5',
    description: 'The ID of the parent category.',
    required: true,
  })
  @IsNotEmpty()
  @IsUUID()
  categoryId: string;
}
