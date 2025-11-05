import { createApi } from '@reduxjs/toolkit/query/react';
import { BaseApiResponse, ListResponse, QueryParams } from '@repo/interfaces';
import baseQueryWithReauth from '../../baseQueryWithReauth';
import {
  DistributionByCategory,
  PerformanceSummary,
  PredictiveRiskLevel,
  ReliabilityMetrics,
  DashboardByCateogry,
} from '~/lib/interfaces/dashboard/assetperformance.interfaces';
import { generateQueryStr } from '~/lib/utils/queryGenerator';

const getHeaders = () => ({
  'Content-Type': 'application/json',
});

interface PerformanceQuery {
  facilityIds?: number[];
  assetCategoryIds?: number[];
  datePeriod?: number;
}

export const assetPerformanceDashboardApi = createApi({
  reducerPath: 'assetPerformanceDashboardApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: [],
  endpoints: (builder) => ({
    getAssetPerformanceDashboardSummary: builder.query<
      BaseApiResponse<PerformanceSummary>,
      PerformanceQuery
    >({
      query: (data) => ({
        url: generateQueryStr(
          `/Invent3Pro/AssetPerformanceDashboardSummary?`,
          data
        ),
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    getAssetPerformanceDistributionByCategory: builder.query<
      BaseApiResponse<DistributionByCategory>,
      PerformanceQuery
    >({
      query: (data) => ({
        url: generateQueryStr(
          `/Invent3Pro/AssetPerformaceDashboardDistributionByCategory?`,
          data
        ),
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    getAssetPerformanceReliabilityMetrics: builder.query<
      BaseApiResponse<ReliabilityMetrics[]>,
      PerformanceQuery
    >({
      query: (data) => ({
        url: generateQueryStr(
          `/Invent3Pro/AssetPerformaceDashboardReliabilityMetrics?`,
          data
        ),
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    getAssetPerformancePredictiveRiskLevel: builder.query<
      BaseApiResponse<PredictiveRiskLevel[]>,
      PerformanceQuery
    >({
      query: (data) => ({
        url: generateQueryStr(
          `/Invent3Pro/AssetPerformaceDashboardPredictiveRiskLevel?`,
          data
        ),
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    getAssetPerformanceByCategory: builder.query<
      BaseApiResponse<ListResponse<DashboardByCateogry>>,
      PerformanceQuery & QueryParams
    >({
      query: (data) => ({
        url: generateQueryStr(
          `/Invent3Pro/AssetPerformaceDashboardByCategory?`,
          data
        ),
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
  }),
});

export const {
  useGetAssetPerformanceByCategoryQuery,
  useGetAssetPerformanceDashboardSummaryQuery,
  useGetAssetPerformanceDistributionByCategoryQuery,
  useGetAssetPerformancePredictiveRiskLevelQuery,
  useGetAssetPerformanceReliabilityMetricsQuery,
} = assetPerformanceDashboardApi;
