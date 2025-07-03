import { createApi } from '@reduxjs/toolkit/query/react';
import { generateQueryStr } from '~/lib/utils/queryGenerator';
import baseQueryWithReauth from '../../baseQueryWithReauth';
import { BaseApiResponse, ListResponse } from '@repo/interfaces';
import {
  AssetStatsCummalative,
  AssetStatsLGA,
  AssetStatsState,
} from '~/lib/interfaces/asset/stats.interfaces';

const getHeaders = () => ({
  'Content-Type': 'application/json',
});
export const assetStatsApi = createApi({
  reducerPath: 'assetStatsApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['allStateAssetCount', 'allLGAAssetCount'],
  endpoints: (builder) => ({
    getStateAssetCountByCountryId: builder.query<
      BaseApiResponse<ListResponse<AssetStatsState>>,
      { id: number | undefined; pageNumber?: number; pageSize?: number }
    >({
      query: ({ id, ...data }) => ({
        url: generateQueryStr(
          `/Locations/GetStateAssetStatusCountByCountryId/${id}?`,
          data
        ),
        method: 'GET',
        headers: getHeaders(),
      }),
      providesTags: ['allStateAssetCount'],
    }),
    getLGAAssetCountByStateId: builder.query<
      BaseApiResponse<ListResponse<AssetStatsLGA>>,
      { id: number | undefined; pageNumber?: number; pageSize?: number }
    >({
      query: ({ id, ...data }) => ({
        url: generateQueryStr(
          `/Locations/GetLGAAssetStatusCountByStateId/${id}?`,
          data
        ),
        method: 'GET',
        headers: getHeaders(),
      }),
      providesTags: ['allLGAAssetCount'],
    }),
    getCumulativeAssetStatusCountByCountryId: builder.query<
      BaseApiResponse<AssetStatsCummalative>,
      { id: number | undefined }
    >({
      query: ({ id }) => ({
        url: `/Locations/GetCumulativeAssetStatusCountsByCountryId/${id}`,
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    getCumulativeAssetStatusCountByStateId: builder.query<
      BaseApiResponse<AssetStatsCummalative>,
      { id: number | undefined }
    >({
      query: ({ id }) => ({
        url: `/Locations/GetCumulativeAssetStatusCountsByStateId/${id}`,
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
  }),
});

export const {
  useGetLGAAssetCountByStateIdQuery,
  useGetStateAssetCountByCountryIdQuery,
  useGetCumulativeAssetStatusCountByCountryIdQuery,
  useGetCumulativeAssetStatusCountByStateIdQuery,
} = assetStatsApi;
