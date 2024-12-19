import { Option, SearchQuery } from './general.interfaces';

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

interface ViewReportTableDataPayload extends SearchQuery {
  reportId:string
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

interface ViewReportTableData {
  reportValues: Record<string, any>;
}

interface ScheduleReportPayload {
  reportId: number;
  frequencyId: number | null;
  intervalValue: number | null;
  dayOccurrences: string[];
  weekOccurrences: string[];
  monthOccurrences: string[];
  // yearOccurrences: {
  //   additionalProp1: [0];
  //   additionalProp2: [0];
  //   additionalProp3: [0];
  // };
  recipientIds: string[];
  createdBy: string;
}

interface ReportFilterInput {
  region: Option[];
  area: Option[];
  branch: Option[];
  fromDate: string;
  toDate: string;
}

export type {
  ContextTypeColumn,
  CreateReportPayload,
  GenerateReportCriterion,
  GenerateReportDetails,
  Report,
  ReportDashboardValuesResponse,
  ReportFilterInput,
  ScheduleReportPayload,
  ViewReportTableData,
  ViewReportTableDataPayload,
};
