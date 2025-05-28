import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface SliceProps {
  selectedTableIds: number[];
}

const initialState: SliceProps = {
  selectedTableIds: [],
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
  },
});

export const { updateSelectedTableIds, clearSelectedTableIds } =
  CommonSlice.actions;

export default CommonSlice.reducer;
