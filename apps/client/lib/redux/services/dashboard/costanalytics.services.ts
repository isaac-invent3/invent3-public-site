import { baseApi } from '~/lib/redux/services/baseApi.services';

import {
  BaseApiResponse,
  ListResponse,
  QueryParams,
  SearchQuery,
} from '@repo/interfaces';

import { generateQueryStr } from '~/lib/utils/queryGenerator';
import {
  CategoryByCost,
  CostAnalyticsDashboardCostBreakdownByType,
  CostAnalyticsDashboardSummary,
  CostAnalyticsDetailedCostBreakdown,
  CostAnalyticsMonthlyCostTrend,
  CostAnalyticsROIMetrics,
  CostType,
  FacilitiesByCost,
} from '~/lib/interfaces/dashboard/costanalytics.interfaces';

const getHeaders = () => ({
  'Content-Type': 'application/json',
});

interface CostQuery {
  facilityIds?: number[];
  assetCategoryIds?: number[];
  costPeriod?: number;
  costTypes?: number[];
}

export const costAnalyticsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCostAnalyticsDashboardSummary: builder.query<
      BaseApiResponse<CostAnalyticsDashboardSummary>,
      CostQuery
    >({
      query: (data) => ({
        url: generateQueryStr(
          `/Invent3Pro/CostAnalyticsDashboardSummary?`,
          data
        ),
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    getCostAnalyticsDashboardCostBreakdownByType: builder.query<
      BaseApiResponse<CostAnalyticsDashboardCostBreakdownByType>,
      CostQuery
    >({
      query: (data) => ({
        url: generateQueryStr(
          `/Invent3Pro/CostAnalyticsDashboardCostBreakdownByType?`,
          data
        ),
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    getCostAnalyticsROIMetrics: builder.query<
      BaseApiResponse<CostAnalyticsROIMetrics>,
      CostQuery
    >({
      query: (data) => ({
        url: generateQueryStr(`/Invent3Pro/CostAnalyticsROIMetrics?`, data),
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    getCostAnalyticsMonthlyCostTrend: builder.query<
      BaseApiResponse<CostAnalyticsMonthlyCostTrend>,
      CostQuery
    >({
      query: (data) => ({
        url: generateQueryStr(
          `/Invent3Pro/CostAnalyticsMonthlyCostTrend?`,
          data
        ),
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    getCostAnalyticsTopFacilitiesByCost: builder.query<
      BaseApiResponse<FacilitiesByCost[]>,
      CostQuery
    >({
      query: (data) => ({
        url: generateQueryStr(
          `/Invent3Pro/CostAnalyticsTopFacilitiesByCost?`,
          data
        ),
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    getCostAnalyticsAverageCostPerAssetCategory: builder.query<
      BaseApiResponse<CategoryByCost[]>,
      CostQuery
    >({
      query: (data) => ({
        url: generateQueryStr(
          `/Invent3Pro/CostAnalyticsAverageCostPerAssetCategory?`,
          data
        ),
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    getCostAnalyticsAiInsights: builder.query<
      BaseApiResponse<string[]>,
      CostQuery & QueryParams
    >({
      query: (data) => ({
        url: generateQueryStr(`/Invent3Pro/CostAnalyticsAiInsights?`, data),
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    getCostAnalyticsDetailedCostBreakdown: builder.mutation<
      BaseApiResponse<ListResponse<CostAnalyticsDetailedCostBreakdown>>,
      SearchQuery
    >({
      query: (data) => ({
        url: `/Invent3Pro/CostAnalyticsDetailedCostBreakdown?`,
        method: 'GET',
        headers: getHeaders(),
        body: data,
      }),
    }),
    getCostTypes: builder.query<
      BaseApiResponse<ListResponse<CostType>>,
      QueryParams
    >({
      query: (data) => ({
        url: generateQueryStr(`/CostTypes?`, data),
        method: 'GET',
        headers: getHeaders(),
        body: data,
      }),
    }),
  }),
});

export const {
  useGetCostAnalyticsAiInsightsQuery,
  useGetCostAnalyticsAverageCostPerAssetCategoryQuery,
  useGetCostAnalyticsDashboardCostBreakdownByTypeQuery,
  useGetCostAnalyticsDashboardSummaryQuery,
  useGetCostAnalyticsDetailedCostBreakdownMutation,
  useGetCostAnalyticsMonthlyCostTrendQuery,
  useGetCostAnalyticsROIMetricsQuery,
  useGetCostAnalyticsTopFacilitiesByCostQuery,
  useGetCostTypesQuery,
} = costAnalyticsApi;
