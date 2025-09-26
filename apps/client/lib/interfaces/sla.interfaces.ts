interface SLADefinition {
  isNew: boolean;
  createdDate: string;
  createdBy: string;
  lastModifiedDate: string;
  lastModifiedBy: string;
  isDeleted: boolean;
  deletedDate: string;
  deletedBy: string;
  guid: string;
  priorityName: string;
  slaDefinitionId: number;
  ticketTypeId: number;
  ticketTypeName: string;
  locationId: number;
  locationLevel: number;
  priorityId: number;
  slaDurationMinutes: number;
  slaResponseHours: number;
  slaReminderHours: number;
  description: string;
  enableReminders: boolean;
  isActive: boolean;
}

interface BaseSLADefinitionPayload {
  ticketTypeId: number;
  priorityId: number;
  slaDurationMinutes: number;
  slaResponseHours: number;
  slaReminderHours: number;
  enableReminders: boolean;
  isActive: boolean;
}

interface CreateSLADefinitionPayload extends BaseSLADefinitionPayload {
  createdBy: string;
}

interface UpdateSLADefinitionPayload extends BaseSLADefinitionPayload {
  lastModifiedBy: string;
}

export type {
  SLADefinition,
  CreateSLADefinitionPayload,
  UpdateSLADefinitionPayload,
};
