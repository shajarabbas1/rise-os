import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class CreateEmailTemplateDto {
  @ApiProperty({
    description: 'Subject line of the email template (must be unique)',
    example: 'Welcome to Our System',
  })
  @IsString()
  subject: string;

  @ApiPropertyOptional({
    description:
      'Group name to categorize templates (e.g., account_creation, notifications)',
    example: 'account_creation',
  })
  @IsOptional()
  @IsString()
  group?: string;

  @ApiProperty({
    description: 'Main HTML content of the email (must be unique)',
    example: '<h1>Welcome, {{name}}!</h1><p>Thanks for joining.</p>',
  })
  @IsString()
  htmlContent: string;

  @ApiPropertyOptional({
    description:
      'Additional information about the template’s purpose and usage',
    example: 'Used when a user signs up or creates an account',
  })
  @IsOptional()
  @IsString()
  metaData?: string;

  @ApiPropertyOptional({
    description:
      'Plain text version of the email (for clients that don’t support HTML)',
    example: 'Welcome, {{name}}! Thanks for joining.',
  })
  @IsOptional()
  @IsString()
  textContent?: string;

  @ApiPropertyOptional({
    description: 'Whether the template is archived (soft deleted)',
    example: false,
    default: false,
  })
  @IsOptional()
  @IsBoolean()
  archived?: boolean;

  @ApiPropertyOptional({
    description:
      'Whether the template is a system default (prevents accidental changes)',
    example: true,
    default: false,
  })
  @IsOptional()
  @IsBoolean()
  isSystemDefault?: boolean;
}
