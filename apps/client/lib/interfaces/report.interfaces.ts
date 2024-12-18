import { Option } from "./general.interfaces";

interface CreateReportPayload {
  reportName: string;
  description: string;
  isDefaultReport: boolean;
  query: string;
  createdBy: string;
}

interface Report {
  isNew: boolean;
  createdDate: string;
  createdBy: string;
  lastModifiedDate: string;
  lastModifiedBy: string;
  isDeleted: boolean;
  deletedDate: string | null;
  deletedBy: string | null;
  guid: string;
  reportId: number;
  reportName: string;
  description: string;
  isDefaultReport: boolean;
  query: string;
}

type GenerateReportCriterion = {
  columnName: string;
  columnValue: string;
  operation: number;
  join: number;
};

type ContextTypeColumn = {
  columnId: number;
  columnName: string;
  columnType: 'string' | 'number' | 'boolean';
};

interface GenerateReportDetails {
  criterion: GenerateReportCriterion[];
  contextTypeId: number | undefined;
  contextTypeColumns: Option[];
  contextTypeName: string | undefined;
  startDate: string;
  endDate: string;
}

export type {
  CreateReportPayload,
  GenerateReportCriterion,
  GenerateReportDetails,
  Report,
  ContextTypeColumn,
};
