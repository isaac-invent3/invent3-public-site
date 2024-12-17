import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import {
  Asset,
  AssetDocument,
  AssetFormDetails,
  AssetImage,
  AssetStatusType,
  FilterInput,
} from '~/lib/interfaces/asset.interfaces';
import { COLOR_CODES_FALLBACK } from '~/lib/utils/constants';

const initialValue = {
  rowId: null,
  guid: null,
  primaryImage: null,
  currentOwnerId: null,
  assignedToEmployeeId: null,
  employeeResponsibleId: null,
  primaryImagePrefix: null,
  assetId: null,
  assetName: null,
  brandName: null,
  modelRef: null,
  assetCode: null,
  assetTag: null,
  rfidtag: null,
  serialNo: null,
  lifeExpectancy: null,
  acquisitionDate: null,
  currentOwner: null,
  assignedTo: null,
  employeeResponsible: null,
  purchaseDate: null,
  initialValue: null,
  resalevalue: null,
  dateCreated: null,
  scrapvalue: null,
  parentId: null,
  isDeleted: false,
  assetType: null,
  currentStatus: 'Inactive' as AssetStatusType,
  assetCategory: null,
  assetSubCategory: null,
  conditionId: null,
  currentCondition: null,
  weightKg: null,
  lengthCm: null,
  widthCm: null,
  heightCm: null,
  lgaid: null,
  lganame: null,
  stateId: null,
  stateName: null,
  countryId: null,
  countryName: null,
  facilityName: null,
  facilityRef: null,
  facilityAddress: null,
  facilityLongitude: null,
  facilityLatitude: null,
  buildingName: null,
  buildingRef: null,
  buildingAddress: null,
  buildingLongitude: null,
  buildingLatitude: null,
  floorName: null,
  floorRef: null,
  departmentName: null,
  departmentRef: null,
  roomName: null,
  roomRef: null,
  aisleName: null,
  aisleRef: null,
  shelfName: null,
  shelfRef: null,
  description: null,
  assetComponentId: null,
  lastMaintenanceDate: null,
  nextMaintenanceDate: null,
  currentCost: null,
  maintenanceCost: null,
  y2dmaintenanceCost: null,
  categoryId: null,
  subCategoryId: null,
  statusId: null,
  assetTypeId: null,
  locationId: null,
  facilityId: null,
  buildingId: null,
  floorId: null,
  departmentId: null,
  roomId: null,
  aisleId: null,
  shelfId: null,
  assetLocation: null,
  displayColorCode: COLOR_CODES_FALLBACK.default,
};

const initialAssetForm = {
  images: [],
  assetId: null,
  parentId: null,
  assetName: null,
  description: null,
  brandName: null,
  modelRef: null,
  serialNo: null,
  categoryId: null,
  subCategoryId: null,
  weightKg: null,
  widthCm: null,
  heightCm: null,
  lengthCm: null,
  department: null,
  currentOwner: null,
  assignedTo: null,
  responsibleFor: null,
  currentOwnerName: null,
  responsibleForName: null,
  assignedToName: null,
  acquisitionDate: null,
  purchaseDate: null,
  conditionId: null,
  initialValue: null,
  warrantyStartDate: null,
  warrantyEndDate: null,
  warrantyDetails: null,
  depreciationStartDate: null,
  depreciationMethod: null,
  depreciationRate: null,
  vendorId: null,
  documents: [],
  facilityId: null,
  buildingId: null,
  floorId: null,
  departmentId: null,
  roomId: null,
  aisleId: null,
  shelfId: null,
  facilityName: null,
  buildingName: null,
  floorName: null,
  departmentName: null,
  roomName: null,
  aisleName: null,
  shelfName: null,
  categoryName: null,
  subCategoryName: null,
  conditionName: null,
  assetTypeId: null,
  assetTypeName: null,
  statusId: null,
  statusName: null,
  locationId: null,
  warrantyId: null,
  depreciationId: null,
  resaleValue: null,
  scrapValue: null,
  currentValue: null,
  lifeExpectancy: null,
  accumulatedDepreciation: null,
  lgaId: null,
  stateId: null,
  countryId: null,
  lgaName: null,
  stateName: null,
  countryName: null,
  maintenancePlans: [],
  vendorDetails: {
    vendorName: null,
    address: null,
    phoneNumber: null,
    emailAddress: null,
  },
};

const initialAssetFilter = {
  category: [],
  status: [],
  region: [],
  area: [],
  branch: [],
};

export interface SliceProps {
  asset: Asset;
  assetForm: AssetFormDetails;
  assetImages: AssetImage[];
  assetDocuments: AssetDocument[];
  reinitializeAssetForm: boolean;
  assetFilter: FilterInput;
}

const initialState: SliceProps = {
  asset: initialValue,
  assetForm: initialAssetForm,
  assetImages: [],
  assetDocuments: [],
  reinitializeAssetForm: false,
  assetFilter: initialAssetFilter,
};

export const AssetSlice = createSlice({
  name: 'assetReducer',
  initialState,
  reducers: {
    setAsset: (state, { payload }: PayloadAction<Asset>) => {
      state.asset = payload;
    },
    clearAsset: (state) => {
      state.asset = initialValue;
    },
    setAssetImages: (state, { payload }: PayloadAction<AssetImage[]>) => {
      state.assetImages = payload;
    },
    clearAssetImages: (state) => {
      state.assetImages = [];
    },
    setAssetDocuments: (state, { payload }: PayloadAction<AssetDocument[]>) => {
      state.assetDocuments = payload;
    },
    clearAssetDocuments: (state) => {
      state.assetDocuments = [];
    },
    setAssetForm: (state, { payload }: PayloadAction<AssetFormDetails>) => {
      state.assetForm = payload;
    },
    updateAssetForm: (
      state,
      { payload }: PayloadAction<Partial<AssetFormDetails>>
    ) => {
      state.assetForm = { ...state.assetForm, ...payload };
    },
    clearAssetForm: (state) => {
      state.assetForm = initialAssetForm;
    },
    updateAssetFilter: (
      state,
      { payload }: PayloadAction<Partial<FilterInput>>
    ) => {
      state.assetFilter = { ...state.assetFilter, ...payload };
    },
    clearAssetFilter: (state) => {
      state.assetFilter = initialAssetFilter;
    },
  },
});

export const {
  setAsset,
  clearAsset,
  setAssetForm,
  clearAssetForm,
  updateAssetForm,
  setAssetImages,
  clearAssetImages,
  setAssetDocuments,
  clearAssetDocuments,
  updateAssetFilter,
  clearAssetFilter,
} = AssetSlice.actions;

export default AssetSlice.reducer;
