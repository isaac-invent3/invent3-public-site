import { createApi } from '@reduxjs/toolkit/query/react';
import {
  BaseApiResponse,
  ListResponse,
  QueryParams,
  SearchQuery,
} from '@repo/interfaces';
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
  TicketTrends,
} from '~/lib/interfaces/dashboard/executive.interfaces';
import { ApprovalWorkflowRequest } from '~/lib/interfaces/approvalWorkflow.interfaces';
import { AssetComplaince } from '~/lib/interfaces/asset/compliance.interfaces';
import { Ticket } from '~/lib/interfaces/ticket.interfaces';

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
    searchComplianceAssessment: builder.mutation<
      BaseApiResponse<ListResponse<AssetComplaince>>,
      SearchQuery
    >({
      query: (body) => ({
        url: `/Invent3Pro/GetCLevelComplianceAssesment`,
        method: 'POST',
        headers: getHeaders(),
        body,
      }),
    }),

    searchTicketResolutionPerformance: builder.mutation<
      BaseApiResponse<ListResponse<Ticket>>,
      SearchQuery
    >({
      query: (body) => ({
        url: `/Invent3Pro/GetCLevelTicketResolutionPerformance`,
        method: 'POST',
        headers: getHeaders(),
        body,
      }),
    }),
    searchAssetPerformance: builder.mutation<
      BaseApiResponse<ListResponse<AssetPerformance>>,
      SearchQuery
    >({
      query: (body) => ({
        url: `/Invent3Pro/GetCLevelAssetPerformance`,
        method: 'POST',
        headers: getHeaders(),
        body,
      }),
    }),
    searchAssetDepreciationFinancialImpact: builder.mutation<
      BaseApiResponse<ListResponse<FinancialImpact>>,
      SearchQuery
    >({
      query: (body) => ({
        url: `/Invent3Pro/GetCLevelAssetDepreciationFinancialImpact`,
        method: 'POST',
        headers: getHeaders(),
        body,
      }),
    }),
    searchPendingApprovalRequest: builder.mutation<
      BaseApiResponse<ListResponse<ApprovalWorkflowRequest>>,
      SearchQuery
    >({
      query: (body) => ({
        url: `/Invent3Pro/GetCLevelApprovalFlowPendingRequests`,
        method: 'POST',
        headers: getHeaders(),
        body,
      }),
    }),
  }),
});

export const {
  useGetAssetTrendsQuery,
  useGetDashboardStatQuery,
  useGetAssetDistributionQuery,
  useGetMaintenanceBudgetReportQuery,
  useGetMaintenanceTrendQuery,
  useGetTicketResolutionTrendsQuery,
  useSearchAssetPerformanceMutation,
  useSearchAssetDepreciationFinancialImpactMutation,
  useSearchComplianceAssessmentMutation,
  useSearchPendingApprovalRequestMutation,
  useSearchTicketResolutionPerformanceMutation,
} = executiveDashboardApis;
