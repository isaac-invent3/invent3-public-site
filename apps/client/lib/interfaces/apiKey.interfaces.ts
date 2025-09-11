interface CompanyApiKeys {
  isNew: boolean;
  createdDate: string;
  createdBy: string;
  lastModifiedDate: string;
  lastModifiedBy: string;
  isDeleted: boolean;
  deletedDate: string;
  deletedBy: string;
  guid: string;
  companyApiKeyId: number;
  companyId: number;
  companyApiKeyName: string;
  usageLimit: number;
  statusId: number;
  lastUsed: string;
  expiresAt: string;
  dateCreated: string;
}

interface CreateAPIKeyPayload {
  companyId: number;
  companyApiKeyName: string;
  usageLimit: number;
  createdBy: string;
}

export type { CompanyApiKeys, CreateAPIKeyPayload };
