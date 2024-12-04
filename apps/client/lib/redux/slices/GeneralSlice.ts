/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface SliceProps {
  appConfigValues: null | any;
}

const initialState: SliceProps = {
  appConfigValues: null,
};

export const GeneralSlice = createSlice({
  name: 'generalReducer',
  initialState,
  reducers: {
    setCredentials: (
      state,
      { payload: { appConfigValues } }: PayloadAction<{ appConfigValues: any }>
    ) => {
      state.appConfigValues = appConfigValues;
    },
  },
});

export const { setCredentials } = GeneralSlice.actions;

export default GeneralSlice.reducer;
