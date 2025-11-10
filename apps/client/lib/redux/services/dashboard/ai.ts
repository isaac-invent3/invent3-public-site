import { baseApi } from '~/lib/redux/services/baseApi.services';

import { BaseApiResponse } from '@repo/interfaces';

import {
  MLInsightSummaryMetrics,
  MLAnomalousAsset,
  MLAnomalyDistribution,
  MLAnomalyTimeline,
  MLInsightTaskVolume,
  MLInsightGetRecommendationsSummary,
  AILearningCurve,
  AssetFailureTrend,
  TopPerformingModel,
  MLInsightSuggestion,
  MLInsightPredictedFailure,
  MLInsightFeed,
  MLInsightRecommendation,
  MLInsightTrend,
  GenerateTicketFromAIInsightPayload,
} from '~/lib/interfaces/dashboard/aiinsights.interfaces';

const getHeaders = () => ({
  'Content-Type': 'application/json',
});

export const aiApis = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMLInsightSummaryMetrics: builder.query<
      BaseApiResponse<MLInsightSummaryMetrics>,
      void
    >({
      query: () => ({
        url: `/Invent3Pro/MLInsightGetSummaryMetrics`,
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    getTopMLAnomalousAssets: builder.query<
      BaseApiResponse<MLAnomalousAsset[]>,
      void
    >({
      query: () => ({
        url: `/Invent3Pro/MLInsightGetTopAnomalousAssets`,
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    getMLAnomalyDistribution: builder.query<
      BaseApiResponse<MLAnomalyDistribution>,
      void
    >({
      query: () => ({
        url: `/Invent3Pro/MLInsightGetAnomalyDistribution`,
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    getRecentMLAnomalyTimeline: builder.query<
      BaseApiResponse<MLAnomalyTimeline[]>,
      void
    >({
      query: () => ({
        url: `/Invent3Pro/MLInsightGetRecentAnomalyTimeline`,
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    getMLInsightTaskVolume: builder.query<
      BaseApiResponse<MLInsightTaskVolume[]>,
      void
    >({
      query: () => ({
        url: `/Invent3Pro/MLInsightTaskVolume`,
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    getMLRecommendationsSummary: builder.query<
      BaseApiResponse<MLInsightGetRecommendationsSummary>,
      void
    >({
      query: () => ({
        url: `/Invent3Pro/MLInsightGetRecommendationsSummary`,
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    getAiLearningCurve: builder.query<BaseApiResponse<AILearningCurve[]>, void>(
      {
        query: () => ({
          url: `/Invent3Pro/ai-learning-curve`,
          method: 'GET',
          headers: getHeaders(),
        }),
      }
    ),
    getAssetFailureTrend: builder.query<
      BaseApiResponse<AssetFailureTrend[]>,
      void
    >({
      query: () => ({
        url: `/Invent3Pro/AssetFailureTrend`,
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    getTopPerformingModels: builder.query<
      BaseApiResponse<TopPerformingModel[]>,
      void
    >({
      query: () => ({
        url: `/Invent3Pro/TopPerformingModels`,
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    getMLInsightSuggestions: builder.query<
      BaseApiResponse<MLInsightSuggestion[]>,
      void
    >({
      query: () => ({
        url: `/Invent3Pro/MLInsightSuggestions`,
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    applyAnMLInsight: builder.mutation<void, { id: number }>({
      query: ({ id }) => ({
        url: `/Invent3Pro/MLInsightApply/${id}`,
        method: 'POST',
        headers: getHeaders(),
      }),
      invalidatesTags: ['AllAIInsightFeeds'],
    }),
    applyAllMLInsight: builder.mutation<void, void>({
      query: () => ({
        url: `/Invent3Pro/MLInsightApplyAll`,
        method: 'POST',
        headers: getHeaders(),
      }),
    }),
    getMLInsightPredictedFailures: builder.query<
      BaseApiResponse<MLInsightPredictedFailure[]>,
      void
    >({
      query: () => ({
        url: `/Invent3Pro/MLInsightPredictedFailures`,
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    getAIInsightFeed: builder.query<BaseApiResponse<MLInsightFeed[]>, void>({
      query: () => ({
        url: `/Invent3Pro/MLInsightGetAIInsightFeed`,
        method: 'GET',
        headers: getHeaders(),
      }),
      providesTags: ['AllAIInsightFeeds'],
    }),
    getMLInsightRecommendation: builder.query<
      BaseApiResponse<MLInsightRecommendation[]>,
      void
    >({
      query: () => ({
        url: `/Invent3Pro/MLInsightGetRecommendations`,
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    getMLInsightGetTrends: builder.query<
      BaseApiResponse<MLInsightTrend[]>,
      void
    >({
      query: () => ({
        url: `/Invent3Pro/MLInsightGetTrends`,
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    GenerateTicketFromAIInsightPayload: builder.mutation<
      void,
      GenerateTicketFromAIInsightPayload
    >({
      query: () => ({
        url: `/Invent3Pro/GenerateTicketFromAIInsight`,
        method: 'POST',
        headers: getHeaders(),
      }),
    }),
  }),
});

export const {
  useGetMLInsightSummaryMetricsQuery,
  useGetTopMLAnomalousAssetsQuery,
  useGetMLAnomalyDistributionQuery,
  useGetRecentMLAnomalyTimelineQuery,
  useApplyAllMLInsightMutation,
  useApplyAnMLInsightMutation,
  useGenerateTicketFromAIInsightPayloadMutation,
  useGetAIInsightFeedQuery,
  useGetAiLearningCurveQuery,
  useGetAssetFailureTrendQuery,
  useGetMLInsightGetTrendsQuery,
  useGetMLInsightPredictedFailuresQuery,
  useGetMLInsightRecommendationQuery,
  useGetMLInsightSuggestionsQuery,
  useGetMLInsightTaskVolumeQuery,
  useGetMLRecommendationsSummaryQuery,
  useGetTopPerformingModelsQuery,
} = aiApis;
