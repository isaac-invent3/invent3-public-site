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
  CreateUserPayload,
  Group,
  UpdateUserGroupPayload,
  UpdateUserPayload,
  User,
  UserConfigurationOption,
  UserConfigurationPayload,
  UserDesignation,
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
      QueryParams
    >({
      query: (data) => ({
        url: generateQueryStr(`/UserGroups/GetUserGroupsInfoHeaders?`, data),
        method: 'GET',
        headers: getHeaders(),
      }),
      providesTags: ['allUserGroupInfoHeaders'],
    }),
    getAllUserDesignations: builder.query<
      BaseApiResponse<ListResponse<UserDesignation>>,
      QueryParams
    >({
      query: (data) => ({
        url: generateQueryStr(`/UserDesignations?`, data),
        method: 'GET',
        headers: getHeaders(),
      }),
      providesTags: ['allUsers'],
    }),
    getUserGroups: builder.query<
      BaseApiResponse<ListResponse<UserGroup>>,
      QueryParams & { userId: number }
    >({
      query: ({ userId, ...data }) => ({
        url: generateQueryStr(`/Users/GetUserGroupsInfo/${userId}?`, data),
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
      providesTags: ['allUsers'],
    }),
    getUserProfileByUserId: builder.query<
      BaseApiResponse<User>,
      { userId: number }
    >({
      query: ({ userId }) => ({
        url: `/Users/GetUserProfileDetails/${userId}`,
        method: 'GET',
        headers: getHeaders(),
      }),
      providesTags: ['userProfile'],
    }),
    getUserById: builder.query<BaseApiResponse<User>, { userId: number }>({
      query: ({ userId }) => ({
        url: `/Users/${userId}`,
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
    searchUserDesignation: builder.mutation<
      BaseApiResponse<ListResponse<UserDesignation>>,
      SearchQuery
    >({
      query: (body) => ({
        url: `/UserDesignations`,
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
        url: `/Invent3Pro/Users/Update`,
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
  }),
});

export const {
  useGetAllUsersQuery,
  useGetUserGroupsQuery,
  useGetUserGroupMembersQuery,
  useSearchUsersMutation,
  useGetUserProfileByUserIdQuery,
  useGetUserByIdQuery,
  useChangeUserPasswordMutation,
  useGetUserConfigurationOptionsQuery,
  useUpdateUserConfigurationOptionsMutation,
  useGetAllUserDesignationsQuery,
  useSearchUserDesignationMutation,
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
} = userApi;
