import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AssetStatistics } from '~/lib/interfaces/dashboard.interfaces';
import type { Option } from '~/lib/interfaces/general.interfaces';

interface Info {
  stats: AssetStatistics | null;
  selectedState: Option | null;
  selectedCountry: Option | null;
  isLoading: boolean;
}
export interface SliceProps {
  info: Info;
}

const InitialInfo = {
  stats: null,
  selectedState: null,
  selectedCountry: {
    label: 'Nigeria',
    value: 1,
  },
  isLoading: false,
};

const initialState: SliceProps = {
  info: InitialInfo,
};

export const dashboardSlice = createSlice({
  name: 'dashboardReducer',
  initialState,
  reducers: {
    updateInfo: (state, { payload }: PayloadAction<Partial<Info>>) => {
      state.info = { ...state.info, ...payload };
    },
    clearInfo: (state) => {
      state.info = InitialInfo;
    },
  },
});

export const { updateInfo, clearInfo } = dashboardSlice.actions;

export default dashboardSlice.reducer;
