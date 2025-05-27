import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryWithReauth from '../baseQueryWithReauth';
import { AppConfig } from '~/lib/interfaces/general.interfaces';
import { BaseApiResponse } from '@repo/interfaces';
import {
  Settings,
  UpdateSettingsPayload,
} from '~/lib/interfaces/settings.interfaces';

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
    getSettings: builder.query<
      BaseApiResponse<Settings>,
      { companyId: number }
    >({
      query: ({ companyId }) => ({
        url: `/Settings/Company/${companyId}`,
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    updateSettings: builder.mutation<void, UpdateSettingsPayload>({
      query: (body) => ({
        url: `/Settings/${body.companyId}`,
        method: 'PUT',
        headers: getHeaders(),
        body,
      }),
    }),
  }),
});

export const {
  useGetAppConfigValuesQuery,
  useUpdateSettingsMutation,
  useGetSettingsQuery,
} = utilityApi;
