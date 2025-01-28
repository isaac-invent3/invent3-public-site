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
  User,
  UserConfigurationOption,
  UserConfigurationPayload,
  UserDesignation,
  UserGroup,
  UserGroupMember,
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
      providesTags: ['allUsers'],
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
} = userApi;
