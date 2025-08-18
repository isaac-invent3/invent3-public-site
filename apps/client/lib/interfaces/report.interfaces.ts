import { Option, QueryParams, SearchQuery } from '@repo/interfaces';

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
  selectedCompany?: string;
  criterion: GenerateReportCriterion[];
  systemContextTypeId: number | undefined;
  contextTypeColumns: Option[];
  contextTypeName: string | undefined;
  startDate: string;
  endDate: string;
}

interface GenerateReportPayload extends QueryParams {
  criterion: GenerateReportCriterion[];
  systemContextTypeId: number | undefined;
  contextTypeColumns: Option[];
  selectedCompany?: string;
}

interface ViewReportTableDataPayload extends SearchQuery {
  reportId: string;
  startDate: string;
  endDate: string;
}

type DashboardValuesObj = {
  reportId: number;
  statValue: number;
};
type FacilityWithTopAssets = {
  facilityId: number;
  facilityName: string;
  totalAssets: number;
};

type TicketStatistics = {
  openTickets: number;
  escalatedTickets: number;
  resolvedTickets: number;
};

interface ReportDashboardValuesResponse {
  newAssets: DashboardValuesObj;
  topFiveFacilitiesWithAssets: FacilityWithTopAssets[];
  totalAssets: DashboardValuesObj;
  totalMaintenanceCost: DashboardValuesObj;
  totalAssetsDisposed: DashboardValuesObj;
  totalMaintenancePlans: DashboardValuesObj;
  totalTasks: DashboardValuesObj;
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
  recipientIds: number[] | string[];
  createdBy: string;
}

interface ReportFilterInput {
  region: Option[];
  area: Option[];
  branch: Option[];
  companies: Option[];
  fromDate: string;
  toDate: string;
}

interface GenerateReportResponse {
  model: Record<string, any>;
}

interface SaveReportPayload {
  authorId: number;
  reportName: string;
  description: string;
  isDefaultReport: boolean;
  systemContextTypeId: number;
  executedSearchRequest: {
    criterion: GenerateReportCriterion[];
  };
  createdBy: string;
}

export type {
  ContextTypeColumn,
  CreateReportPayload,
  FacilityWithTopAssets,
  GenerateReportCriterion,
  GenerateReportDetails,
  GenerateReportPayload,
  GenerateReportResponse,
  Report,
  ReportDashboardValuesResponse,
  ReportFilterInput,
  SaveReportPayload,
  ScheduleReportPayload,
  ViewReportTableData,
  ViewReportTableDataPayload,
  TicketStatistics,
};
