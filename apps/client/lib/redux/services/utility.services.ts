import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryWithReauth from '../baseQueryWithReauth';

const getHeaders = () => ({
  'Content-Type': 'application/json',
});
export const utilityApi = createApi({
  reducerPath: 'utilityApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: [],
  endpoints: (builder) => ({
    searchApi: builder.mutation({
      query: (body: any) => ({
        url: `/Search`,
        method: 'POST',
        headers: getHeaders(),
        body,
      }),
    }),
    getAppConfigValues: builder.query({
      query: () => ({
        url: '/Invent3Pro/GetDefaultAppConfigValues',
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
  }),
});

export const { useSearchApiMutation, useGetAppConfigValuesQuery } = utilityApi;
