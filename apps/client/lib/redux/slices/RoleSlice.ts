/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RoleModulePermission } from '~/lib/interfaces/role.interfaces';
import { User } from '~/lib/interfaces/user.interfaces';

interface UserGroupFormDetails {
  groupId: number | null;
  groupName: string | null;
  users: User[];
  newlyAddedUsers: User[];
  initialUserGroupRoleIds: number[];
  formUserGroupRoleIds: number[];
  removedUserIds: number[];
}

interface SliceProps {
  initialRoleModules: RoleModulePermission[];
  formRoleModules: RoleModulePermission[];
  userGroupFormDetails: UserGroupFormDetails;
}

const initialState: SliceProps = {
  initialRoleModules: [],
  formRoleModules: [],
  userGroupFormDetails: {
    groupId: null,
    groupName: null,
    users: [],
    initialUserGroupRoleIds: [],
    formUserGroupRoleIds: [],
    newlyAddedUsers: [],
    removedUserIds: [],
  },
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
    setUserGroupFormDetails: (
      state,
      { payload }: PayloadAction<UserGroupFormDetails>
    ) => {
      state.userGroupFormDetails = payload;
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
    updateUserGroupFormDetails: (
      state,
      { payload }: PayloadAction<Partial<UserGroupFormDetails>>
    ) => {
      state.userGroupFormDetails = {
        ...state.userGroupFormDetails,
        ...payload,
      };
    },
    addNewUserGroupUser: (state, { payload }: PayloadAction<User>) => {
      // Check if the User already exists
      if (
        !state.userGroupFormDetails.newlyAddedUsers
          .map((item) => item.userId)
          .includes(payload.userId)
      ) {
        // Add the User if it doesn't exist
        state.userGroupFormDetails = {
          ...state.userGroupFormDetails,
          newlyAddedUsers: [
            ...state.userGroupFormDetails.newlyAddedUsers,
            payload,
          ],
          removedUserIds: state.userGroupFormDetails.removedUserIds.filter(
            (item) => item !== payload.userId
          ),
        };
      }
    },
    deleteUserGroupUser: (state, { payload }: PayloadAction<number>) => {
      state.userGroupFormDetails = {
        ...state.userGroupFormDetails,
        newlyAddedUsers: state.userGroupFormDetails.newlyAddedUsers.filter(
          (item) => item.userId !== payload
        ),
        removedUserIds: [...state.userGroupFormDetails.removedUserIds, payload],
      };
    },
    updateUserGroupRoleIds: (state, { payload }: PayloadAction<number>) => {
      // Check if the role already exists
      if (!state.userGroupFormDetails.formUserGroupRoleIds.includes(payload)) {
        // Add the role if it doesn't exist
        state.userGroupFormDetails = {
          ...state.userGroupFormDetails,
          formUserGroupRoleIds: [
            ...state.userGroupFormDetails.formUserGroupRoleIds,
            payload,
          ],
        };
      } else {
        // Remove the role if it exists
        state.userGroupFormDetails = {
          ...state.userGroupFormDetails,

          formUserGroupRoleIds:
            state.userGroupFormDetails.formUserGroupRoleIds.filter(
              (item) => item !== payload
            ),
        };
      }
    },
  },
});

export const {
  setInitialOptions,
  updateFormRoleModules,
  updateUserGroupRoleIds,
  setUserGroupFormDetails,
  updateUserGroupFormDetails,
  addNewUserGroupUser,
  deleteUserGroupUser,
} = RoleSlice.actions;

export default RoleSlice.reducer;
