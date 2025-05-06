import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { FormSection } from '../entities/form-section.entity';

import CreateFormSectionDto from '../dto/create-form-section.dto';
import UpdateFormSectionDto from '../dto/update-form-section.dto';

import FormService from './form.service';

@Injectable()
export default class FormSectionService {
  constructor(
    @InjectRepository(FormSection)
    private readonly formSectionRepository: Repository<FormSection>,

    private formService: FormService,
  ) {}

  async findById(id: string, throwException = true): Promise<FormSection> {
    const data = await this.formSectionRepository.findOne({ where: { id } });

    if (!data && throwException) {
      throw new NotFoundException('Form section not found against given Id');
    }

    return data;
  }

  async createFormSection(payload: CreateFormSectionDto) {
    const { title, formId } = payload;

    await this.formService.findById(formId); // Check if the form exists

    const existingRecord = await this.formSectionRepository.findOne({
      where: { title: title.toLowerCase() },
    });

    if (existingRecord && existingRecord.deletedAt) {
      await this.formSectionRepository.delete(existingRecord.id); // Permanently delete the record
    }

    if (existingRecord && !existingRecord.deletedAt) {
      throw new ConflictException('Form section already exists with this name');
    }

    const newFormSection = this.formSectionRepository.create(payload);

    return await this.formSectionRepository.save(newFormSection);
  }

  async updateFormSection(
    id: string,
    payload: UpdateFormSectionDto,
  ): Promise<FormSection> {
    const updateData = await this.formSectionRepository.update(id, {
      title: payload.title,
      description: payload.description,
      order: payload.order,
    });

    if (updateData.affected === 0) {
      throw new NotFoundException('Form section not found against given Id');
    }

    return await this.findById(id);
  }

  async deleteFormSection(id: string): Promise<boolean> {
    await this.findById(id);

    await this.formSectionRepository.softDelete(id);

    return true;
  }
}
