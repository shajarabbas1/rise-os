import { BadRequestException } from '@nestjs/common';
import { Between, FindOperator } from 'typeorm';

import BaseFilterInput from './base.filter.input';

/**
 * Generates range options based on the provided input.
 *
 * @param {T & Partial<BaseFilterInput>} options - The options for range filtering.
 * @return {{ createdAt: FindOperator<Date> | undefined; updatedAt: FindOperator<Date> | undefined; }} The range options for createdAt and updatedAt.
 */
export default function withRanges<T>(options: T & Partial<BaseFilterInput>): {
  createdAt: FindOperator<Date> | undefined;
  updatedAt: FindOperator<Date> | undefined;
} {
  const rangeOptions: {
    createdAt: FindOperator<Date> | undefined;
    updatedAt: FindOperator<Date> | undefined;
  } = {
    createdAt: undefined,
    updatedAt: undefined,
  };

  if (options.createdAt) {
    if (options.createdAt.from && options.createdAt.to) {
      rangeOptions.createdAt = Between(
        new Date(options.createdAt.from),
        new Date(options.createdAt.to),
      );
    } else {
      throw new BadRequestException('Invalid range options at createdAt');
    }
  }

  if (options.updatedAt) {
    if (options.updatedAt.from && options.updatedAt.to) {
      rangeOptions.updatedAt = Between(
        new Date(options.updatedAt.from),
        new Date(options.updatedAt.to),
      );
    } else {
      throw new BadRequestException('Invalid range options updatedAt');
    }
  }

  return rangeOptions;
}
