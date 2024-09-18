import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import {
  Asset,
  AssetFormDetails,
  AssetStatusType,
} from '~/lib/interfaces/asset.interfaces';

const initialValue = {
  rowId: 0,
  guid: '',
  assetId: null,
  assetName: '',
  brandName: null,
  modelRef: null,
  assetCode: '',
  assetTag: '',
  rfidtag: '',
  serialNo: '',
  lifeExpectancy: 0,
  acquisitionDate: '',
  currentOwner: '',
  assignedTo: '',
  responsibleFor: '',
  purchaseDate: '',
  initialValue: 0,
  resalevalue: 0,
  dateCreated: '',
  scrapvalue: 0,
  parentId: null,
  isDeleted: false,
  assetType: '',
  currentStatus: 'Inactive' as AssetStatusType,
  assetCategory: '',
  assetSubCategory: '',
  currentCondition: '',
  weightKg: 0,
  lengthCm: 0,
  widthCm: 0,
  heightCm: 0,
  facilityName: '',
  facilityRef: '',
  facilityAddress: '',
  facilityLongitude: 0,
  facilityLatitude: 0,
  buildingName: '',
  buildingRef: '',
  buildingAddress: '',
  buildingLongitude: 0,
  buildingLatitude: 0,
  floorName: '',
  floorRef: '',
  departmentName: '',
  departmentRef: '',
  roomName: '',
  roomRef: '',
  aisleName: '',
  aisleRef: '',
  shelfName: '',
  shelfRef: '',
  description: '',
  assetComponentId: 0,
  lastMaintenanceDate: null,
  nextMaintenanceDate: null,
  currentCost: 0,
  maintenanceCost: 0,
};

const initialAssetForm = {
  images: [],
  assetName: '',
  description: '',
  assetCode: '',
  brandName: '',
  modelRef: '',
  serialNo: '',
  codePrefix: '',
  codeSuffix: '',
  categoryId: '',
  subCategoryId: '',
  weightKg: undefined,
  widthCm: undefined,
  heightCm: undefined,
  depthCm: undefined,
  currentOwner: '',
  department: '',
  assignedTo: '',
  responsibleFor: '',
  acquisitionDate: '',
  conditionId: '',
  initialValue: undefined,
  warrantyStartDate: '',
  warrantyEndDate: '',
  warrantyTerms: '',
  paymentTerms: '',
  depreciationStartDate: '',
  depreciationMethod: '',
  depreciationRate: undefined,
  vendorId: '',
  vendorDetail: '',
  documents: [],
  facilityId: null,
  buildingId: null,
  floorId: null,
  departmentId: null,
  roomId: null,
  aisleId: null,
  shelfId: null,
};

export interface SliceProps {
  asset: Asset;
  assetForm: AssetFormDetails;
}

const initialState: SliceProps = {
  asset: initialValue,
  assetForm: initialAssetForm,
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
} = assetSlice.actions;

export default assetSlice.reducer;
