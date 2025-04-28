import { IntersectionType, PartialType } from '@nestjs/mapped-types';
import BaseFilterInput from 'src/common/infra/filter/base.filter.input';
import UpdateEmailTemplateDto from './update-email-template.dto';

export default class FilterEmailTemplateDto extends PartialType(
  IntersectionType(BaseFilterInput, UpdateEmailTemplateDto),
) {}
