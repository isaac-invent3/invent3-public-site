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
  UserPasswordChangeQuery,
} from '~/lib/interfaces/user.interfaces';

const getHeaders = () => ({
  'Content-Type': 'application/json',
});
export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['allUsers', 'userProfile'],
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
    changeUserPassword: builder.mutation<void, UserPasswordChangeQuery>({
      query: (body) => ({
        url: `/Users/ChangePassword`,
        method: 'PUT',
        headers: getHeaders(),
        body,
      }),
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useSearchUsersMutation,
  useGetUserProfileByUserIdQuery,
  useChangeUserPasswordMutation,
} = userApi;
