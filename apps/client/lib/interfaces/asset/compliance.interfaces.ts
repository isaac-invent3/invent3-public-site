interface ComplianceSummary {
  totalComplianceCertificate: number;
  nonCompliantItems: number;
  upcomingAudit: string;
  flaggedRisk: number;
}

interface AssetComplaince {
  assetComplianceId: number;
  guid: string;
  assetId: number;
  frequencyId: number;
  regulationId: number;
  issuerId: number;
  expiryDate: string;
  lastInspectionDate: string;
  nextInspectionDate: string;
  statusName: string;
  standard: string;
  description: string;
  alias: string;
  displayColorCode: string;
  complianceStatusId: number;
  facilityId: number;
  facilityName: string;
  assetFacilityAddress: string;
  dateCreated: string;
  isDeleted: boolean;
}

interface AssetComplianceByFacility {
  facilityId: number;
  lgaid: number;
  facilityName: string;
  address: string;
  categoryName: string;
  categoryId: number;
  statusName: string;
  displayColorCode: string;
  assetId: number;
  frequencyId: number;
  regulationId: number;
  complianceStatusId: number;
  assignedToId: number;
  issuerId: number;
  complianceRegulationId: number;
  expiryDate: string;
  lastInspectionDate: string;
  nextInspectionDate: string;
  assetComplianceId: number;
  assetName: string;
  roomName: string;
  roomId: number;
  floorId: number;
  floorName: string;
  standard: string;
  description: string;
  typeName: string;
  isDeleted: boolean;
}

interface FacilityAssetCompliance {
  facilityId: number;
  address: string;
  facilityName: string;
  totalAssetCategory: number;
  compliant: number;
  nonCompliant: number;
  complianceStatus: string;
}

interface FacilityAssetComplianceSummary {
  facilityName: string;
  facilityAddress: string;
  assetCategories: number;
  nonCompliantItems: number;
  compliantItems: number;
  totalAssets: number;
}

interface AssetComplianceCategory {
  categoryId: number;
  categoryName: string;
  facilityName: string;
  totalAssets: number;
  compliant: number;
  nonCompliant: number;
  complianceStatus: string;
}

interface AssetCategoryComplianceSummary {
  assetCategoryName: string;
  totalAssets: number;
  numberOfPolicies: number;
  totalCompliantPolicies: number;
  lastAuditDate: string;
  nextAuditDate: string;
}

interface AssetBasedCompliance {
  assetId: number;
  assetName: string;
  facilityName: string;
  floor: string;
  zone: string;
  compliant: number;
  nonCompliant: number;
  complianceStatus: string;
}

interface AssetComplianceDetail {
  assetId: number;
  assetName: string;
  facilityName: string;
  floorName: string;
  roomName: string;
  policies: Policy[];
  totalPolicies: number;
}

interface Policy {
  standard: string;
  typeName: null;
  frequency: null;
  complianceStatusName: string;
  complianceStatusId: number;
}

export type {
  ComplianceSummary,
  AssetComplaince,
  AssetComplianceByFacility,
  FacilityAssetCompliance,
  FacilityAssetComplianceSummary,
  AssetComplianceCategory,
  AssetCategoryComplianceSummary,
  AssetBasedCompliance,
  Policy,
  AssetComplianceDetail,
};
