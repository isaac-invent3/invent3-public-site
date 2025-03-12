/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Settings } from '~/lib/interfaces/settings.interfaces';

interface SliceProps {
  settings: Settings | null;
}

const initialState: SliceProps = {
  settings: null,
};

export const SettingsSlice = createSlice({
  name: 'settingsReducer',
  initialState,
  reducers: {
    setSettings: (state, { payload }: PayloadAction<Settings>) => {
      state.settings = payload;
    },
  },
});

export const { setSettings } = SettingsSlice.actions;

export default SettingsSlice.reducer;
