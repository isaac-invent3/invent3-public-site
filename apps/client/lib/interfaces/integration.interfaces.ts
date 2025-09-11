interface ThirdPartyIntegration {
  isNew: boolean;
  createdDate: string;
  createdBy: string;
  lastModifiedDate: string;
  lastModifiedBy: string;
  isDeleted: boolean;
  deletedDate: string;
  deletedBy: string;
  guid: string;
  thirdPartyIntegrationId: number;
  integrationName: string;
  integrationType: number;
  authentication: number;
  lastSyncDate: string;
  syncFrequency: number;
  endpoint: string;
}

export type { ThirdPartyIntegration };
