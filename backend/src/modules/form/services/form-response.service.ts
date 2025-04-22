import { Repository } from 'typeorm';
import { FormResponse } from '../entities/form-response.entity';
import FormService from './form.service';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateFormResponseDto } from '../dto/create-form-response.dto';

@Injectable()
export default class FormResponseService {
  constructor(
    @InjectRepository(FormResponse)
    private readonly formResponseRepository: Repository<FormResponse>,

    private formService: FormService,
  ) {}

  async findById(id: string, throwException = true): Promise<FormResponse> {
    const data = await this.formResponseRepository.findOne({
      where: { id },
    });

    if (!data && throwException) {
      throw new NotFoundException('Form response not found against given Id');
    }

    return data;
  }

  async create(payload: CreateFormResponseDto): Promise<FormResponse> {
    const { formId, response } = payload;

    const form = await this.formService.findById(formId, true, true);

    const formRequiredFields = form.fields.filter(field => field.isRequired);

    const missingFields = formRequiredFields.filter(
      field =>
        response[field.name] === undefined || response[field.name] === null,
    );

    if (missingFields.length > 0) {
      const missingFieldNames = missingFields.map(f => f.name).join(', ');
      const requiredFieldNames = formRequiredFields.map(f => f.name).join(', ');

      throw new BadRequestException(
        `The form '${form.name}' is missing the following required fields: ${missingFieldNames}. ` +
          `All required fields for this form are: ${requiredFieldNames}.`,
      );
    }

    return this.formResponseRepository.save(payload);
  }

  async delete(id: string): Promise<boolean> {
    await this.findById(id);

    await this.formResponseRepository.softDelete(id);

    return true;
  }
}
