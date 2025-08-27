import { createApi } from '@reduxjs/toolkit/query/react';
import { generateQueryStr } from '~/lib/utils/queryGenerator';
import baseQueryWithReauth from '../baseQueryWithReauth';
import {
  BaseApiResponse,
  ListResponse,
  QueryParams,
  SearchQuery,
} from '@repo/interfaces';
import {
  ActiveDirectoryUser,
  CreateUserPayload,
  Group,
  UpdateUserGroupPayload,
  UpdateUserPayload,
  User,
  UserConfigurationOption,
  UserConfigurationPayload,
  UserDocument,
  UserGroup,
  UserGroupInfoHeader,
  UserGroupMember,
  UserGroupPayload,
  UserPasswordChangeQuery,
} from '~/lib/interfaces/user.interfaces';

const getHeaders = () => ({
  'Content-Type': 'application/json',
});
export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    'allUsers',
    'userProfile',
    'allUserConfigurationOptions',
    'userDetail',
    'userGroups',
    'allUserGroupInfoHeaders',
    'allActiveUsers',
  ],
  endpoints: (builder) => ({
    getAllUsers: builder.query<
      BaseApiResponse<ListResponse<User>>,
      QueryParams
    >({
      query: (data) => ({
        url: generateQueryStr(`/Users?`, data),
        method: 'GET',
        headers: getHeaders(),
      }),
      providesTags: ['allUsers'],
    }),
    getAllActiveUsers: builder.query<
      BaseApiResponse<ListResponse<User>>,
      QueryParams
    >({
      query: (data) => ({
        url: generateQueryStr(`/Users/GetActiveUsers?`, data),
        method: 'GET',
        headers: getHeaders(),
      }),
      providesTags: ['allActiveUsers'],
    }),
    getAllUserGroups: builder.query<
      BaseApiResponse<ListResponse<UserGroup>>,
      QueryParams
    >({
      query: (data) => ({
        url: generateQueryStr(`/UserGroups?`, data),
        method: 'GET',
        headers: getHeaders(),
      }),
      providesTags: ['userGroups'],
    }),
    getAllUserGroupsInfoHeader: builder.query<
      BaseApiResponse<ListResponse<UserGroupInfoHeader>>,
      QueryParams & { searchParam?: string }
    >({
      query: (data) => ({
        url: generateQueryStr(`/Groups/GroupInfoHeaders?`, data),
        method: 'GET',
        headers: getHeaders(),
      }),
      providesTags: ['allUserGroupInfoHeaders'],
    }),
    getUserGroups: builder.query<
      BaseApiResponse<ListResponse<UserGroup>>,
      QueryParams & { userId: number }
    >({
      query: ({ userId, ...data }) => ({
        url: generateQueryStr(
          `/UserGroups/GetUserGroupsInfoHeaderByUserId/${userId}?`,
          data
        ),
        method: 'GET',
        headers: getHeaders(),
      }),
      providesTags: ['allUsers'],
    }),
    getUserDocuments: builder.query<
      BaseApiResponse<ListResponse<UserDocument>>,
      QueryParams & { userId: number }
    >({
      query: ({ userId, ...data }) => ({
        url: generateQueryStr(`/UserDocuments/ByUserId/${userId}?`, data),
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    getUserGroupMembers: builder.query<
      BaseApiResponse<ListResponse<UserGroupMember>>,
      QueryParams & { userId: number; groupId: number }
    >({
      query: ({ userId, ...data }) => ({
        url: generateQueryStr(`/Users/GetGroupMembersInfo/${userId}?`, data),
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    getUserProfileByGuid: builder.query<
      BaseApiResponse<User>,
      { guid: string }
    >({
      query: ({ guid }) => ({
        url: `/Users/GetUserProfileDetails/${guid}`,
        method: 'GET',
        headers: getHeaders(),
      }),
      providesTags: ['userProfile'],
    }),
    getUserById: builder.query<BaseApiResponse<User>, { userId: number }>({
      query: ({ userId }) => ({
        url: `/Users/GetUserInfo/${userId}`,
        method: 'GET',
        headers: getHeaders(),
      }),
      providesTags: ['userDetail'],
    }),
    getUserGroupById: builder.query<
      BaseApiResponse<Group>,
      { groupId: number }
    >({
      query: ({ groupId }) => ({
        url: `/Groups/${groupId}`,
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    getUserConfigurationOptions: builder.query<
      BaseApiResponse<ListResponse<UserConfigurationOption>>,
      QueryParams & { userId: number }
    >({
      query: ({ userId, ...data }) => ({
        url: generateQueryStr(
          `/UserConfigurationOptions/GetUserConfigurationOptionsByUserId/${userId}?`,
          data
        ),
        method: 'GET',
        headers: getHeaders(),
      }),
      providesTags: ['allUserConfigurationOptions'],
    }),
    searchUsers: builder.mutation<
      BaseApiResponse<ListResponse<User>>,
      SearchQuery
    >({
      query: (body) => ({
        url: `/Users/Search`,
        method: 'POST',
        headers: getHeaders(),
        body,
      }),
    }),
    searchUserGroup: builder.mutation<
      BaseApiResponse<ListResponse<UserGroup>>,
      SearchQuery
    >({
      query: (body) => ({
        url: `/Groups/Search`,
        method: 'POST',
        headers: getHeaders(),
        body,
      }),
    }),
    changeUserPassword: builder.mutation<void, UserPasswordChangeQuery>({
      query: (body) => ({
        url: `/Users/ChangePassword`,
        method: 'PUT',
        headers: getHeaders(),
        body,
      }),
    }),
    updateUserConfigurationOptions: builder.mutation<
      void,
      UserConfigurationPayload[]
    >({
      query: (body) => ({
        url: `/Invent3Pro/UpdateUserConfigurationOptions`,
        method: 'PUT',
        headers: getHeaders(),
        body,
      }),
      invalidatesTags: ['allUserConfigurationOptions'],
    }),
    createUserGroup: builder.mutation<
      BaseApiResponse<UserGroupInfoHeader>,
      UserGroupPayload
    >({
      query: (body) => ({
        url: `/Roles/UserGroupWithRoles`,
        method: 'POST',
        headers: getHeaders(),
        body,
      }),
      invalidatesTags: ['allUserGroupInfoHeaders'],
    }),
    updateUserGroup: builder.mutation<
      BaseApiResponse<UserGroupInfoHeader>,
      UpdateUserGroupPayload
    >({
      query: (body) => ({
        url: `/Groups/${body.groupId}`,
        method: 'PUT',
        headers: getHeaders(),
        body,
      }),
      invalidatesTags: ['allUserGroupInfoHeaders'],
    }),
    createUser: builder.mutation<BaseApiResponse<User>, CreateUserPayload>({
      query: (body) => ({
        url: `/Invent3Pro/Users/Create`,
        method: 'POST',
        headers: getHeaders(),
        body,
      }),
      invalidatesTags: ['allUsers'],
    }),
    updateUser: builder.mutation<BaseApiResponse<User>, UpdateUserPayload>({
      query: (body) => ({
        url: `/Invent3Pro/User/Update`,
        method: 'PUT',
        headers: getHeaders(),
        body,
      }),
      invalidatesTags: ['allUsers'],
    }),
    toggleUserStatus: builder.mutation<
      BaseApiResponse<User>,
      { userId: number; lastModifiedBy: string }
    >({
      query: ({ userId, ...body }) => ({
        url: generateQueryStr(`/Users/ToggleUserStatus/${userId}?`, body),
        method: 'PUT',
        headers: getHeaders(),
        body,
      }),
      invalidatesTags: ['allUsers'],
    }),
    deleteUserGroup: builder.mutation<void, { id: number; deletedBy: string }>({
      query: ({ id, ...body }) => ({
        url: `/Groups/${id}`,
        method: 'DELETE',
        headers: getHeaders(),
        body,
      }),
      invalidatesTags: ['allUserGroupInfoHeaders'],
    }),
    getActiveDirectoryUsers: builder.query<
      BaseApiResponse<ActiveDirectoryUser>,
      void
    >({
      query: () => ({
        url: `/Invent3Pro/GetUsersFromAD?`,
        method: 'GET',
        headers: getHeaders(),
      }),
      providesTags: ['allUsers'],
    }),
    initiateResetPassword: builder.mutation<
      void,
      { userId: number; firstName: string; requestedBy: string }
    >({
      query: ({ userId, ...body }) => ({
        url: generateQueryStr(`/Users/ResetPassword/${userId}?`, body),
        method: 'PUT',
        headers: getHeaders(),
        body,
      }),
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetUserGroupsQuery,
  useGetUserGroupMembersQuery,
  useSearchUsersMutation,
  useGetUserProfileByGuidQuery,
  useGetUserByIdQuery,
  useChangeUserPasswordMutation,
  useGetUserConfigurationOptionsQuery,
  useUpdateUserConfigurationOptionsMutation,
  useGetAllUserGroupsQuery,
  useGetAllUserGroupsInfoHeaderQuery,
  useCreateUserGroupMutation,
  useCreateUserMutation,
  useUpdateUserMutation,
  useSearchUserGroupMutation,
  useGetUserGroupByIdQuery,
  useUpdateUserGroupMutation,
  useDeleteUserGroupMutation,
  useGetUserDocumentsQuery,
  useToggleUserStatusMutation,
  useGetActiveDirectoryUsersQuery,
  useGetAllActiveUsersQuery,
  useInitiateResetPasswordMutation,
} = userApi;
