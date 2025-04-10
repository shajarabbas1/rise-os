import { IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import DateRangeInput from './date-range.filter.input';

export default class BaseFilterInput {
  /** time entity was created */
  @IsOptional()
  @ValidateNested()
  @Type(() => DateRangeInput)
  createdAt?: DateRangeInput;

  /** time entity was updated */
  @IsOptional()
  @ValidateNested()
  @Type(() => DateRangeInput)
  updatedAt?: DateRangeInput;
}
