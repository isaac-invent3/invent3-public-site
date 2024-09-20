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
  rowId: number;
  guid: string;
  primaryImage: string | null;
  assetId: number | null;
  brandName: string | null;
  modelRef: string | null;
  assetName: string;
  assetCode: string;
  assetTag: string;
  rfidtag: string | null;
  serialNo: string;
  lifeExpectancy: number;
  acquisitionDate: string;
  currentOwner: string;
  assignedTo: string | null;
  responsibleFor: string | null;
  purchaseDate: string;
  initialValue: number | null;
  resalevalue: number;
  dateCreated: string;
  scrapvalue: number;
  parentId: number | null;
  isDeleted: boolean;
  assetType: string | null;
  currentStatus: AssetStatusType;
  assetCategory: string;
  assetSubCategory: string;
  currentCondition: string;
  weightKg: number | null;
  lengthCm: number | null;
  widthCm: number | null;
  heightCm: number | null;
  facilityName: string;
  facilityRef: string;
  facilityAddress: string;
  facilityLongitude: number;
  facilityLatitude: number;
  buildingName: string;
  buildingRef: string;
  buildingAddress: string;
  buildingLongitude: number;
  buildingLatitude: number;
  floorName: string;
  floorRef: string;
  departmentName: string;
  departmentRef: string;
  roomName: string;
  roomRef: string;
  aisleName: string;
  aisleRef: string;
  shelfName: string;
  shelfRef: string;
  description: string;
  assetComponentId: number | null;
  lastMaintenanceDate: string | null;
  nextMaintenanceDate: string | null;
  currentCost: number | null;
  maintenanceCost: number | null;
  y2dmaintenanceCost: number;
}

interface AssetFormImages {
  imageId: number | null;
  imageName: string | null;
  base64PhotoImage: string;
  isPrimaryImage: boolean;
}

interface AssetFormDetails {
  images: AssetFormImages[];
  assetId: number | null;
  assetName: string;
  brandName: string;
  modelRef: string;
  description: string;
  assetCode: string;
  serialNo: string;
  codePrefix: string;
  codeSuffix: string;
  categoryId: string;
  subCategoryId: string;
  weightKg: number | undefined;
  widthCm: number | undefined;
  heightCm: number | undefined;
  lengthCm: number | undefined;
  currentOwner: string;
  assignedTo: string;
  responsibleFor: string;
  acquisitionDate: string;
  conditionId: string;
  initialValue: number | undefined;
  warrantyStartDate: string;
  warrantyEndDate: string;
  warrantyTerms: string;
  paymentTerms: string;
  depreciationStartDate: string;
  depreciationMethod: string;
  depreciationRate: number | undefined;
  vendorId: string;
  documents: (string | File)[];
  facilityId: number | undefined;
  buildingId: number | undefined;
  floorId: number | undefined;
  departmentId: number | undefined;
  roomId: number | undefined;
  aisleId: number | undefined;
  shelfId: number | undefined;
  currentOwnerName: string | undefined;
  responsibleForName: string | undefined;
  assignedToName: string | undefined;
  facilityName: string | undefined;
  buildingName: string | undefined;
  floorName: string | undefined;
  departmentName: string | undefined;
  roomName: string | undefined;
  aisleName: string | undefined;
  shelfName: string | undefined;
  categoryName: string | undefined;
  subCategoryName: string | undefined;
  conditionName: string | undefined;
  vendorDetails: {
    vendorName: string | undefined;
    address: string | undefined;
    phoneNumber: string | undefined;
    emailAddress: string | undefined;
  };
}

interface FilterInput {
  category: (string | number)[];
  location: (string | number)[];
}

interface LocationOption {
  label: string | undefined;
  value: number | undefined;
}

interface FormLocation {
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
  initialValue: number;
  resalevalue: number;
  scrapvalue: number;
  vendorId: number;
  vendorName: string;
  vendorAddress: string | null;
  vendorContactNo: string;
  vendorContactEmail: string | null;
  warrantyDetails: string;
  warrantyStartDate: string;
  warrantyEndDate: string;
  depreciationMethod: string;
  depreciationDate: string;
  depreciationRate: number;
  accumulatedDepreciation: number;
  conditionName: string;
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

interface AssetImages {
  isNew: boolean;
  createdDate: string;
  createdBy: string;
  lastModifiedDate: string;
  lastModifiedBy: string;
  isDeleted: boolean;
  deletedDate: string;
  deletedBy: string;
  guid: string;
  imageId: number;
  imageName: string;
  photoImage: string;
  isPrimaryImage: true;
  assetId: number;
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
  AssetImages,
  AssetFormImages,
};
