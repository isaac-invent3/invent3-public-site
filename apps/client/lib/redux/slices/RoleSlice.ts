/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RoleModulePermission } from '~/lib/interfaces/role.interfaces';

interface SliceProps {
  initialRoleModules: RoleModulePermission[];
  formRoleModules: RoleModulePermission[];
}

const initialState: SliceProps = {
  initialRoleModules: [],
  formRoleModules: [],
};

export const RoleSlice = createSlice({
  name: 'roleReducer',
  initialState,
  reducers: {
    setInitialOptions: (
      state,
      { payload }: PayloadAction<RoleModulePermission[]>
    ) => {
      state.initialRoleModules = payload;
      state.formRoleModules = payload;
    },
    updateFormRoleModules: (
      state,
      { payload }: PayloadAction<RoleModulePermission>
    ) => {
      // Check if the module already exists
      const existingIndex = state.formRoleModules.findIndex(
        (item) =>
          item.systemModuleContextTypeId ===
            payload.systemModuleContextTypeId &&
          item.systemSubModuleContextTypeId ===
            payload.systemSubModuleContextTypeId
      );

      if (existingIndex === -1) {
        // Add the module if it doesn't exist
        state.formRoleModules.push(payload);
      } else {
        // Remove the module if it exists
        state.formRoleModules.splice(existingIndex, 1);
      }
    },
  },
});

export const { setInitialOptions, updateFormRoleModules } = RoleSlice.actions;

export default RoleSlice.reducer;
