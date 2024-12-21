import { SearchQuery } from "@repo/interfaces";

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

type SystemContextTypeColumnDataType =
  | 'int'
  | 'nvarchar'
  | 'datetime2'
  | 'money'
  | 'uniqueidentifier'
  | 'decimal';

interface SystemContextTypeColumns {
  columnName: string;
  dataType: SystemContextTypeColumnDataType;
  relativeListUrl: string | null
  relatedNameColumn: string | null;
  primaryKeyColumn:string | null
}

export type {
  GetSystemContextTypeColumnsPayload,
  SystemContextType,
  SystemContextTypeColumnDataType,
  SystemContextTypeColumns,
};
