/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Vendor, VendorFormDetails } from '~/lib/interfaces/vendor.interfaces';

const initialVendorForm = {
  vendorId: null,
  vendorName: null,
  logo: null,
  description: null,
  vendorCategoryId: null,
  vendorCategoryName: null,
  address1: null,
  address2: null,
  vendorCountryId: null,
  vendorStateId: null,
  vendorCityId: null,
  vendorCityName: null,
  vendorCountryName: null,
  vendorStateName: null,
  postalCode: null,
  contactFirstName: null,
  contactLastName: null,
  primaryEmail: null,
  primaryPhoneNumber: null,
  contractStartDate: null,
  contractEndDate: null,
  contractValue: null,
  vendorStatusId: null,
  vendorStatusName: null,
  vendorDocuments: [],
  initialDocumentIds: [],
};

interface SliceProps {
  vendor: Vendor | null;
  vendorForm: VendorFormDetails;
}

const initialState: SliceProps = {
  vendor: null,
  vendorForm: initialVendorForm,
};

export const VendorSlice = createSlice({
  name: 'vendorReducer',
  initialState,
  reducers: {
    setVendor: (state, { payload }: PayloadAction<Vendor>) => {
      state.vendor = payload;
    },
    clearVendor: (state) => {
      state.vendor = null;
    },
    setVendorForm: (state, { payload }: PayloadAction<VendorFormDetails>) => {
      state.vendorForm = payload;
    },
    updateVendorForm: (
      state,
      { payload }: PayloadAction<Partial<VendorFormDetails>>
    ) => {
      state.vendorForm = { ...state.vendorForm, ...payload };
    },
    clearVendorForm: (state) => {
      state.vendorForm = initialVendorForm;
    },
  },
});

export const {
  setVendor,
  clearVendor,
  setVendorForm,
  updateVendorForm,
  clearVendorForm,
} = VendorSlice.actions;

export default VendorSlice.reducer;
