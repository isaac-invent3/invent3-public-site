import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { GenericFilter } from '~/lib/interfaces/dashboard.interfaces';

export const initialGeneralFilters = {
  datePeriod: [],
  facilities: [],
  assetCategories: [],
  metricsToCompare: [],
  assetStatus: [],
  costPeriod: [],
  costTypes: [],
  ticketTypes: [],
  riskThreshold: [],
};

export interface SliceProps {
  selectedTableIds: number[];
  filters: GenericFilter;
}

const initialState: SliceProps = {
  selectedTableIds: [],
  filters: initialGeneralFilters,
};

export const CommonSlice = createSlice({
  name: 'commonReducer',
  initialState,
  reducers: {
    updateSelectedTableIds: (state, { payload }: PayloadAction<number[]>) => {
      state.selectedTableIds = payload;
    },
    clearSelectedTableIds: (state) => {
      state.selectedTableIds = [];
    },
    updateFilters: (
      state,
      { payload }: PayloadAction<Partial<GenericFilter>>
    ) => {
      state.filters = { ...state.filters, ...payload };
    },
    clearFilter: (state) => {
      state.filters = initialGeneralFilters;
    },
  },
});

export const {
  updateSelectedTableIds,
  clearSelectedTableIds,
  updateFilters,
  clearFilter,
} = CommonSlice.actions;

export default CommonSlice.reducer;
