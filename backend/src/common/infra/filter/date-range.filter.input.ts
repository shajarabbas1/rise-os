import { IsDate, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export default class DateRangeInput {
  /** time entity was created */
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  to?: Date;

  /** time entity was updated */
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  from?: Date;
}