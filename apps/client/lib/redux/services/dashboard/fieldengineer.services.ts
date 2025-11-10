import { baseApi } from '~/lib/redux/services/baseApi.services';

import { BaseApiResponse } from '@repo/interfaces';

import {
  AssetOverview,
  MaintenanceSuccessChartData,
  TaskCompletion,
  TicketOverView,
} from '~/lib/interfaces/dashboard/fieldengineer.interfaces';

const getHeaders = () => ({
  'Content-Type': 'application/json',
});

export const fieldEngineerDashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getFieldEngineerTicketOverview: builder.query<
      BaseApiResponse<TicketOverView>,
      { userId: number }
    >({
      query: ({ userId }) => ({
        url: `/Invent3Pro/GetFieldEngineerTicketsThisMonth/${userId}?`,
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    getFieldEngineerTaskChartData: builder.query<
      BaseApiResponse<TaskCompletion[]>,
      { userId: number }
    >({
      query: ({ userId }) => ({
        url: `/Invent3Pro/GetFieldEngineerTaskStatusGraph/${userId}?`,
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    getFieldEngineerAssetStatusData: builder.query<
      BaseApiResponse<AssetOverview>,
      { userId: number }
    >({
      query: ({ userId }) => ({
        url: `/Invent3Pro/GetFieldEngineerAssetStatus/${userId}?`,
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    getFieldEngineerkMaintenanceSuccessChartData: builder.query<
      BaseApiResponse<MaintenanceSuccessChartData[]>,
      { userId: number }
    >({
      query: ({ userId }) => ({
        url: `/Invent3Pro/GetFieldEngineerMaintenanceChart/${userId}?`,
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
  }),
});

export const {
  useGetFieldEngineerAssetStatusDataQuery,
  useGetFieldEngineerTaskChartDataQuery,
  useGetFieldEngineerTicketOverviewQuery,
  useGetFieldEngineerkMaintenanceSuccessChartDataQuery,
} = fieldEngineerDashboardApi;
