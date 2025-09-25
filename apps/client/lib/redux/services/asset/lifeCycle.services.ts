import { createApi } from '@reduxjs/toolkit/query/react';
import { generateQueryStr } from '~/lib/utils/queryGenerator';
import baseQueryWithReauth from '../../baseQueryWithReauth';
import { BaseApiResponse, ListResponse, QueryParams } from '@repo/interfaces';
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
      BaseApiResponse<ListResponse<AssetLifeCycle>>,
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
      BaseApiResponse<ListResponse<AssetLifeCycle>>,
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
      BaseApiResponse<ListResponse<LifeCycleTrend>>,
      { lifeCycleId: number; year?: number }
    >({
      query: (data) => ({
        url: generateQueryStr(`/Assets/GetLifeCycleStageTrend?`, data),
        method: 'GET',
        headers: getHeaders(),
      }),
      providesTags: [],
    }),
    getAssetAtRisk: builder.mutation<
      BaseApiResponse<ListResponse<Asset>>,
      QueryParams
    >({
      query: (body) => ({
        url: `/Assets/AssetAtRisk`,
        method: 'POST',
        headers: getHeaders(),
        body,
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
  }),
});

export const {
  useGetLifeCycleStageSummaryQuery,
  useGetLifeCycleTrendByLifeCyleIdQuery,
  useGetAssetAtRiskMutation,
  useGetLifeCycleStageChartQuery,
  useGetLifecyleStagesQuery,
} = assetLifeCycleApi;
