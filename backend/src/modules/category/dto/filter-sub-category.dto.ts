import { IntersectionType, PartialType } from '@nestjs/mapped-types';
import BaseFilterInput from 'src/common/infra/filter/base.filter.input';
import UpdateSubCategoryDto from './update-sub-category.dto';

export default class FilterSubCategoryDto extends PartialType(
  IntersectionType(BaseFilterInput, UpdateSubCategoryDto),
) {}
