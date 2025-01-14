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
  owner: number[];
  createdDate: string | null;
}

export type { Template, TemplateFilter };
