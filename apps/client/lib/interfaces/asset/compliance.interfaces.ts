import { BaseEntity } from '@repo/interfaces';

interface ComplianceSummary {
  totalComplianceCertificate: number;
  nonCompliantItems: number;
  upcomingAudit: string;
  flaggedRisk: number;
}

export interface Compliance extends BaseEntity {
  complianceId: number;
  assetId: number;
  assetCategoryId: number;
  regulationId: number;
  complianceRegulationId: number;
  lastInspectionDate: Date;
  nextInspectionDate: Date;
  complianceStatusId: number;
  dateCreated: Date;
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

interface AssetComplianceCategoryDetail {
  categoryId: number;
  categoryName: string;
  facilityName: null;
  totalAssets: null;
  compliant: null;
  nonCompliant: null;
  complianceStatus: null;
  displayColorCode: null;
  policies: Policy[];
}

interface CategoryPolicy {
  standard: string;
  typeName: null;
  frequency: null;
  nextInspectionDate: Date;
}

interface Policy {
  standard: string;
  typeName: null;
  frequency: null;
  complianceStatusName: string;
  complianceStatusId: number;
}

interface AssetCompliancePayload {
  createAssetComplianceDto: CreateAssetComplianceDto;
  createComplianceDocumentDtos: CreateComplianceDocumentDto[] | null;
}

interface MarkCompliancePayload {
  createComplianceAuditLogDto: {
    comments?: string;
    performedBy: string;
    dateCreated: string;
    compliancePolicyId: number;
    createdBy: string;
  };
  assetComplianceStatusId: number;
  assetIds: number[];
}

interface CreateAssetComplianceDto {
  assetCategoryId: number;
  assetId?: number;
  regulationId: number;
  frequencyId: number;
  complianceRegulationId?: number;
  lastInspectionDate?: string | null;
  nextInspectionDate: string | null;
  complianceStatusId?: number;
  dateCreated?: string;
  createdBy: string;
}

export interface CreateComplianceDocumentDto {
  documentName: string;
  document: string;
  base64Prefix: string;
  createdBy: string;
}

interface ComplianceType {
  complianceTypeId: number;
  typeName: string;
  typeIcon: string;
  isNew: boolean;
  createdDate: string;
  createdBy: string;
  lastModifiedDate: null;
  lastModifiedBy: null;
  isDeleted: boolean;
  deletedDate: null;
  deletedBy: null;
  guid: string;
}

interface ComplianceRegulation extends BaseEntity {
  regulationId: number;
  standard: string;
  description: string;
  frequency: number;
  lastUpdatedDate: Date;
  dateCreated: Date;
}

interface CreateCompliancePayload {
  regulationTypeId: number;
  standard: string;
  description: string;
  frequency?: number;
  lastUpdatedDate?: Date;
  dateCreated?: Date;
  createdBy: string;
}

interface ComplianceStatusType extends BaseEntity {
  statusTypeId: number;
  statusName: string;
  alias: string;
  displayColorCode: string;
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
  AssetCompliancePayload,
  ComplianceType,
  ComplianceRegulation,
  CreateCompliancePayload,
  AssetComplianceCategoryDetail,
  ComplianceStatusType,
  MarkCompliancePayload,
};
