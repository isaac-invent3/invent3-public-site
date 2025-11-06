import { createApi } from '@reduxjs/toolkit/query/react';
import { BaseApiResponse, ListResponse, QueryParams } from '@repo/interfaces';
import baseQueryWithReauth from '../../baseQueryWithReauth';
import { generateQueryStr } from '~/lib/utils/queryGenerator';
import {
  PredictiveMaintenanceDashboardSummary,
  AssetRiskDistribution,
  AnomalyTrend,
  PredictedFailures,
  TopPerformingModel,
  ModelAccuracyTrend,
  AssetPredictiveSummary,
} from '~/lib/interfaces/dashboard/predictivemaintenance.interfaces';

const getHeaders = () => ({
  'Content-Type': 'application/json',
});

interface MaintenanceQuery {
  facilityIds?: number[];
  assetCategoryIds?: number[];
  datePeriod?: number;
  riskThreshold?: number;
}

export const predictiveMaintenanceApi = createApi({
  reducerPath: 'predictiveMaintenanceApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: [],
  endpoints: (builder) => ({
    getPredictiveMaintenanceDashboardSummary: builder.query<
      BaseApiResponse<PredictiveMaintenanceDashboardSummary>,
      MaintenanceQuery
    >({
      query: (data) => ({
        url: generateQueryStr(
          `/Invent3Pro/PredictiveMaintenanceDashboardSummary?`,
          data
        ),
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    getPredictiveMaintenanceDashboardAssetRiskDistribution: builder.query<
      BaseApiResponse<AssetRiskDistribution>,
      MaintenanceQuery
    >({
      query: (data) => ({
        url: generateQueryStr(
          `/Invent3Pro/PredictiveMaintenanceDashboardAssetRiskDistribution?`,
          data
        ),
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    getPredictiveMaintenanceDashboardAnomaliesTrend: builder.query<
      BaseApiResponse<AnomalyTrend[]>,
      MaintenanceQuery
    >({
      query: (data) => ({
        url: generateQueryStr(
          `/Invent3Pro/PredictiveMaintenanceDashboardAnomaliesTrend?`,
          data
        ),
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    getPredictiveMaintenanceDashboardPredictedFailures: builder.query<
      BaseApiResponse<PredictedFailures[]>,
      MaintenanceQuery
    >({
      query: (data) => ({
        url: generateQueryStr(
          `/Invent3Pro/PredictiveMaintenanceDashboardPredictedFailures?`,
          data
        ),
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    getPredictiveMaintenanceDashboardTopPerformingModels: builder.query<
      BaseApiResponse<TopPerformingModel[]>,
      MaintenanceQuery & QueryParams
    >({
      query: (data) => ({
        url: generateQueryStr(
          `/Invent3Pro/PredictiveMaintenanceDashboardTopPerformingModels?`,
          data
        ),
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    getPredictiveMaintenanceDashboardModelAccuracyTrend: builder.query<
      BaseApiResponse<ModelAccuracyTrend[]>,
      MaintenanceQuery
    >({
      query: (data) => ({
        url: generateQueryStr(
          `/Invent3Pro/PredictiveMaintenanceDashboardModelAccuracyTrend?`,
          data
        ),
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    getPredictiveMaintenanceDashboardAiHighlights: builder.query<
      BaseApiResponse<{ insight: string }[]>,
      MaintenanceQuery
    >({
      query: (data) => ({
        url: generateQueryStr(
          `/Invent3Pro/PredictiveMaintenanceDashboardAiHighlights?`,
          data
        ),
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    getPredictiveMaintenanceDashboardAssetPredictiveSummary: builder.query<
      BaseApiResponse<AssetPredictiveSummary[]>,
      MaintenanceQuery
    >({
      query: (data) => ({
        url: generateQueryStr(
          `/Invent3Pro/PredictiveMaintenanceDashboardAssetPredictiveSummary?`,
          data
        ),
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
  }),
});

export const {
  useGetPredictiveMaintenanceDashboardAiHighlightsQuery,
  useGetPredictiveMaintenanceDashboardAnomaliesTrendQuery,
  useGetPredictiveMaintenanceDashboardAssetPredictiveSummaryQuery,
  useGetPredictiveMaintenanceDashboardAssetRiskDistributionQuery,
  useGetPredictiveMaintenanceDashboardModelAccuracyTrendQuery,
  useGetPredictiveMaintenanceDashboardPredictedFailuresQuery,
  useGetPredictiveMaintenanceDashboardSummaryQuery,
  useGetPredictiveMaintenanceDashboardTopPerformingModelsQuery,
} = predictiveMaintenanceApi;
