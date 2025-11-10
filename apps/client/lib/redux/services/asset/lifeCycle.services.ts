import { baseApi } from '~/lib/redux/services/baseApi.services';

import { generateQueryStr } from '~/lib/utils/queryGenerator';

import {
  BaseApiResponse,
  ListResponse,
  QueryParams,
  SearchQuery,
} from '@repo/interfaces';
import {
  AssetLifeCycle,
  AssetLifeCycleTransitionRule,
  AssetLifeCycleTransitionRuleList,
  AssetLifeCycleTransitionRulePayload,
  CreateAssetLifeCycleTransitionRulePayload,
  LifeCycleSimulationResponse,
  LifeCycleStages,
  LifeCycleTrend,
  SimulationPayload,
  UpdateAssetLifeCycleTransitionRulePayload,
} from '~/lib/interfaces/asset/lifeCycle.interfaces';
import { Asset } from '~/lib/interfaces/asset/general.interface';

const getHeaders = () => ({
  'Content-Type': 'application/json',
});
export const assetLifeCycleApi = baseApi.injectEndpoints({
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
    runAssetLifecycleSimulationWizard: builder.mutation<
      BaseApiResponse<LifeCycleSimulationResponse>,
      SimulationPayload
    >({
      query: (body) => ({
        url: `/Invent3Pro/RunAssetLifecycleSimulationWizard`,
        method: 'POST',
        headers: getHeaders(),
        body,
      }),
    }),
    getAssetLifeCycleTransitionRules: builder.query<
      BaseApiResponse<ListResponse<AssetLifeCycleTransitionRuleList>>,
      QueryParams
    >({
      query: (data) => ({
        url: generateQueryStr(`/AssetLifeCycleTransitionRules?`, data),
        method: 'GET',
        headers: getHeaders(),
      }),
      providesTags: ['assetLifeCycleTransitionRules'],
    }),
    createAssetLifeCycleTransitionRules: builder.mutation<
      BaseApiResponse<AssetLifeCycleTransitionRule>,
      CreateAssetLifeCycleTransitionRulePayload
    >({
      query: (body) => ({
        url: `/AssetLifeCycleTransitionRules`,
        method: 'POST',
        headers: getHeaders(),
        body,
      }),
      invalidatesTags: ['assetLifeCycleTransitionRules'],
    }),
    updateAssetLifeCycleTransitionRules: builder.mutation<
      BaseApiResponse<AssetLifeCycleTransitionRule>,
      UpdateAssetLifeCycleTransitionRulePayload
    >({
      query: (body) => ({
        url: `/AssetLifeCycleTransitionRules/${body.ruleId}`,
        method: 'PUT',
        headers: getHeaders(),
        body,
      }),
      invalidatesTags: ['assetLifeCycleTransitionRules'],
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
  useRunAssetLifecycleSimulationWizardMutation,
  useCreateAssetLifeCycleTransitionRulesMutation,
  useUpdateAssetLifeCycleTransitionRulesMutation,
  useGetAssetLifeCycleTransitionRulesQuery,
} = assetLifeCycleApi;
