import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Like, Repository } from 'typeorm';
import EmailTemplate from '../entities/email-template.entity';
import { CreateEmailTemplateDto } from '../dto/create-email-template.dto';
import OffsetPaginationArgs from 'src/common/infra/offset-pagination/offset-pagination.args';
import FilterEmailTemplateDto from '../dto/filter-email-template.dto';
import offsetPaginate from 'src/common/infra/offset-pagination/offset-paginate';

@Injectable()
export default class EmailTemplateService {
  constructor(
    @InjectRepository(EmailTemplate)
    private readonly emailTemplateRepository: Repository<EmailTemplate>,
  ) {}

  async findById(id: string, throwException = true): Promise<EmailTemplate> {
    const emailTemplate = await this.emailTemplateRepository.findOne({
      where: { id },
    });

    if (!emailTemplate && throwException) {
      throw new NotFoundException('Email Template not found against given Id');
    }

    return emailTemplate;
  }

  async create(payload: CreateEmailTemplateDto) {
    const { subject } = payload;

    const existingRecord = await this.emailTemplateRepository.findOne({
      where: { subject },
    });

    if (existingRecord && existingRecord.deletedAt) {
      await this.emailTemplateRepository.delete(existingRecord.id); // Permanently delete the record
    }

    if (existingRecord && !existingRecord.deletedAt) {
      throw new ConflictException(
        'Email template already exists with this subject',
      );
    }

    const newEmailTemplate = this.emailTemplateRepository.create(payload);

    return await this.emailTemplateRepository.save(newEmailTemplate);
  }

  async delete(id: string): Promise<boolean> {
    const emailTemplate = await this.findById(id);

    if (emailTemplate.isSystemDefault) {
      throw new BadRequestException(
        'System generated emails can not be deleted.',
      );
    }

    await this.emailTemplateRepository.softDelete(id);

    return true;
  }

  async findAll(
    paginationArgs: OffsetPaginationArgs,
    filterEmailTemplateDto: FilterEmailTemplateDto,
  ) {
    const {
      subject,
      group,
      archived,
      isSystemDefault,
      createdAt,
      updatedAt,
      ...otherFilters
    } = filterEmailTemplateDto;

    // Prepare filterOptions
    const filterOptions: FindManyOptions<EmailTemplate> = {
      where: {
        deletedAt: null,
        ...(subject ? { subject: Like(`%${subject}%`) } : {}),
        ...(group ? { group: Like(`%${group}%`) } : {}),
        ...(archived !== undefined ? { archived } : {}),
        ...(isSystemDefault !== undefined ? { isSystemDefault } : {}),
        ...otherFilters,
      },

      order: { createdAt: 'DESC' },
    };

    const result = await offsetPaginate(
      this.emailTemplateRepository,
      paginationArgs,
      filterOptions,
    );

    return result;
  }
}
