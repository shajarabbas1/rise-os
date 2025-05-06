import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsBoolean,
  IsNumber,
  IsArray,
  IsObject,
  IsUUID,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateFormFieldDto {
  @ApiProperty({
    description: 'Unique name/key of the field',
    example: 'email',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Label to be shown for the field',
    example: 'Email Address',
  })
  @IsString()
  @IsNotEmpty()
  label: string;

  @ApiProperty({
    description: 'Type of input field (e.g., text, email, password)',
    example: 'email',
  })
  @IsString()
  @IsNotEmpty()
  type: string;

  @ApiPropertyOptional({
    description: 'Placeholder text inside the input field',
    example: 'Enter your email',
  })
  @IsOptional()
  @IsString()
  placeholder?: string;

  @ApiPropertyOptional({
    description: 'Whether this field is required or not',
    example: true,
    default: false,
  })
  @IsOptional()
  @IsBoolean()
  isRequired?: boolean;

  @ApiPropertyOptional({
    description: 'Validation rules for the field',
    example: { required: 'Email is required' },
  })
  @IsOptional()
  @IsObject()
  validationRules?: Record<string, any>;

  @ApiPropertyOptional({
    description: 'Options for select, radio, or dropdown fields',
    example: ['Option 1', 'Option 2'],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  options?: string[];

  @ApiPropertyOptional({
    description: 'Row number for layout purposes within a section',
    example: 1,
    default: 1,
  })
  @IsOptional()
  @IsNumber()
  rowNumber?: number;

  @ApiPropertyOptional({
    description: 'Order of the field within the row',
    example: 1,
  })
  @IsOptional()
  @IsNumber()
  order?: number;

  @ApiProperty({
    description: 'ID of the form this field belongs to',
    example: '34c86666-afc2-4f71-8363-7da6f123c534',
  })
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  formId: string;

  @ApiPropertyOptional({
    description: 'ID of the section this field belongs to',
    example: '70806342-d123-41c3-9ab6-8a9e67137c87',
  })
  @IsUUID()
  @IsString()
  @IsNotEmpty()
  sectionId?: string;
}
