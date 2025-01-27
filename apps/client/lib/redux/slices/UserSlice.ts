/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import {
  User,
  UserConfigurationObject,
  UserFormDetails,
} from '~/lib/interfaces/user.interfaces';

const initialUserForm = {
  picture: null,
  firstName: null,
  middleName: null,
  lastName: null,
  dob: null,
  mobileNumber: null,
  personalEmail: null,
  workEmail: null,
  gender: null,
  address1: null,
  address2: null,
  country: null,
  state: null,
  city: null,
  postalCode: null,
  documents: [],
  employmentType: null,
  branch: null,
  jobTitle: null,
  team: null,
  userRole: null,
  userGroup: [],
};

interface SliceProps {
  user: User | null;
  userConfigurationOptions: UserConfigurationObject[];
  formConfigurationOptions: UserConfigurationObject[];
  userForm: UserFormDetails;
}

const initialState: SliceProps = {
  user: null,
  userConfigurationOptions: [],
  formConfigurationOptions: [],
  userForm: initialUserForm,
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
    setUserForm: (state, { payload }: PayloadAction<UserFormDetails>) => {
      state.userForm = payload;
    },
    updateUserForm: (
      state,
      { payload }: PayloadAction<Partial<UserFormDetails>>
    ) => {
      state.userForm = { ...state.userForm, ...payload };
    },
    clearUserForm: (state) => {
      state.userForm = initialUserForm;
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
  setUserForm,
  updateUserForm,
  clearUserForm,
  setInitialOptions,
  updateFormConfigurationOptions,
} = UserSlice.actions;

export default UserSlice.reducer;
