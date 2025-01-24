interface AuditLog {
  isNew: boolean;
  createdDate: Date;
  createdBy: string;
  lastModifiedDate: Date;
  lastModifiedBy: string;
  isDeleted: boolean;
  deletedDate: Date;
  deletedBy: string;
  guid: string;
  logMessageId: number;
  logMessage: string;
  systemContextTypeId: number;
}

interface LogFilter {
  userIds: number[];
  systemContextTypeIds: number[];
  startDate: string | undefined;
  endDate: string | undefined;
}

export type { AuditLog, LogFilter };
