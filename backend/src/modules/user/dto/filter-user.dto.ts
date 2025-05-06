import { IntersectionType, PartialType } from '@nestjs/mapped-types';
import BaseFilterInput from 'src/common/infra/filter/base.filter.input';
import UserUpdateDto from './update.dto';

export default class FilterUserDto extends PartialType(
  IntersectionType(BaseFilterInput, UserUpdateDto),
) {}
