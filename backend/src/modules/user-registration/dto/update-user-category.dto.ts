import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsBoolean } from 'class-validator';

export class UpdateUserCategoryDto {
  @ApiProperty({
    example: true,
    description:
      'Flag indicating whether the category selection has been approved.',
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  isApproved?: boolean;
}
