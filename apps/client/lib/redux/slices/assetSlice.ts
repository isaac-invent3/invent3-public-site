import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import {
  Asset,
  AssetFormDetails,
  AssetImages,
  AssetStatusType,
} from '~/lib/interfaces/asset.interfaces';

const initialValue = {
  rowId: null,
  guid: null,
  primaryImage: null,
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
  responsibleFor: null,
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
};

const initialAssetForm = {
  images: [],
  assetId: null,
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
  currentOwner: null,
  department: null,
  assignedTo: null,
  responsibleFor: null,
  acquisitionDate: null,
  conditionId: null,
  initialValue: null,
  warrantyStartDate: null,
  warrantyEndDate: null,
  warrantyTerms: null,
  paymentTerms: null,
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
  currentOwnerName: null,
  responsibleForName: null,
  assignedToName: null,
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
  vendorDetails: {
    vendorName: null,
    address: null,
    phoneNumber: null,
    emailAddress: null,
  },
};

export interface SliceProps {
  asset: Asset;
  assetForm: AssetFormDetails;
  assetImages: AssetImages[];
}

const initialState: SliceProps = {
  asset: initialValue,
  assetForm: initialAssetForm,
  assetImages: [],
};

export const assetSlice = createSlice({
  name: 'assetReducer',
  initialState,
  reducers: {
    setAsset: (state, { payload }: PayloadAction<Asset>) => {
      state.asset = payload;
    },
    clearAsset: (state) => {
      state.asset = initialValue;
    },
    setAssetImages: (state, { payload }: PayloadAction<AssetImages[]>) => {
      state.assetImages = payload;
    },
    clearAssetImages: (state) => {
      state.assetImages = [];
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
} = assetSlice.actions;

export default assetSlice.reducer;
