import { BadRequestException } from '@nestjs/common';
import { FindManyOptions, Repository, SelectQueryBuilder } from 'typeorm';

import type { OrderByCondition } from 'typeorm';

import OffsetPaginationArgs from './offset-pagination.args';
import IOffsetPaginatedType from './types/offset-paginated.type';

export const DEFAULT_LIMIT = 100;

/**
 * Function to offset paginate a query builder and return the paginated result with query order
 * @param source
 * @param paginationArgs
 * @param query
 */
export default async function offsetPaginate<T extends object>(
  source: SelectQueryBuilder<T> | Repository<T>,
  paginationArgs: OffsetPaginationArgs = {},
  query?: OrderByCondition | FindManyOptions<T>,
): Promise<IOffsetPaginatedType<T>> {
  const limit = paginationArgs.limit ?? DEFAULT_LIMIT;

  let page = paginationArgs.page ?? 1;
  let offset = (page - 1) * limit;

  let totalCount: number;
  let totalPages: number;
  let items: T[] = [];

  if (source instanceof SelectQueryBuilder) {
    totalCount = await source.getCount();
    totalPages = Math.ceil(totalCount / limit);
    page = Math.min(paginationArgs.page ?? 1, totalCount) || 1;
    offset = (page - 1) * limit;

    if (query) {
      source.orderBy(query as OrderByCondition);
    } else {
      source.orderBy(`${source.alias}.createdAt`, 'DESC');
    }

    source.take(limit).skip(offset);
    items = await source.getMany();
  } else if (source instanceof Repository) {
    totalCount = await source.count(query);
    totalPages = Math.ceil(totalCount / limit);
    page = Math.min(paginationArgs.page ?? 1, totalCount) || 1;
    offset = (page - 1) * limit;

    const findOptions: FindManyOptions<T> = {
      take: limit,
      skip: offset,
      ...query,
    };

    [items, totalCount] = await source.findAndCount(findOptions);
  } else {
    throw new BadRequestException('Unsupported source type');
  }

  return {
    items,

    pageInfo: {
      itemCount: items.length,
      totalItems: totalCount,
      itemsPerPage: limit,
      currentPage: page,
      totalPages,
    },
  };
}
