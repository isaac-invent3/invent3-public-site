import { createApi } from '@reduxjs/toolkit/query/react';
import { BaseApiResponse } from '@repo/interfaces';
import baseQueryWithReauth from '../../baseQueryWithReauth';
import { generateQueryStr } from '~/lib/utils/queryGenerator';
import {
  AssetDistribution,
  AssetPerformance,
  AssetTrendsData,
  Compliance,
  DashboardStats,
  FinancialImpact,
  MaintenanceBudget,
  MaintenanceTrendData,
  PendingApproval,
  TicketResolution,
  TicketTrends,
} from '~/lib/interfaces/dashboard/executive.interfaces';

const getHeaders = () => ({
  'Content-Type': 'application/json',
});

export const executiveDashboardApis = createApi({
  reducerPath: 'executiveDashboardApis',
  baseQuery: baseQueryWithReauth,
  tagTypes: [],
  endpoints: (builder) => ({
    getDashboardStat: builder.query<BaseApiResponse<DashboardStats>, void>({
      query: () => ({
        url: `/Invent3Pro/GetCLevelDashboardSummary`,
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    getAssetDistribution: builder.query<
      BaseApiResponse<AssetDistribution[]>,
      void
    >({
      query: () => ({
        url: `/Invent3Pro/GetCLevelAssetDistribution`,
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    getAssetTrends: builder.query<
      BaseApiResponse<AssetTrendsData>,
      { countryId: number; regionId?: number; year?: number; monthNo?: number }
    >({
      query: ({ countryId, ...data }) => ({
        url: generateQueryStr(
          `/Invent3Pro/GetAssetTrendsCLevelDashboardComponent/${countryId}?`,
          data
        ),
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    getMaintenanceTrend: builder.query<
      BaseApiResponse<MaintenanceTrendData>,
      { countryId: number; regionId?: number; year?: number; monthNo?: number }
    >({
      query: ({ countryId, ...data }) => ({
        url: generateQueryStr(
          `/Invent3Pro/GetMaintenanceCLevelDashboardComponent/${countryId}?`,
          data
        ),
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    getTicketResolutionTrends: builder.query<
      BaseApiResponse<TicketTrends[]>,
      { datePeriod: number }
    >({
      query: (data) => ({
        url: generateQueryStr(
          `/Invent3Pro/GetCLevelTicketResolutionTrends?`,
          data
        ),
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    getComplianceAssessment: builder.query<
      BaseApiResponse<Compliance[]>,
      { datePeriod: number }
    >({
      query: (data) => ({
        url: generateQueryStr(
          `/Invent3Pro/GetCLevelComplianceAssesment?`,
          data
        ),
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    getMaintenanceBudgetReport: builder.query<
      BaseApiResponse<MaintenanceBudget[]>,
      { datePeriod: number }
    >({
      query: (data) => ({
        url: generateQueryStr(
          `/Invent3Pro/GetCLevelMaintenanceBudgetReport?`,
          data
        ),
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    getTicketResolutionPerformance: builder.query<
      BaseApiResponse<TicketResolution[]>,
      { datePeriod: number }
    >({
      query: (data) => ({
        url: generateQueryStr(
          `/Invent3Pro/GetCLevelTicketResolutionPerformance?`,
          data
        ),
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    getAssetDepreciationFinancialImpact: builder.query<
      BaseApiResponse<FinancialImpact[]>,
      { datePeriod: number }
    >({
      query: (data) => ({
        url: generateQueryStr(
          `/Invent3Pro/GetCLevelAssetDepreciationFinancialImpact?`,
          data
        ),
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    getPendingApprovalRequest: builder.query<
      BaseApiResponse<PendingApproval[]>,
      { datePeriod: number }
    >({
      query: (data) => ({
        url: generateQueryStr(
          `/Invent3Pro/GetCLevelApprovalFlowPendingRequests?`,
          data
        ),
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    getAssetPerformance: builder.query<
      BaseApiResponse<AssetPerformance[]>,
      { datePeriod: number }
    >({
      query: (data) => ({
        url: generateQueryStr(`/Invent3Pro/GetCLevelAssetPerformance?`, data),
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
  }),
});

export const {
  useGetAssetTrendsQuery,
  useGetDashboardStatQuery,
  useGetAssetDepreciationFinancialImpactQuery,
  useGetAssetDistributionQuery,
  useGetComplianceAssessmentQuery,
  useGetMaintenanceBudgetReportQuery,
  useGetMaintenanceTrendQuery,
  useGetPendingApprovalRequestQuery,
  useGetTicketResolutionPerformanceQuery,
  useGetTicketResolutionTrendsQuery,
  useGetAssetPerformanceQuery,
} = executiveDashboardApis;
