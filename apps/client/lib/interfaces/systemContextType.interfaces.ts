import { SearchQuery } from './general.interfaces';

interface GetSystemContextTypeColumnsPayload extends SearchQuery {
  systemContextTypeId: number;
}

interface SystemContextType {
  createdBy: string | null;
  createdDate: string | null;
  deletedBy: string | null;
  deletedDate: string | null;
  displayName: string | null;
  guid: string | null;
  isDeleted: boolean;
  isNew: boolean;
  isReportable: boolean;
  lastModifiedBy: string | null;
  lastModifiedDate: string | null;
  systemContextTypeId: number;
  systemContextTypeName: string | null;
}

interface SystemContextTypeColumns {
  columnName: string;
  dataType:
    | 'int'
    | 'nvarchar'
    | 'datetime2'
    | 'money'
    | 'uniqueidentifier'
    | 'decimal';
  relativeListUrl: string;
}

export type {
  GetSystemContextTypeColumnsPayload,
  SystemContextType,
  SystemContextTypeColumns,
};
