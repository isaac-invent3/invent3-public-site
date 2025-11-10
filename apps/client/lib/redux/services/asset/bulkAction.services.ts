import { baseApi } from '~/lib/redux/services/baseApi.services';

import { BaseApiResponse, ListResponse, QueryParams } from '@repo/interfaces';
import {
  AssetBulkAction,
  AssetBulkActionMap,
  CreateAssetBulkActionPayload,
} from '~/lib/interfaces/asset/bulkAction.interfaces';
import { generateQueryStr } from '~/lib/utils/queryGenerator';

const getHeaders = () => ({
  'Content-Type': 'application/json',
});
export const assetBulkActionApi = baseApi.injectEndpoints({
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
    createBulkAssetAction: builder.mutation<void, CreateAssetBulkActionPayload>(
      {
        query: (body) => ({
          url: `/Invent3Pro/CreateBulkAssetAction`,
          method: 'POST',
          headers: getHeaders(),
          body,
        }),
      }
    ),
  }),
});

export const {
  useGetABulkAssetActionQuery,
  useGetAssetBulkActionMapsQuery,
  useCreateBulkAssetActionMutation,
} = assetBulkActionApi;
