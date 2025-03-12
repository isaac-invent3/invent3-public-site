import { createApi } from '@reduxjs/toolkit/query/react';
import { BaseApiResponse } from '@repo/interfaces';
import baseQueryWithReauth from '../../baseQueryWithReauth';
import {
  AssetTrendData,
  DashboardStats,
  MaintenanceDowntime,
  TaskCompletedData,
  UserActivity,
} from '~/lib/interfaces/dashboard/clientadmin.interfaces';
import { generateQueryStr } from '~/lib/utils/queryGenerator';

const getHeaders = () => ({
  'Content-Type': 'application/json',
});

export const clientAdminApi = createApi({
  reducerPath: 'clientAdminApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: [],
  endpoints: (builder) => ({
    getDashboardStat: builder.query<
      BaseApiResponse<DashboardStats>,
      { countryId: number; regionId?: number }
    >({
      query: ({ countryId, ...data }) => ({
        url: generateQueryStr(
          `/Invent3Pro/GetCountRelatedClientAdminDashBoardComponents/${countryId}?`,
          data
        ),
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    getAssetTrends: builder.query<
      BaseApiResponse<AssetTrendData>,
      { countryId: number; regionId?: number; year?: number; monthNo?: number }
    >({
      query: ({ countryId, ...data }) => ({
        url: generateQueryStr(
          `/Invent3Pro/GetAssetTrendsClientAdminDashboardComponent/${countryId}?`,
          data
        ),
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    getTaskCompletionRateData: builder.query<
      BaseApiResponse<TaskCompletedData>,
      { countryId: number; regionId?: number; year?: number; monthNo?: number }
    >({
      query: ({ countryId, ...data }) => ({
        url: generateQueryStr(
          `/Invent3Pro/GetTaskCompletionRateClientAdminDashboardComponent/${countryId}?`,
          data
        ),
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    getMaintenanceDownTimeData: builder.query<
      BaseApiResponse<MaintenanceDowntime>,
      { countryId: number; regionId?: number; year?: number; monthNo?: number }
    >({
      query: ({ countryId, ...data }) => ({
        url: generateQueryStr(
          `/Invent3Pro/GetMaintenanceDownTimeClientAdminDashboardComponent/${countryId}?`,
          data
        ),
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    getUserActivityData: builder.query<
      BaseApiResponse<UserActivity[]>,
      { countryId: number; regionId?: number; year?: number; monthNo?: number }
    >({
      query: ({ countryId, ...data }) => ({
        url: generateQueryStr(
          `/Invent3Pro/GetUserActivityClientAdminDashboardComponent/${countryId}?`,
          data
        ),
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
  }),
});

export const {
  useGetAssetTrendsQuery,
  useGetDashboardStatQuery,
  useGetTaskCompletionRateDataQuery,
  useGetUserActivityDataQuery,
  useGetMaintenanceDownTimeDataQuery,
} = clientAdminApi;
