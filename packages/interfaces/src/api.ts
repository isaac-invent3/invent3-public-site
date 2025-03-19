interface QueryParams {
  pageSize?: number;
  pageNumber?: number;
}

interface DeleteRecordQuery {
  id: number;
  deletedBy?: string;
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

interface BaseEntity {
  isNew: boolean;
  createdDate: string;
  createdBy: string;
  lastModifiedDate: string;
  lastModifiedBy: string;
  isDeleted: boolean;
  deletedDate: string;
  deletedBy: string;
  guid: string;
}

export type {
  QueryParams,
  ListResponse,
  BaseApiResponse,
  BaseEntity,
  DeleteRecordQuery,
};
