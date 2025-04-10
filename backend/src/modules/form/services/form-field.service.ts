import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import FormService from './form.service';
import { FormField } from '../entities/form-field.entity';
import FormSectionService from './form-section.service';
import { CreateFormFieldDto } from '../dto/create-form-field.dto';
import UpdateFormFieldDto from '../dto/update-form-field.dto';

@Injectable()
export default class FormFieldService {
  constructor(
    @InjectRepository(FormField)
    private readonly formFieldRepository: Repository<FormField>,

    private formService: FormService,
    private formSectionService: FormSectionService,
  ) {}

  async findById(id: string, throwException = true): Promise<FormField> {
    const data = await this.formFieldRepository.findOne({ where: { id } });

    if (!data && throwException) {
      throw new NotFoundException('Form field not found against given Id');
    }

    return data;
  }

  async createFormField(payload: CreateFormFieldDto) {
    const { name, sectionId, formId } = payload;

    // Use Promise.all to run both validations concurrently
    await Promise.all([
      await this.formService.findById(formId), // Check if the form exists
      await this.formSectionService.findById(sectionId), // Check if the form exists
    ]);

    const existingRecord = await this.formFieldRepository.findOne({
      where: { name: name.toLowerCase(), sectionId, formId },
    });

    if (existingRecord && existingRecord.deletedAt) {
      await this.formFieldRepository.delete(existingRecord.id); // Permanently delete the record
    }

    if (existingRecord && !existingRecord.deletedAt) {
      throw new ConflictException(
        'Form section already exists with this name, form, section combination',
      );
    }

    const newFormField = this.formFieldRepository.create(payload);

    return await this.formFieldRepository.save(newFormField);
  }

  async updateFormField(
    id: string,
    payload: UpdateFormFieldDto,
  ): Promise<FormField> {
    const { formId, sectionId } = payload;

    // Validate only the IDs that are present
    await Promise.all([
      formId ? this.formService.findById(formId) : Promise.resolve(),
      sectionId
        ? this.formSectionService.findById(sectionId)
        : Promise.resolve(),
    ]);

    const updateData = await this.formFieldRepository.update(id, payload);

    if (updateData.affected === 0) {
      throw new NotFoundException('Form section not found against given Id');
    }

    return await this.findById(id);
  }

  async deleteFormField(id: string): Promise<boolean> {
    await this.findById(id);

    await this.formFieldRepository.softDelete(id);

    return true;
  }
}
