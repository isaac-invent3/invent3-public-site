import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryWithReauth from '../baseQueryWithReauth';
import { BaseApiResponse, ListResponse, SearchQuery } from '@repo/interfaces';
import {
  Prediction,
  PredictiveSlaDashboardSummary,
  PredictiveSlaTicketBreakdown,
  SLATrends,
} from '~/lib/interfaces/prediction.interfaces';
import { QueryParams } from '@prismicio/client';
import { generateQueryStr } from '~/lib/utils/queryGenerator';

const getHeaders = () => ({
  'Content-Type': 'application/json',
});

export const predictionApi = createApi({
  reducerPath: 'predictionApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: [],
  endpoints: (builder) => ({
    getAlertPredictionsByAlertId: builder.query<
      BaseApiResponse<Prediction>,
      { alertId: number }
    >({
      query: ({ alertId }) => ({
        url: `/Predictions/GetAlertPredictions/${alertId}`,
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    getRecentPredictionAlert: builder.query<
      BaseApiResponse<ListResponse<Prediction>>,
      QueryParams
    >({
      query: (data) => ({
        url: generateQueryStr(`/Predictions/GetRecentPredictionAlerts?`, data),
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    generateWorkOrderFromPrediction: builder.mutation<
      BaseApiResponse<Prediction>,
      { alertId: number }
    >({
      query: ({ alertId }) => ({
        url: `/Predictions/GenerateWorkOrderFromPrediction/${alertId}`,
        method: 'POST',
        headers: getHeaders(),
      }),
    }),
    acknowledgePredictions: builder.mutation<
      BaseApiResponse<Prediction>,
      { alertId: number; acknowlegedBy: string }
    >({
      query: ({ alertId, acknowlegedBy }) => ({
        url: generateQueryStr(
          `/Predictions/AcknowledgePrediction/${alertId}?`,
          { acknowlegedBy }
        ),
        method: 'PUT',
        headers: getHeaders(),
      }),
    }),
    getPredictiveSlaDashboardSummary: builder.query<
      BaseApiResponse<PredictiveSlaDashboardSummary>,
      { datePeriod?: number }
    >({
      query: (data) => ({
        url: generateQueryStr(
          `/Invent3Pro/PredictiveSlaDashboardSummary?`,
          data
        ),
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    getPredictiveSlaDashboardTrends: builder.query<
      BaseApiResponse<SLATrends[]>,
      { datePeriod?: number }
    >({
      query: (data) => ({
        url: generateQueryStr(
          `/Invent3Pro/PredictiveSlaDashboardTrends?`,
          data
        ),
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    getPredictiveSlaDashboardInsights: builder.query<
      BaseApiResponse<string[]>,
      { datePeriod?: number }
    >({
      query: (data) => ({
        url: generateQueryStr(
          `/Invent3Pro/PredictiveSlaDashboardInsights?`,
          data
        ),
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    getPredictiveSlaTicketBreakdown: builder.mutation<
      BaseApiResponse<ListResponse<PredictiveSlaTicketBreakdown>>,
      SearchQuery & {
        slaStatus?: number;
        assetCategory?: number;
        datePeriod?: number;
      }
    >({
      query: ({ slaStatus, assetCategory, datePeriod, ...data }) => ({
        url: generateQueryStr(`/Invent3Pro/PredictiveSlaTicketBreakdown?`, {
          slaStatus,
          assetCategory,
          datePeriod,
        }),
        method: 'POST',
        headers: getHeaders(),
        body: data,
      }),
    }),
  }),
});

export const {
  useGetAlertPredictionsByAlertIdQuery,
  useAcknowledgePredictionsMutation,
  useGenerateWorkOrderFromPredictionMutation,
  useGetRecentPredictionAlertQuery,
  useGetPredictiveSlaDashboardInsightsQuery,
  useGetPredictiveSlaDashboardSummaryQuery,
  useGetPredictiveSlaDashboardTrendsQuery,
  useGetPredictiveSlaTicketBreakdownMutation,
} = predictionApi;
