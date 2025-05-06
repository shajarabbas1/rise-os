import { InjectRepository } from '@nestjs/typeorm';
import { Form } from '../entities/form.entity';
import { Repository } from 'typeorm';
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import CreateFormDto from '../dto/create-form.dto';
import UpdateFormDto from '../dto/update-form.dto';
import CategoryService from 'src/modules/category/services/category.service';

@Injectable()
export default class FormService {
  constructor(
    @InjectRepository(Form)
    private readonly formRepository: Repository<Form>,

    private categoryService: CategoryService,
  ) {}

  async findById(
    id: string,
    throwException = true,
    loadRelations = false,
  ): Promise<Form> {
    const data = await this.formRepository.findOne({
      where: { id },
      ...(loadRelations && { relations: ['fields'] }),
    });

    if (!data && throwException) {
      throw new NotFoundException('Form not found against given Id');
    }

    return data;
  }

  async createForm(payload: CreateFormDto) {
    const { name, categoryId } = payload;

    const existingRecord = await this.formRepository.findOne({
      where: { name },
    });

    if (existingRecord && existingRecord.deletedAt) {
      await this.formRepository.delete(existingRecord.id); // Permanently delete the record
    }

    if (existingRecord && !existingRecord.deletedAt) {
      throw new ConflictException('Form already exists with this name');
    }

    await this.categoryService.findById(categoryId);

    const newForm = this.formRepository.create(payload);

    return await this.formRepository.save(newForm);
  }

  async updateForm(id: string, payload: UpdateFormDto) {
    const updateData = await this.formRepository.update(id, payload);

    if (updateData.affected === 0) {
      throw new NotFoundException('Form not found against given Id');
    }

    return await this.findById(id);
  }

  async deleteForm(id: string): Promise<boolean> {
    await this.findById(id);

    await this.formRepository.softDelete(id);

    return true;
  }
}
