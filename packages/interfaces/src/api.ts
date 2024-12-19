interface QueryParams {
  pageSize?: number;
  pageNumber?: number;
}

interface ListResponse<T> {
  items: T[];
  pageNumber: number;
  totalPages: number;
  totalItems: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

interface BaseApiResponse<T> {
  data: T;
  responseId: string;
  message: string;
}

export type { QueryParams, ListResponse, BaseApiResponse };
