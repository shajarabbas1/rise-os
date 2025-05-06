import { PartialType } from '@nestjs/mapped-types';
import CreateFormSectionDto from './create-form-section.dto';

export default class UpdateFormSectionDto extends PartialType(
  CreateFormSectionDto,
) {}
