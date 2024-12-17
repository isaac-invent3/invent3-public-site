import { LocationFilter, Option } from './general.interfaces';
import { MaintenancePlan } from './maintenance.interfaces';

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

type AssetStatusType =
  | 'Active'
  | 'Inactive'
  | 'Under Maintenance'
  | 'Decommissioned'
  | 'Pending Disposal'
  | 'In Storage'
  | 'Operational'
  | 'Non-Operational'
  | 'Scheduled for Maintenance'
  | 'Out of Service';

interface Asset {
  rowId: number | null;
  guid: string | null;
  primaryImage: string | null;
  primaryImagePrefix: string | null;
  assetId: number | null;
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
  statusId: number | null;
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
  y2dmaintenanceCost: number | null;
  assetLocation: string | null;
}

interface AssetFormImage {
  imageId: number | null;
  imageName: string | null;
  base64PhotoImage: string;
  isPrimaryImage: boolean;
  base64Prefix: string | null;
}

interface AssetFormDocument {
  documentId: number | null;
  documentName: string | null;
  base64Document: string | null;
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
  documents: AssetFormDocument[];
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
  maintenancePlans: MaintenancePlan[];
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

interface LocationOption {
  label: string | null;
  value: number | null;
}

interface FormLocation {
  country: LocationOption;
  state: LocationOption;
  lga: LocationOption;
  facility: LocationOption;
  building: LocationOption;
  floor: LocationOption;
  department: LocationOption;
  room: LocationOption;
  aisle: LocationOption;
  shelf: LocationOption;
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

interface BaseAsset {
  isNew: boolean;
  createdDate: string;
  createdBy: string;
  lastModifiedDate: string;
  lastModifiedBy: string;
  isDeleted: boolean;
  deletedDate: string;
  deletedBy: string;
  guid: string;
}

interface Images {
  imageId: number;
  imageName: string;
  photoImage: string;
  base64Prefix: string;
  isPrimaryImage: true;
  assetId: number;
}

interface Document {
  documentId: number;
  documentName: string;
  document: string;
  base64Prefix: string;
  assetId: number;
}

interface AssetImage extends BaseAsset, Images {}
interface AssetDocument extends BaseAsset, Document {}

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

interface AssetStats {
  activeAssets: number;
  inActiveAssets: number;
  assetsUnderMaintenance: number;
  decommissionedAssets: number;
  assetsPendingDisposal: number;
  assetsInStorage: number;
  operationalAssets: number;
  assetsScheduledForMaintenance: number;
  assetsOutOfService: number;
  assetsNotInUse: number;
  totalAssets: number;
  totalAssetValue: number;
  assetsNotInUseTotalValue: number;
  activeAssetsTotalValue: number;
}

interface MapStats {
  stateId?: number;
  stateName?: string;
  lgaId?: number;
  lgaName?: string;
}

interface AssetMapStats extends AssetStats, MapStats {}

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

export type {
  AssetLocation,
  Asset,
  AssetFormDetails,
  FilterInput,
  AssetStatusType,
  FormLocation,
  AcquisitionInfo,
  ContractDocument,
  AssetImage,
  AssetDocument,
  AssetFormImage,
  AssetFormDocument,
  StateAssetCount,
  LGAAssetCount,
  AssetStats,
  AssetMapStats,
  InfoProps,
  SingleMapAssetData,
  AssetStatus,
};
