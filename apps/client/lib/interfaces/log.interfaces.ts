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
  userId: null;
  systemModuleContextTypeId: number;
  requestActionTypeId: number;
  requestStatusId: number;
  isFlaggedForReview: boolean;
  contextIds: string;
  dateCreated: string;
  actionPerformedViaId: number;
  createdBy: string;
  requestActionTypeName: string;
  username: string;
  email: string;
  systemContextTypeName: string;
  systemContextTypeId: number;
  isDeleted: boolean;
  firstName: string;
  lastName: string;
  entityAffected: string;
  message: string;
  companyId: number;
  displayColorCode: string;
  companyName: string;
  userRoles: string;
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
