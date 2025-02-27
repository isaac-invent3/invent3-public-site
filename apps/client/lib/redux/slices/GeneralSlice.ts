/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { AppConfig } from '~/lib/interfaces/general.interfaces';

interface SelectedCompany {
  name: string;
  industryType: string;
  companyId: number;
  slug: string;
  logo?: string;
  logoPrefix?: string;
}
interface SliceProps {
  appConfigValues: AppConfig;
  selectedCompanyInfo: SelectedCompany | null;
}

const initialState: SliceProps = {
  appConfigValues: {
    DEFAULT_COMPLETED_TASK_STATUS_ID: null,
    DEFAULT_ESTIMATED_TASK_DURATION_IN_HOURS: null,
  },
  selectedCompanyInfo: null,
};

export const GeneralSlice = createSlice({
  name: 'generalReducer',
  initialState,
  reducers: {
    setCredentials: (
      state,
      {
        payload: { appConfigValues },
      }: PayloadAction<{ appConfigValues: AppConfig }>
    ) => {
      state.appConfigValues = appConfigValues;
    },
    setSelectedCompanyInfo: (
      state,
      { payload }: PayloadAction<SelectedCompany | null>
    ) => {
      state.selectedCompanyInfo = payload;
    },
  },
});

export const { setCredentials, setSelectedCompanyInfo } = GeneralSlice.actions;

export default GeneralSlice.reducer;
