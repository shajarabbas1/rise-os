import { IsString, IsOptional, IsNotEmpty, IsUUID } from 'class-validator';
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

  @ApiProperty({
    example: 'ec528ef7-b34f-497a-a7e2-0a26f35ac7c5',
    description: 'The ID of the associated category.',
    required: true,
  })
  @IsNotEmpty()
  @IsUUID()
  categoryId: string;
}
