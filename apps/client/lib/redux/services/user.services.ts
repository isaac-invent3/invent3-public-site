import { createApi } from '@reduxjs/toolkit/query/react';
import { generateQueryStr } from '~/lib/utils/queryGenerator';
import baseQueryWithReauth from '../baseQueryWithReauth';

const getHeaders = () => ({
  'Content-Type': 'application/json',
});
export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['allUsers'],
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: (data: any) => ({
        url: generateQueryStr(`/Users?`, data),
        method: 'GET',
        headers: getHeaders(),
      }),
      providesTags: ['allUsers'],
    }),
  }),
});

export const { useGetAllUsersQuery } = userApi;
