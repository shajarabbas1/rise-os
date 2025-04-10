import { IsString, IsOptional, IsNotEmpty } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export default class CreateFormDto {
  @ApiProperty({
    description: 'Name of the form',
    example: 'NDIS Service Agreement Form',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({
    description: 'Optional description for the form',
    example:
      'This agreement is made between the participant and the service provider under the National Disability Insurance Scheme (NDIS).',
  })
  @IsOptional()
  @IsString()
  description?: string;
}
