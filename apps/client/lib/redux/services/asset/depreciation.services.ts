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
  AssetDepreciation,
  AssetDepreciationHistory,
  DepreciationMethod,
} from '~/lib/interfaces/asset/depreciation.interfaces';

const getHeaders = () => ({
  'Content-Type': 'application/json',
});
export const depreciationApi = createApi({
  reducerPath: 'depreciationApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['allDepreciation'],
  endpoints: (builder) => ({
    getAllAssetDepreciation: builder.query<
      BaseApiResponse<ListResponse<AssetDepreciation>>,
      QueryParams
    >({
      query: (data) => ({
        url: generateQueryStr(`/AssetDepreciations?`, data),
        method: 'GET',
        headers: getHeaders(),
      }),
      providesTags: ['allDepreciation'],
    }),
    searchDepreciation: builder.mutation<
      BaseApiResponse<ListResponse<AssetDepreciation>>,
      SearchQuery
    >({
      query: (body) => ({
        url: `/AssetDepreciations/Search`,
        method: 'POST',
        headers: getHeaders(),
        body,
      }),
    }),
    getSingleAssetDepreciationInfoByAssetId: builder.query<
      BaseApiResponse<AssetDepreciation>,
      { assetId: number }
    >({
      query: ({ assetId }) => ({
        url: `AssetDepreciations/GetSingleAssetDepreciationInfo/${assetId}`,
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    getAllAssetDepreciationHistoryByDepreciationId: builder.query<
      BaseApiResponse<ListResponse<AssetDepreciationHistory>>,
      { depreciationId: number } & QueryParams
    >({
      query: ({ depreciationId, ...data }) => ({
        url: generateQueryStr(
          `/AssetDepreciationHistory/GetDepreciationHistory/${depreciationId}?`,
          data
        ),
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    getAllDepreciationMethod: builder.query<
      BaseApiResponse<ListResponse<DepreciationMethod>>,
      QueryParams
    >({
      query: (data) => ({
        url: generateQueryStr(`/DepreciationMethods?`, data),
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    searchDepreciationMethod: builder.mutation<
      BaseApiResponse<ListResponse<DepreciationMethod>>,
      SearchQuery
    >({
      query: (body) => ({
        url: `/DepreciationMethods/Search`,
        method: 'POST',
        headers: getHeaders(),
        body,
      }),
    }),
  }),
});

export const {
  useGetAllAssetDepreciationQuery,
  useSearchDepreciationMutation,
  useGetSingleAssetDepreciationInfoByAssetIdQuery,
  useGetAllAssetDepreciationHistoryByDepreciationIdQuery,
  useGetAllDepreciationMethodQuery,
  useSearchDepreciationMethodMutation,
} = depreciationApi;
