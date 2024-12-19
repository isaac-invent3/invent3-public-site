import { Option } from './general.interfaces';

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
  columnName: string | null;
  columnValue: string | null;
  operation: number | null;
  join: number;
};

type ContextTypeColumn = {
  columnId: number;
  columnName: string;
  columnType: 'string' | 'number' | 'boolean' | 'select';
  relativeUrl?: string;
};

interface GenerateReportDetails {
  criterion: GenerateReportCriterion[];
  contextTypeId: number | undefined;
  contextTypeColumns: Option[];
  contextTypeName: string | undefined;
  startDate: string;
  endDate: string;
}

interface ReportDashboardValuesResponse {
  newAssets: number;
  topFiveBranchesWithAssets: Record<string, number> | undefined;
  totalAssets: number;
  totalCost: number;
  totalDisposedAssets: number;
  totalMaintenancePlans: number;
  totalTasks: number;
}

export type {
  ContextTypeColumn,
  CreateReportPayload,
  GenerateReportCriterion,
  GenerateReportDetails,
  Report,
  ReportDashboardValuesResponse,
};
