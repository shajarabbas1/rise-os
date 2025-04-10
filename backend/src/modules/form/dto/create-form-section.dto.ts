import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  IsUUID,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export default class CreateFormSectionDto {
  @ApiProperty({
    description: 'Title of the form section',
    example: 'Participant Details',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiPropertyOptional({
    description: 'Description of the form section',
    example: 'Participant details abd identification',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    description: 'Order of this section in the form',
    example: 1,
  })
  @IsOptional()
  @IsNumber()
  order?: number;

  @ApiProperty({
    example: '34c86666-afc2-4f71-8363-7da6f123c534',
    description: 'The ID of the form.',
    required: true,
  })
  @IsNotEmpty()
  @IsUUID()
  formId: string;
}
