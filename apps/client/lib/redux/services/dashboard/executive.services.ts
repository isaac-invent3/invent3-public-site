import { createApi } from '@reduxjs/toolkit/query/react';
import { BaseApiResponse, ListResponse } from '@repo/interfaces';
import baseQueryWithReauth from '../../baseQueryWithReauth';
import { generateQueryStr } from '~/lib/utils/queryGenerator';
import {
  AssetDistribution,
  AssetPerformance,
  AssetTrendsData,
  DashboardStats,
  FinancialImpact,
  MaintenanceBudget,
  MaintenanceTrendData,
  TicketResolution,
  TicketTrends,
} from '~/lib/interfaces/dashboard/executive.interfaces';
import { ApprovalWorkflowRequest } from '~/lib/interfaces/approvalWorkflow.interfaces';
import { AssetComplaince } from '~/lib/interfaces/asset/compliance.interfaces';

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
      BaseApiResponse<MaintenanceTrendData[]>,
      { year?: number }
    >({
      query: ({ ...data }) => ({
        url: generateQueryStr(
          `/Invent3Pro/GetMaintenanceCLevelDashboardComponent?`,
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
      BaseApiResponse<ListResponse<AssetComplaince>>,
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
      BaseApiResponse<ListResponse<TicketResolution>>,
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
      BaseApiResponse<ListResponse<FinancialImpact>>,
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
      BaseApiResponse<ListResponse<ApprovalWorkflowRequest>>,
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
      BaseApiResponse<ListResponse<AssetPerformance>>,
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
