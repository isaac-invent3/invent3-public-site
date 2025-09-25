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
  integrationTypeName: string;
  authentication: number;
  authenticationMethodName: string;
  lastSyncDate: string;
  syncFrequency: number;
  syncFrequencyName: string;
  endpoint: string;
}

export type { ThirdPartyIntegration };
