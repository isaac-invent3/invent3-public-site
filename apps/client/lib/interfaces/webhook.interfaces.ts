import { FORM_ENUM } from '../utils/constants';

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
  url: string;
  event: string;
  statusId: number;
  secret: string;
  lastUsed: string;
  authMethodId: number;
  authMethodName: string;
  authKey: string;
  dateCreated: string;
  statusName: string;
  displayColorCode: string;
}

interface WebhookSystemModuleContextPermissionDtos {
  webhookSystemModuleContextPermissionId: number | null;
  webhookId?: number | null;
  systemModuleContextTypeId: number;
  systemSubModuleContextTypeId: number;
  changeInitiatedBy: string;
}

interface CreateWebhookSystemModuleContextPermissionDtos
  extends WebhookSystemModuleContextPermissionDtos {
  actionType: typeof FORM_ENUM.add;
}

interface UpdateWebhookSystemModuleContextPermissionDtos
  extends WebhookSystemModuleContextPermissionDtos {
  actionType: typeof FORM_ENUM.add | typeof FORM_ENUM.delete;
}

interface webhookPayload {
  companyId?: number;
  webhookUrlName: string;
  url: string;
  event?: string;
  statusId?: number;
  secret?: string;
  authMethodId?: number;
  authKey?: string;
}

interface CreateWebhookPayload {
  createWebhookDto: webhookPayload & { createdBy: string };
  createWebhookSystemModuleContextPermissionDtos: CreateWebhookSystemModuleContextPermissionDtos[];
}

interface UpdateWebhookPayload {
  updateWebhookDto: webhookPayload & {
    lastModifiedBy: string;
    companyWebhookUrlId: number;
  };
  updateWebhookSystemModuleContextPermissionDtos: UpdateWebhookSystemModuleContextPermissionDtos[];
}

interface WebhookSystemModuleContextPermission {
  rowId: number;
  webhookSystemModuleContextPermissionId: number;
  guid: string;
  companyWebhookUrlId: number;
  webhookUrlName: string;
  authKey: string;
  authMethodId: number;
  companyId: number;
  event: string;
  isVerified: boolean;
  systemModuleContextTypeId: number;
  systemModuleContextTypeName: string;
  systemModuleContextTypeKeyName: string;
  systemModuleContextDescription: string;
  systemSubModuleContextTypeId: number;
  subModuleContextTypeName: string;
  subModuleContextTypeKeyName: string;
  subModuleContextDescription: string;
  isDeleted: boolean;
}

interface AuthMethod {
  authMethodId: number;
  authMethodName: string;
  description: string;
  isActive: boolean;
  isDeleted: boolean;
  createdBy: string;
  createdDate: string;
  lastModifiedBy: string;
  lastModifiedDate: string;
}

export type {
  CompanyWebhookURL,
  CreateWebhookPayload,
  UpdateWebhookPayload,
  WebhookSystemModuleContextPermission,
  AuthMethod,
};
