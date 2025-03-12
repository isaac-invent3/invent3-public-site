import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { FilterInput } from '~/lib/interfaces/asset/general.interface';
import {
  Company,
  CompanyFormDetails,
} from '~/lib/interfaces/company.interfaces';

const initialCompanyForm = {
  companyId: null,
  companyLogo: null,
  companyName: null,
  registrationNumber: null,
  industryTypeId: null,
  industryTypeName: null,
  companyEmail: null,
  companyWebsite: null,
  address1: null,
  address2: null,
  lgaId: null,
  stateId: null,
  countryId: null,
  lgaName: null,
  stateName: null,
  countryName: null,
  postalCode: null,
  contactFirstName: null,
  contactLastName: null,
  contactEmail: null,
  contactPhoneNumber: null,
  subscriptionPlanId: null,
  startDate: null,
  endDate: null,
  clientAdminId: null,
};

const initialCompanyFilter = {
  category: [],
  status: [],
  region: [],
  area: [],
  branch: [],
};

export interface SliceProps {
  company: Company | null;
  companyForm: CompanyFormDetails;
  companyFilter: FilterInput;
  selectedCompanyIds: number[];
}

const initialState: SliceProps = {
  company: null,
  companyForm: initialCompanyForm,
  companyFilter: initialCompanyFilter,
  selectedCompanyIds: [],
};

export const CompanySlice = createSlice({
  name: 'companyReducer',
  initialState,
  reducers: {
    setCompany: (state, { payload }: PayloadAction<Company>) => {
      state.company = payload;
    },
    clearCompany: (state) => {
      state.company = null;
    },
    setCompanyForm: (state, { payload }: PayloadAction<CompanyFormDetails>) => {
      state.companyForm = payload;
    },
    updateCompanyForm: (
      state,
      { payload }: PayloadAction<Partial<CompanyFormDetails>>
    ) => {
      state.companyForm = { ...state.companyForm, ...payload };
    },
    clearCompanyForm: (state) => {
      state.companyForm = initialCompanyForm;
    },
    updateCompanyFilter: (
      state,
      { payload }: PayloadAction<Partial<FilterInput>>
    ) => {
      state.companyFilter = { ...state.companyFilter, ...payload };
    },
    clearCompanyFilter: (state) => {
      state.companyFilter = initialCompanyFilter;
    },
    updateSelectedCompanyIds: (state, { payload }: PayloadAction<number[]>) => {
      state.selectedCompanyIds = payload;
    },
    clearSelectedCompanyIds: (state) => {
      state.selectedCompanyIds = [];
    },
  },
});

export const {
  clearCompany,
  clearCompanyFilter,
  clearCompanyForm,
  clearSelectedCompanyIds,
  setCompany,
  setCompanyForm,
  updateCompanyFilter,
  updateCompanyForm,
  updateSelectedCompanyIds,
} = CompanySlice.actions;

export default CompanySlice.reducer;
