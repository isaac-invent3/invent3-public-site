import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import {
  Asset,
  AssetFormDetails,
  FilterInput,
} from '~/lib/interfaces/asset/general.interface';
import { AssetImage } from '~/lib/interfaces/asset/image.interfaces';

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
  deletedImageIds: [],
  maintenancePlans: [],
  newMaintenancePlanIds: [],
  deletedMaintenancePlanIds: [],
  existingDocumentsIds: [],
  deletedExistingDocumentIds: [],
  vendorDetails: {
    vendorName: null,
    address: null,
    phoneNumber: null,
    emailAddress: null,
  },
  vendorFormDetails: null,
};

interface GeneralInfo {
  loadingImage: boolean;
}

const initialAssetFilter = {
  category: [],
  status: [],
  region: [],
  area: [],
  branch: [],
};

export interface SliceProps {
  asset: Asset | null;
  assetImages: AssetImage[];
  assetForm: AssetFormDetails;
  assetFilter: FilterInput;
  selectedAssetIds: number[];
  generalInfo: GeneralInfo;
}

const initialState: SliceProps = {
  asset: null,
  assetImages: [],
  assetForm: initialAssetForm,
  assetFilter: initialAssetFilter,
  selectedAssetIds: [],
  generalInfo: {
    loadingImage: false,
  },
};

export const AssetSlice = createSlice({
  name: 'assetReducer',
  initialState,
  reducers: {
    setAsset: (state, { payload }: PayloadAction<Asset>) => {
      state.asset = payload;
    },
    setAssetImage: (state, { payload }: PayloadAction<AssetImage[]>) => {
      state.assetImages = payload;
    },
    clearAsset: (state) => {
      state.asset = null;
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
    updateSelectedAssetIds: (state, { payload }: PayloadAction<number[]>) => {
      state.selectedAssetIds = payload;
    },
    clearSelectedAssetIds: (state) => {
      state.selectedAssetIds = [];
    },
    updateGeneralInfo: (
      state,
      { payload }: PayloadAction<Partial<GeneralInfo>>
    ) => {
      state.generalInfo = { ...state.generalInfo, ...payload };
    },
  },
});

export const {
  setAsset,
  clearAsset,
  setAssetForm,
  setAssetImage,
  clearAssetForm,
  updateAssetForm,
  updateAssetFilter,
  clearAssetFilter,
  updateSelectedAssetIds,
  clearSelectedAssetIds,
  updateGeneralInfo,
} = AssetSlice.actions;

export default AssetSlice.reducer;
