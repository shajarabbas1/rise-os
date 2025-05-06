import OffsetPageInfo from '../offset-page-info';

export default interface IOffsetPaginatedType<T> {
  items: T[];
  pageInfo: OffsetPageInfo;
}
