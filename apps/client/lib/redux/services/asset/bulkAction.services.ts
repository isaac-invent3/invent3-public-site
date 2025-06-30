import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryWithReauth from '../../baseQueryWithReauth';
import { BaseApiResponse, ListResponse, QueryParams } from '@repo/interfaces';
import {
  AssetBulkAction,
  AssetBulkActionMap,
} from '~/lib/interfaces/asset/bulkAction.interfaces';
import { generateQueryStr } from '~/lib/utils/queryGenerator';

const getHeaders = () => ({
  'Content-Type': 'application/json',
});
export const assetBulkActionApi = createApi({
  reducerPath: 'assetBulkActionApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: [],
  endpoints: (builder) => ({
    getABulkAssetAction: builder.query<
      BaseApiResponse<AssetBulkAction>,
      { id: number }
    >({
      query: ({ id }) => ({
        url: `/AssetBulkActions/GetAssetBulkActionsInfoHeader/${id}?`,
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    getAssetBulkActionMaps: builder.query<
      BaseApiResponse<ListResponse<AssetBulkActionMap>>,
      QueryParams & { bulkActionId: number }
    >({
      query: (data) => ({
        url: generateQueryStr(`/AssetBulkActionsMaps?`, data),
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
  }),
});

export const { useGetABulkAssetActionQuery, useGetAssetBulkActionMapsQuery } =
  assetBulkActionApi;
