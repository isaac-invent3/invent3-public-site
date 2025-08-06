interface Template {
  rowId: number;
  templateId: number;
  guid: string;
  contextId: number;
  templateName: string;
  isDeleted: boolean;
  description: string;
  systemContextTypeId: number;
  systemContextTypeDisplayName: string;
  createdBy: string;
  dateCreated: string;
}

interface TemplateFilter {
  contextTypeId: number[];
  owner: string[];
  createdDate: string | null;
}

interface UpdateTicketMetadataPayload {
  ticketIds: number[];
  ticketStatusId?: number;
  ticketPriorityId?: number;
  assignedTo?: number;
  lastModifiedBy: string;
}

export type { Template, TemplateFilter, UpdateTicketMetadataPayload };
