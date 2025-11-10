import { baseApi } from '~/lib/redux/services/baseApi.services';

import { BaseApiResponse } from '@repo/interfaces';

import {
  FrontendDashboardChartData,
  FrontendDashboardStats,
  MaintenanceSuccessChartData,
} from '~/lib/interfaces/dashboard.interfaces';

const getHeaders = () => ({
  'Content-Type': 'application/json',
});

export const frontdeskDashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getFrontdeskDashboardStat: builder.query<
      BaseApiResponse<FrontendDashboardStats>,
      { userId: number }
    >({
      query: ({ userId }) => ({
        url: `/Invent3Pro/GetCSRCountRelatedDashBoardComponents/${userId}?`,
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    getFrontdeskChartData: builder.query<
      BaseApiResponse<FrontendDashboardChartData>,
      { userId: number; facilityId?: number; year: number }
    >({
      query: ({ userId }) => ({
        url: `/Invent3Pro/GetCSRGraphComponents/${userId}?`,
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    getFrontdeskMaintenanceSuccessChartData: builder.query<
      BaseApiResponse<MaintenanceSuccessChartData[]>,
      { userId: number }
    >({
      query: ({ userId }) => ({
        url: `/Invent3Pro/GetCSRMaintenanceSuccessGraph/${userId}?`,
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
  }),
});

export const {
  useGetFrontdeskDashboardStatQuery,
  useGetFrontdeskChartDataQuery,
  useGetFrontdeskMaintenanceSuccessChartDataQuery,
} = frontdeskDashboardApi;
