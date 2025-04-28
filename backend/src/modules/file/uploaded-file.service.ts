import { InjectRepository } from '@nestjs/typeorm';
import { UploadedFile } from './entities/uploaded-file.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateUploadedFileDto } from './dto/create-uploaded-file.dto';

@Injectable()
export default class UploadedFileService {
  constructor(
    @InjectRepository(UploadedFile)
    private readonly uploadedFileRepository: Repository<UploadedFile>,
  ) {}

  // get all the files uploaded by user
  async findByUserId(userId: string) {
    const uploadedFiles = await this.uploadedFileRepository.find({
      where: { userId },
    });

    if (!uploadedFiles || uploadedFiles.length < 1) {
      throw new NotFoundException('User has not uploaded anything');
    }

    return uploadedFiles;
  }

  async create(payload: CreateUploadedFileDto) {
    const newUploadedFile = this.uploadedFileRepository.create(payload);

    return await this.uploadedFileRepository.save(newUploadedFile);
  }

  async findById(id: string, throwException = true): Promise<UploadedFile> {
    const uploadedFile = await this.uploadedFileRepository.findOne({
      where: { id },
    });

    if (!uploadedFile && throwException) {
      throw new NotFoundException('Uploaded file not found against given Id');
    }

    return uploadedFile;
  }

  async delete(id: string): Promise<boolean> {
    await this.findById(id);
    await this.uploadedFileRepository.softDelete(id);
    return true;
  }
}
