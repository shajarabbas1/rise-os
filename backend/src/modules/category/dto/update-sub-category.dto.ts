import { PartialType } from '@nestjs/mapped-types';
import CreateSubCategoryDto from './create-sub-category.dto';

export default class UpdateSubCategoryDto extends PartialType(
  CreateSubCategoryDto,
) {}
