import { createApi } from '@reduxjs/toolkit/query/react';
import { generateQueryStr } from '~/lib/utils/queryGenerator';
import baseQueryWithReauth from '../baseQueryWithReauth';
import {
  BaseApiResponse,
  ListResponse,
  QueryParams,
  SearchQuery,
} from '@repo/interfaces';
import { User } from '~/lib/interfaces/user.interfaces';

const getHeaders = () => ({
  'Content-Type': 'application/json',
});
export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['allUsers'],
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
  }),
});

export const { useGetAllUsersQuery, useSearchUsersMutation } = userApi;
