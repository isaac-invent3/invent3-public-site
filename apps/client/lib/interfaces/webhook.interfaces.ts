interface CompanyWebhookURL {
  isNew: boolean;
  createdDate: string;
  createdBy: string;
  lastModifiedDate: string;
  lastModifiedBy: string;
  isDeleted: boolean;
  deletedDate: string;
  deletedBy: string;
  guid: string;
  companyWebhookUrlId: number;
  companyId: number;
  webhookUrlName: string;
  event: string;
  statusId: number;
  secret: string;
  lastUsed: string;
  authMethodId: number;
  authKey: string;
  dateCreated: string;
}

interface createWebhookPayload {
  companyId: number;
  webhookUrlName: string;
  event?: string;
  statusId?: number;
  secret: string;
  authMethodId?: number;
  authKey?: string;
  createdBy: string;
}

export type { CompanyWebhookURL, createWebhookPayload };
