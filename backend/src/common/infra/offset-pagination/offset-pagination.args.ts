import { IsOptional } from 'class-validator';

export default class OffsetPaginationArgs {
  @IsOptional()
  page?: number;

  @IsOptional()
  limit?: number;
}
