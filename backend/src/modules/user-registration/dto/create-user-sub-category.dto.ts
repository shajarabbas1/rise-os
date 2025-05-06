import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export default class CreateUserSubCategoryDto {
  @ApiProperty({
    example: '7c812ae3-9c23-4c6f-b4f6-d85936510cf0',
    description: 'The ID of the user applying for the sub-category.',
    required: true,
  })
  @IsNotEmpty()
  @IsUUID()
  userId: string;

  @ApiProperty({
    example: 'd84f8461-31db-4be9-b96f-b70896079c59',
    description: 'The ID of the sub-category the user is selecting.',
    required: true,
  })
  @IsNotEmpty()
  @IsUUID()
  subCategoryId: string;
}
