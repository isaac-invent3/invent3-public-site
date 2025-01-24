/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import {
  User,
  UserConfigurationObject,
} from '~/lib/interfaces/user.interfaces';

interface SliceProps {
  user: User | null;
  userConfigurationOptions: UserConfigurationObject[];
  formConfigurationOptions: UserConfigurationObject[];
}

const initialState: SliceProps = {
  user: null,
  userConfigurationOptions: [],
  formConfigurationOptions: [],
};

export const UserSlice = createSlice({
  name: 'userReducer',
  initialState,
  reducers: {
    setUser: (state, { payload }: PayloadAction<User>) => {
      state.user = payload;
    },
    clearUser: (state) => {
      state.user = null;
    },
    setInitialOptions: (
      state,
      { payload }: PayloadAction<UserConfigurationObject[]>
    ) => {
      state.userConfigurationOptions = payload;
      state.formConfigurationOptions = payload;
    },
    updateFormConfigurationOptions: (
      state,
      { payload }: PayloadAction<{ option: number; optionsToRemove?: number[] }>
    ) => {
      // Add the option to formConfigurationOptions if it doesn't already exist else remove it
      if (
        !state.formConfigurationOptions
          .map((item) => item.systemConfigurationOptionId)
          .includes(payload.option)
      ) {
        state.formConfigurationOptions.push({
          userConfigurationOptionId: null,
          systemConfigurationOptionId: payload.option,
        });
      } else {
        state.formConfigurationOptions = state.formConfigurationOptions.filter(
          (item) => item.systemConfigurationOptionId !== payload.option
        );
      }

      // Remove the options in optionsToRemove if they exist
      if (payload.optionsToRemove) {
        state.formConfigurationOptions = state.formConfigurationOptions.filter(
          (option) =>
            !payload.optionsToRemove?.includes(
              option.systemConfigurationOptionId
            )
        );
      }
    },
  },
});

export const {
  setUser,
  clearUser,
  setInitialOptions,
  updateFormConfigurationOptions,
} = UserSlice.actions;

export default UserSlice.reducer;
