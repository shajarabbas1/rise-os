import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UploadedFile } from './entities/uploaded-file.entity';
import UploadedFileService from './uploaded-file.service';
import UploadedFileController from './uploaded-file.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UploadedFile])],
  controllers: [UploadedFileController],
  providers: [UploadedFileService],
  exports: [],
})
export default class UploadedFileModule {}
