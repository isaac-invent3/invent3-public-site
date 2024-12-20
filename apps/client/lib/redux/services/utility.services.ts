import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryWithReauth from '../baseQueryWithReauth';
import { AppConfig } from '~/lib/interfaces/general.interfaces';
import { BaseApiResponse } from '@repo/interfaces';

const getHeaders = () => ({
  'Content-Type': 'application/json',
});
export const utilityApi = createApi({
  reducerPath: 'utilityApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: [],
  endpoints: (builder) => ({
    getAppConfigValues: builder.query<BaseApiResponse<AppConfig>, {}>({
      query: () => ({
        url: '/Invent3Pro/GetDefaultAppConfigValues',
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
  }),
});

export const { useGetAppConfigValuesQuery } = utilityApi;
