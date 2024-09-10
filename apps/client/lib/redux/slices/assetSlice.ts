import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Asset } from '~/lib/interfaces/asset.interfaces';

const initialValue = {
  rowId: 0,
  assetId: 0,
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
  currentStatus: '',
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

export interface SliceProps {
  asset: Asset;
}

const initialState: SliceProps = {
  asset: initialValue,
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
  },
});

export const { setAsset, clearAsset } = assetSlice.actions;

export default assetSlice.reducer;
