import { createApi } from '@reduxjs/toolkit/query/react';
import { BaseApiResponse, ListResponse, QueryParams } from '@repo/interfaces';
import baseQueryWithReauth from '../baseQueryWithReauth';
import { AssetForecast } from '~/lib/interfaces/forecast.interfaces';
import { FORECAST_TYPE_ENUM } from '~/lib/utils/constants';
import { generateQueryStr } from '~/lib/utils/queryGenerator';
import {
  Asset,
  AssetComparison,
  FailureProbability,
} from '~/lib/interfaces/asset/general.interface';

const getHeaders = () => ({
  'Content-Type': 'application/json',
});
export const forecastApi = createApi({
  reducerPath: 'forecastApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: [],
  endpoints: (builder) => ({
    getAssetForecast: builder.query<
      BaseApiResponse<AssetForecast>,
      {
        assetId: number;
        forecastType: (typeof FORECAST_TYPE_ENUM)[keyof typeof FORECAST_TYPE_ENUM];
      }
    >({
      query: ({ assetId, forecastType }) => ({
        url: generateQueryStr(`/Forecasts/GetAssetForecasts/${assetId}?`, {
          forecastType,
        }),
        method: 'GET',
        headers: getHeaders(),
      }),
      providesTags: [],
    }),
    getFailureSparePartsSuggestions: builder.query<
      BaseApiResponse<ListResponse<Asset>>,
      QueryParams & {
        assetId: number;
      }
    >({
      query: ({ assetId, ...data }) => ({
        url: generateQueryStr(
          `/Assets/GetFailureSparePartsSuggestions/${assetId}?`,
          data
        ),
        method: 'GET',
        headers: getHeaders(),
      }),
      providesTags: [],
    }),
    compareRiskTrendOverTime: builder.mutation<
      BaseApiResponse<AssetComparison[]>,
      {
        assetIds: number[];
        fieldToCompare: number;
        datePeriodType: number;
      }
    >({
      query: (body) => ({
        url: `/Invent3Pro/CompareRiskTrendOverTime`,
        method: 'POST',
        headers: getHeaders(),
        body,
      }),
      invalidatesTags: [],
    }),
    getAssetFailureInsights: builder.query<
      BaseApiResponse<{
        insight: string;
        suggestion: string;
      }>,
      {
        assetId: number;
      }
    >({
      query: ({ assetId }) => ({
        url: `/Assets/GetAssetFailureInsights/${assetId}?`,
        method: 'GET',
        headers: getHeaders(),
      }),
      providesTags: [],
    }),
    getAssetFailureProbabilitySummary: builder.query<
      BaseApiResponse<FailureProbability>,
      {
        assetId: number;
      }
    >({
      query: ({ assetId }) => ({
        url: `/Assets/GetAssetFailureProbabilitySummary/${assetId}?`,
        method: 'GET',
        headers: getHeaders(),
      }),
      providesTags: [],
    }),
  }),
});

export const {
  useGetAssetForecastQuery,
  useGetFailureSparePartsSuggestionsQuery,
  useCompareRiskTrendOverTimeMutation,
  useGetAssetFailureInsightsQuery,
  useGetAssetFailureProbabilitySummaryQuery,
} = forecastApi;
