interface ComplianceSummary {
  totalComplianceCertificate: number;
  nonCompliantItems: number;
  upcomingAudit: Date;
  flaggedRisk: number;
}

interface AssetComplaince {
  assetComplianceId: number;
  guid: string;
  assetId: number;
  frequencyId: number;
  regulationId: number;
  issuerId: number;
  expiryDate: Date;
  lastInspectionDate: Date;
  nextInspectionDate: Date;
  statusName: string;
  standard: string;
  description: string;
  alias: string;
  displayColorCode: string;
  complianceStatusId: number;
  dateCreated: Date;
  isDeleted: boolean;
}

export type { ComplianceSummary, AssetComplaince };
