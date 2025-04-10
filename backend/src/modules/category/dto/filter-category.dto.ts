import { IntersectionType, PartialType } from '@nestjs/mapped-types';
import BaseFilterInput from 'src/common/infra/filter/base.filter.input';
import UpdateCategoryDto from './update-category.dto';

export default class FilterCategoryDto extends PartialType(
  IntersectionType(BaseFilterInput, UpdateCategoryDto),
) {}
