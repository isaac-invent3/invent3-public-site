import { createApi } from '@reduxjs/toolkit/query/react';
import { BaseApiResponse } from '@repo/interfaces';
import baseQueryWithReauth from '../../baseQueryWithReauth';
import {
  SubscriptionTrend,
  SuperAdminDashboardStats,
  TrafficCount,
  UserDemographics,
} from '~/lib/interfaces/dashboard.interfaces';
import { generateQueryStr } from '~/lib/utils/queryGenerator';

const getHeaders = () => ({
  'Content-Type': 'application/json',
});

export const superAdminApi = createApi({
  reducerPath: 'superAdminApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: [],
  endpoints: (builder) => ({
    getSuperAdminDashboardStat: builder.query<
      BaseApiResponse<SuperAdminDashboardStats>,
      void
    >({
      query: () => ({
        url: `/Invent3Pro/GetSuperAdminDashboardComponents`,
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    getSuperAdminSubscriptionTrend: builder.query<
      BaseApiResponse<SubscriptionTrend[]>,
      void
    >({
      query: () => ({
        url: `/Invent3Pro/GetSuperAdminSubscriptionTrend`,
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    getSuperAdminUserDemographics: builder.query<
      BaseApiResponse<UserDemographics[]>,
      void
    >({
      query: () => ({
        url: `/Invent3Pro/GetSuperAdminUserDemographics`,
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    getSuperAdminTrafficCountGraph: builder.query<
      BaseApiResponse<TrafficCount[]>,
      { year: number }
    >({
      query: (data) => ({
        url: generateQueryStr(
          `/Invent3Pro/GetSuperAdminTrafficCountGraph?`,
          data
        ),
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    getSuperAdminCompanyDistribution: builder.query<
      BaseApiResponse<TrafficCount[]>,
      void
    >({
      query: () => ({
        url: `/Invent3Pro/GetSuperAdminCompanyDistribution`,
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
  }),
});

export const {
  useGetSuperAdminCompanyDistributionQuery,
  useGetSuperAdminDashboardStatQuery,
  useGetSuperAdminSubscriptionTrendQuery,
  useGetSuperAdminTrafficCountGraphQuery,
  useGetSuperAdminUserDemographicsQuery,
} = superAdminApi;
