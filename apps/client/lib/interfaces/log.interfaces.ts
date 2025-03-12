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

interface AuditRecord {
  statusName: string;
  auditRecordId: number;
  userId: string;
  systemModuleContextTypeId: string;
  requestActionTypeId: string;
  requestStatusId: string;
  isFlaggedForReview: string;
  contextIds: string;
  dateCreated: string;
  actionPerformedViaId: string;
  createdBy: string;
  requestActionTypeName: string;
  username: string;
  systemContextTypeName: string;
  systemContextTypeId: string;
  isDeleted: string;
}

interface AuditChanges {
  fieldName: string;
  beforeChanges: string;
  afterChanges: string;
}

interface AuditSummary {
  totalAuditsRecorded: number;
  criticalEvents: number;
  mostActiveUsers: number;
  recentAlerts: number;
}

interface LogFilter {
  userIds: number[];
  systemContextTypeIds: number[];
  startDate: string | undefined;
  endDate: string | undefined;
}

export type { AuditLog, LogFilter, AuditRecord, AuditChanges, AuditSummary };
