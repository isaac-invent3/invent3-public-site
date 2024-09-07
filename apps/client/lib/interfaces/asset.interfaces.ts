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
  assetId: number;
  assetName: string;
  assetCode: string;
  assetTag: string;
  rfidtag: string | null;
  serialNo: string;
  description: string;
  weightKg: number | null;
  lengthCm: number | null;
  widthCm: number | null;
  heightCm: number | null;
  purchaseDate: string;
  lifeExpectancy: number;
  locationId: number;
  assetTypeId: number | null;
  statusId: number;
  categoryId: number;
  currentOwner: string;
  responsibleFor: string | null;
  assignedTo: string | null;
  conditionId: number;
  acquisitionDate: string;
  dateCreated: string;
  initialValue: number | null;
  resalevalue: number;
  scrapvalue: number;
  parentId: number | null;
  subCategoryId: number;
  assetLocation: AssetLocation | null;
  assetInfoHeader: string | null;
  assetComponents: string | null;
  isNew: boolean;
  createdDate: string;
  createdBy: string | null;
  lastModifiedDate: string | null;
  lastModifiedBy: string | null;
  isDeleted: boolean;
  deletedDate: string | null;
  deletedBy: string | null;
  guid: string | null;
}

interface AssetFormDetails {
  images: (string | File)[];
  name: string;
  description: string;
  assetCode: string;
  make: string;
  model: string;
  serialNo: string;
  codePrefix: string;
  codeSuffix: string;
  category: string;
  subCategory: string;
  weight: number;
  width: number;
  height: number;
  depth: number;
  owner: string;
  department: string;
  assignedTo: string;
  responsibleFor: string;
  acquisitionDate: string;
  assetCondition: string;
  purchasePrice: number;
  warrantyStartDate: string;
  warrantyEndDate: string;
  warrantyTerms: string;
  paymentTerms: string;
  depreciationStartDate: string;
  depreciationMethod: string;
  depreciationRate: number;
  vendorId: string;
  vendorDetail: string;
  documents: (string | File)[];
}

interface FilterInput {
  category: (string | number)[];
  location: (string | number)[];
}

export type { AssetLocation, Asset, AssetFormDetails, FilterInput };
