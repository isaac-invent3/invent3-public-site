interface Template {
  isNew: boolean;
  createdDate: string;
  createdBy: string;
  lastModifiedDate: string;
  lastModifiedBy: string;
  isDeleted: boolean;
  deletedDate: string;
  deletedBy: string;
  guid: string;
  templateId: number;
  contextId: number;
  contextTypeId: number;
  templateName: string;
  description: string;
}

export type { Template };
