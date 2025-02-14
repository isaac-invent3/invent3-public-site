import { BaseEntity, Option } from '@repo/interfaces';
import { Document, LocationFilter } from '../general.interfaces';
import { MaintenancePlan } from '../maintenance.interfaces';
import { FORM_ENUM } from '~/lib/utils/constants';

interface AssetLocation {
  locationId: number;
  locationGuid: string | null;
  facilityId: number;
  facilityName: string;
  facilityRef: string;
  facilityAdress: string;
  longitude: number;
  latitude: number;
  buildingId: number;
  buildingName: string;
  buildingRef: string;
  buildingAddress: string;
  buildingLongitude: number;
  buildingLatitude: number;
  floorId: number;
  floorName: string;
  floorRef: string;
  departmentId: number;
  departmentName: string;
  departmentRef: string;
  roomId: number;
  roomName: string;
  roomRef: string;
  aisleId: number;
  aisleName: string;
  aisleRef: string;
  shelfId: number;
  shelfName: string;
  shelfRef: string;
}

interface Asset {
  rowId: number;
  guid: string;
  primaryImage: string | null;
  primaryImagePrefix: string | null;
  assetId: number;
  brandName: string | null;
  modelRef: string | null;
  assetName: string | null;
  assetCode: string | null;
  assetTag: string | null;
  rfidtag: string | null;
  serialNo: string | null;
  lifeExpectancy: number | null;
  acquisitionDate: string | null;
  currentOwner: string | null;
  assignedTo: string | null;
  employeeResponsible: string | null;
  currentOwnerId: number | null;
  assignedToEmployeeId: number | null;
  employeeResponsibleId: number | null;
  purchaseDate: string | null;
  initialValue: number | null;
  resalevalue: number | null;
  dateCreated: string | null;
  scrapvalue: number | null;
  parentId: number | null;
  isDeleted: boolean;
  assetType: string | null;
  currentStatus: string;
  displayColorCode: string;
  assetCategory: string | null;
  assetSubCategory: string | null;
  categoryId: number | null;
  subCategoryId: number | null;
  assetStatusId: number | null;
  assetTypeId: number | null;
  conditionId: number | null;
  currentCondition: string | null;
  weightKg: number | null;
  lengthCm: number | null;
  widthCm: number | null;
  heightCm: number | null;
  lgaid: number | null;
  lganame: string | null;
  stateId: number | null;
  stateName: string | null;
  countryId: number | null;
  countryName: string | null;
  locationId: number | null;
  facilityId: number | null;
  buildingId: number | null;
  floorId: number | null;
  departmentId: number | null;
  roomId: number | null;
  aisleId: number | null;
  shelfId: number | null;
  facilityName: string | null;
  facilityRef: string | null;
  facilityAddress: string | null;
  facilityLongitude: number | null;
  facilityLatitude: number | null;
  buildingName: string | null;
  buildingRef: string | null;
  buildingAddress: string | null;
  buildingLongitude: number | null;
  buildingLatitude: number | null;
  floorName: string | null;
  floorRef: string | null;
  departmentName: string | null;
  departmentRef: string | null;
  roomName: string | null;
  roomRef: string | null;
  aisleName: string | null;
  aisleRef: string | null;
  shelfName: string | null;
  shelfRef: string | null;
  description: string | null;
  assetComponentId: number | null;
  lastMaintenanceDate: string | null;
  nextMaintenanceDate: string | null;
  currentCost: number | null;
  maintenanceCost: number | null;
  y2DMaintenanceCost: number | null;
  assetLocation: string | null;
  noOfChildAssets: number;
}

interface AssetFormImage {
  imageId: number | null;
  imageName: string | null;
  base64PhotoImage: string;
  isPrimaryImage: boolean;
  base64Prefix: string | null;
}

interface AssetFormDetails {
  images: AssetFormImage[];
  parentId: number | null;
  assetId: number | null;
  assetName: string | null;
  brandName: string | null;
  modelRef: string | null;
  description: string | null;
  serialNo: string | null;
  categoryId: number | null;
  subCategoryId: number | null;
  weightKg: number | null;
  widthCm: number | null;
  heightCm: number | null;
  lengthCm: number | null;
  currentOwner: number | null;
  assignedTo: number | null;
  responsibleFor: number | null;
  acquisitionDate: string | null;
  purchaseDate: string | null;
  conditionId: number | null;
  initialValue: number | null;
  warrantyStartDate: string | null;
  warrantyEndDate: string | null;
  warrantyDetails: string | null;
  depreciationStartDate: string | null;
  depreciationMethod: string | null;
  depreciationRate: number | null;
  vendorId: number | null;
  documents: Document[];
  locationId: number | null;
  facilityId: number | null;
  buildingId: number | null;
  floorId: number | null;
  departmentId: number | null;
  roomId: number | null;
  aisleId: number | null;
  shelfId: number | null;
  currentOwnerName: string | null;
  responsibleForName: string | null;
  assignedToName: string | null;
  facilityName: string | null;
  buildingName: string | null;
  floorName: string | null;
  departmentName: string | null;
  roomName: string | null;
  aisleName: string | null;
  shelfName: string | null;
  categoryName: string | null;
  subCategoryName: string | null;
  conditionName: string | null;
  assetTypeId: number | null;
  statusId: number | null;
  assetTypeName: string | null;
  statusName: string | null;
  warrantyId: number | null;
  depreciationId: number | null;
  resaleValue: number | null;
  scrapValue: number | null;
  currentValue: number | null;
  lifeExpectancy: number | null;
  accumulatedDepreciation: number | null;
  lgaId: number | null;
  stateId: number | null;
  countryId: number | null;
  lgaName: string | null;
  stateName: string | null;
  countryName: string | null;
  deletedImageIds: number[];
  maintenancePlans: MaintenancePlan[];
  newMaintenancePlanIds: number[];
  deletedMaintenancePlanIds: number[];
  existingDocumentsIds: number[];
  deletedExistingDocumentIds: number[];
  vendorDetails: {
    vendorName: string | null;
    address: string | null;
    phoneNumber: string | null;
    emailAddress: string | null;
  };
}

interface FilterInput extends LocationFilter {
  category: Option[];
  status: Option[];
}

interface AcquisitionInfo {
  rowId: number;
  assetId: number;
  assetName: string;
  assetCode: string;
  description: string;
  acquisitionDate: string;
  purchaseDate: string;
  initialValue: number | null;
  resalevalue: number | null;
  scrapvalue: number | null;
  vendorId: number | null;
  vendorName: string | null;
  vendorAddress: string | null;
  vendorContactNo: string;
  vendorContactEmail: string | null;
  warrantyDetails: string | null;
  warrantyStartDate: string | null;
  warrantyEndDate: string | null;
  depreciationMethod: string | null;
  depreciationDate: string | null;
  depreciationRate: number | null;
  accumulatedDepreciation: number | null;
  conditionName: string | null;
  warrantyId: number | null;
  depreciationId: number | null;
  currentDepreciationValue: number | null;
  assetComponentId?: number | null;
}

interface ContractDocument {
  rowId: number;
  assetId: number;
  contractId: number;
  contractDocument: string;
  documentId: number;
  documentName: string;
  documentType: string;
  vendorId: number;
  vendorName: string;
}

interface AssetDocument extends BaseEntity {
  documentId: number;
  documentName: string;
  document: string;
  base64Prefix: string;
  assetId: number;
}

interface StateAssetCount {
  rowId: number;
  assetCount: number;
  stateId: number;
  stateName: string;
  countryId: number;
}

interface LGAAssetCount {
  rowId: number;
  assetCount: number;
  lagId: number;
  lgaName: string;
  stateId: number;
}

interface InfoProps {
  iconColor: string;
  bgColor: string;
  textColor: string;
  label: string;
  value: number | undefined;
  shorten?: boolean;
  suffix?: string;
}

interface SingleMapAssetData {
  name: string;
  assetInUseCount: number;
  assetNoInUseCount: number;
  assetValue: number;
  activeAssetsTotalValue: number;
  assetsNotInUseTotalValue: number;
  id: number;
}

interface AssetStatus {
  isNew: boolean;
  createdDate: string;
  createdBy: string;
  lastModifiedDate: string;
  lastModifiedBy: string;
  isDeleted: boolean;
  deletedDate: string | null;
  deletedBy: string | null;
  guid: string;
  statusId: number;
  statusName: string;
  statusCategoryId: number;
  alias: string;
  displayColorCode: string;
}

// Create and Update API Payload

interface BaseDto {
  createdBy?: string;
  lastModifiedBy?: string;
  actionType?: (typeof FORM_ENUM)[keyof typeof FORM_ENUM];
}

interface AssetDepreciationDto extends BaseDto {
  assetId?: number | null;
  depreciationDate: string;
  depreciationMethod: string | null;
  depreciationRate: number | null;
  initialValue: number | null;
  accumulatedDepreciation: number | null;
  currentValue: number | null;
}

interface AssetDocumentsDto extends BaseDto {
  documentId?: number;
  documentName?: string;
  base64Document?: string;
}

interface AssetDto extends BaseDto {
  assetId?: number | null;
  assetName: string;
  brandName: string;
  modelRef: string;
  serialNo: string;
  description: string;
  weightKg: number;
  lengthCm: number;
  widthCm: number;
  heightCm: number;
  purchaseDate: string;
  lifeExpectancy: number;
  assetTypeId: number;
  statusId: number;
  categoryId: number;
  currentOwner: number;
  responsibleFor: number;
  assignedTo: number;
  conditionId: number;
  acquisitionDate: string;
  initialValue: number;
  resalevalue: number;
  scrapvalue: number;
  parentId: number;
  subCategoryId: number;
}

interface AssetImageDto extends BaseDto {
  imageId?: number;
  imageName?: string;
  base64PhotoImage?: string;
  isPrimaryImage?: boolean;
  assetId?: number | null;
}

interface AssetWarrantyDto extends BaseDto {
  warrantyDetails: string;
  startDate: string | null;
  expiryDate: string | null;
  assetId?: number | null;
  warrantyId?: number | null;
}

interface LocationDto extends BaseDto {
  lgaId: number | null;
  facilityId: number | null;
  buildingId: number | null;
  floorId: number | null;
  departmentId: number | null;
  roomId: number | null;
  locationId?: number | null;
  aisleId: number | null;
  shelfId: number | null;
}

interface CreateAssetPayload {
  createLocationDto: LocationDto;
  createAssetDto: AssetDto;
  createAssetImageDto: AssetImageDto[];
  createAssetWarrantyDto: AssetWarrantyDto;
  createAssetDepreciationDto: AssetDepreciationDto;
  createAssetDocumentsDto: AssetDocumentsDto[] | null;
  maintenancePlanIds?: number[] | null;
  assetDocumentIds?: number[] | null;
}

interface UpdateAssetPayload {
  updateLocationDto: LocationDto;
  updateAssetDto: AssetDto;
  multiPurposeAssetImageDto: AssetImageDto[];
  updateAssetWarrantyDto: AssetWarrantyDto;
  updateAssetDepreciationDto: AssetDepreciationDto;
  multiPurposeAssetDocumentDto: AssetDocumentsDto[] | null;
  assetPlans?: Record<
    number,
    typeof FORM_ENUM.add | typeof FORM_ENUM.delete
  > | null;
  assetDocuments?: Record<
    number,
    typeof FORM_ENUM.add | typeof FORM_ENUM.delete
  > | null;
}

interface MeanTimeComputation {
  mtbf: number;
  mttr: number;
  unit: string;
  month: number;
}

export type {
  AssetLocation,
  Asset,
  AssetFormDetails,
  FilterInput,
  AcquisitionInfo,
  ContractDocument,
  AssetDocument,
  AssetFormImage,
  StateAssetCount,
  LGAAssetCount,
  InfoProps,
  SingleMapAssetData,
  AssetStatus,
  AssetImageDto,
  AssetDocumentsDto,
  CreateAssetPayload,
  UpdateAssetPayload,
  MeanTimeComputation,
};
