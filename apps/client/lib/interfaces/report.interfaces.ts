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

export type { CreateReportPayload, Report };
