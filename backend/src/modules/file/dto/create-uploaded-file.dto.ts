import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsInt,
} from 'class-validator';
import { FileTypeEnum } from '../entities/uploaded-file.entity';

export class CreateUploadedFileDto {
  @ApiProperty({
    description: 'Original name of the file as uploaded by the user',
    example: 'profile-picture.png',
    required: false,
  })
  @IsOptional()
  @IsString()
  originalName?: string;

  @ApiProperty({
    description: 'Size of the uploaded file in bytes',
    example: 102400,
    required: false,
  })
  @IsOptional()
  @IsInt()
  size?: number;

  @ApiProperty({
    description: 'Type of file, such as IMAGE or FILE',
    enum: FileTypeEnum,
    example: FileTypeEnum.IMAGE,
  })
  @IsEnum(FileTypeEnum)
  type: FileTypeEnum;

  @ApiProperty({
    description: 'URL or path where the file is stored',
    example: 'https://images.Crea.com/photo-1744719256525-3deab6fd16ac?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxN3x8fGVufDB8fHx8fA%3D%3D',
  })
  @IsString()
  @IsNotEmpty()
  fileURL: string;

  @ApiProperty({
    description: 'ID of the user who uploaded the file',
    example: 'c716d3b2-e1e2-400f-9f2b-75c9d6d1e519',
  })
  @IsString()
  @IsNotEmpty()
  userId: string;
}
