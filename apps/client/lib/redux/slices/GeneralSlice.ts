/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { AppConfig } from '~/lib/interfaces/general.interfaces';

interface SliceProps {
  appConfigValues: AppConfig;
}

const initialState: SliceProps = {
  appConfigValues: {
    DEFAULT_COMPLETED_TASK_STATUS_ID: null,
    DEFAULT_ESTIMATED_TASK_DURATION_IN_HOURS: null,
  },
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
  },
});

export const { setCredentials } = GeneralSlice.actions;

export default GeneralSlice.reducer;
