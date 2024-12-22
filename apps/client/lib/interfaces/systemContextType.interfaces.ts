import { BaseEntity, SearchQuery } from '@repo/interfaces';

interface GetSystemContextTypeColumnsPayload extends SearchQuery {
  systemContextTypeId: number;
}

interface SystemContextType extends BaseEntity {
  isReportable: boolean;
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
