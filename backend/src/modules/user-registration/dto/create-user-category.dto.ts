import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export default class CreateUserCategoryDto {
  @ApiProperty({
    example: '7c812ae3-9c23-4c6f-b4f6-d85936510cf0',
    description: 'The ID of the user applying for the category.',
    required: true,
  })
  @IsNotEmpty()
  @IsUUID()
  userId: string;

  @ApiProperty({
    example: 'e76f8201-c5ae-4f8f-bd80-f35f4e6a3e1d',
    description: 'The ID of the category the user is selecting.',
    required: true,
  })
  @IsNotEmpty()
  @IsUUID()
  categoryId: string;
}
