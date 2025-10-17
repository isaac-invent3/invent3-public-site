import { createApi } from '@reduxjs/toolkit/query/react';
import { generateQueryStr } from '~/lib/utils/queryGenerator';
import baseQueryWithReauth from '../../baseQueryWithReauth';
import { BaseApiResponse } from '@repo/interfaces';
import {
  LifeCycleSummary,
  LifecyleComparisionReportRUL,
  LifecycleComparisonReport,
  LifeCycleFilter,
} from '~/lib/interfaces/location/lifecycle.interfaces';

const getHeaders = () => ({
  'Content-Type': 'application/json',
});

export const lifeCycleComparisonApi = createApi({
  reducerPath: 'lifeCycleComparisonApi',
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getLifecycleDashboardSummary: builder.query<
      BaseApiResponse<LifeCycleSummary>,
      LifeCycleFilter
    >({
      query: (data) => ({
        url: generateQueryStr(
          `/Invent3Pro/LifeCycleComparisonReportSummary?`,
          data
        ),
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    getLifeCycleComparisonReportRUL: builder.query<
      BaseApiResponse<LifecyleComparisionReportRUL[]>,
      LifeCycleFilter
    >({
      query: (data) => ({
        url: generateQueryStr(
          `/Invent3Pro/LifeCycleComparisonReportRUL?`,
          data
        ),
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    getLifeCycleComparisonReport: builder.query<
      BaseApiResponse<LifecycleComparisonReport[]>,
      LifeCycleFilter
    >({
      query: (data) => ({
        url: generateQueryStr(`/Invent3Pro/LifeCycleComparisonReport?`, data),
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    getLifeCycleComparisonReportInsights: builder.query<
      BaseApiResponse<string[]>,
      LifeCycleFilter
    >({
      query: (data) => ({
        url: generateQueryStr(
          `/Invent3Pro/LifeCycleComparisonReportInsights?`,
          data
        ),
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
  }),
});

export const {
  useGetLifeCycleComparisonReportInsightsQuery,
  useGetLifeCycleComparisonReportQuery,
  useGetLifeCycleComparisonReportRULQuery,
  useGetLifecycleDashboardSummaryQuery,
} = lifeCycleComparisonApi;
