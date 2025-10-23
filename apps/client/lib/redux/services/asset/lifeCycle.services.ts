import { createApi } from '@reduxjs/toolkit/query/react';
import { generateQueryStr } from '~/lib/utils/queryGenerator';
import baseQueryWithReauth from '../../baseQueryWithReauth';
import {
  BaseApiResponse,
  ListResponse,
  QueryParams,
  SearchQuery,
} from '@repo/interfaces';
import {
  AssetLifeCycle,
  LifeCycleStages,
  LifeCycleTrend,
} from '~/lib/interfaces/asset/lifeCycle.interfaces';
import { Asset } from '~/lib/interfaces/asset/general.interface';

const getHeaders = () => ({
  'Content-Type': 'application/json',
});
export const assetLifeCycleApi = createApi({
  reducerPath: 'assetLifeCycleApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: [],
  endpoints: (builder) => ({
    getLifeCycleStageSummary: builder.query<
      BaseApiResponse<AssetLifeCycle[]>,
      void
    >({
      query: (data) => ({
        url: `/Assets/GetLifeCycleStageSummary?`,
        method: 'GET',
        headers: getHeaders(),
      }),
      providesTags: [],
    }),
    getLifeCycleStageChart: builder.query<
      BaseApiResponse<AssetLifeCycle[]>,
      { year?: number; month?: number }
    >({
      query: (data) => ({
        url: generateQueryStr(`/Assets/GetLifeCycleStageChart?`, data),
        method: 'GET',
        headers: getHeaders(),
      }),
      providesTags: [],
    }),
    getLifeCycleTrendByLifeCyleId: builder.query<
      BaseApiResponse<LifeCycleTrend[]>,
      { lifeCycleId: number; year?: number }
    >({
      query: (data) => ({
        url: generateQueryStr(`/Assets/GetLifeCycleStageTrend?`, data),
        method: 'GET',
        headers: getHeaders(),
      }),
      providesTags: [],
    }),
    getAssetAtRisk: builder.query<
      BaseApiResponse<ListResponse<Asset>>,
      QueryParams
    >({
      query: (body) => ({
        url: generateQueryStr(`/Assets/AssetAtRisk?`, body),
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    getAssetLifeCycleFinancialComparisons: builder.query<
      BaseApiResponse<ListResponse<Asset>>,
      QueryParams
    >({
      query: (data) => ({
        url: generateQueryStr(
          `/Assets/GetAssetLifeCycleFinancialComparisons?`,
          data
        ),
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    getLifecyleStages: builder.query<
      BaseApiResponse<ListResponse<LifeCycleStages>>,
      QueryParams
    >({
      query: (data) => ({
        url: generateQueryStr(`/AssetLifeCycleStages?`, data),
        method: 'GET',
        headers: getHeaders(),
      }),
      providesTags: [],
    }),
    searchLifecyleStages: builder.mutation<
      BaseApiResponse<ListResponse<LifeCycleStages>>,
      SearchQuery
    >({
      query: (body) => ({
        url: `/AssetLifeCycleStages/Search`,
        method: 'POST',
        headers: getHeaders(),
        body,
      }),
    }),
  }),
});

export const {
  useGetLifeCycleStageSummaryQuery,
  useGetLifeCycleTrendByLifeCyleIdQuery,
  useGetAssetAtRiskQuery,
  useGetLifeCycleStageChartQuery,
  useGetLifecyleStagesQuery,
  useSearchLifecyleStagesMutation,
  useGetAssetLifeCycleFinancialComparisonsQuery,
} = assetLifeCycleApi;
