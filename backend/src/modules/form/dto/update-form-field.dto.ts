import { PartialType } from '@nestjs/mapped-types';
import { CreateFormFieldDto } from './create-form-field.dto';

export default class UpdateFormFieldDto extends PartialType(
  CreateFormFieldDto,
) {}
