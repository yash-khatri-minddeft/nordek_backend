export type DataWithPaginationMeta<Data> = {
  data: Data[];
  totalCount: number;
  limit?: number;
  page: number;
  take: number;
  totalPages: number;
};
