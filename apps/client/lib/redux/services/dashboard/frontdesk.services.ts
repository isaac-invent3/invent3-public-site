import { createApi } from '@reduxjs/toolkit/query/react';
import { BaseApiResponse } from '@repo/interfaces';
import baseQueryWithReauth from '../../baseQueryWithReauth';
import {
  FrontendDashboardChartData,
  FrontendDashboardStats,
  MaintenanceSuccessChartData,
} from '~/lib/interfaces/dashboard.interfaces';

const getHeaders = () => ({
  'Content-Type': 'application/json',
});

export const frontdeskDashboardApi = createApi({
  reducerPath: 'frontdeskDashboardApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: [],
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
