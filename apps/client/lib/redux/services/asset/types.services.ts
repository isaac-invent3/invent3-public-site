import { baseApi } from '~/lib/redux/services/baseApi.services';

import { generateQueryStr } from '~/lib/utils/queryGenerator';

import {
  BaseApiResponse,
  ListResponse,
  QueryParams,
  SearchQuery,
} from '@repo/interfaces';
import {
  AssetType,
  AssetTypePayload,
} from '~/lib/interfaces/asset/type.interface';

const getHeaders = () => ({
  'Content-Type': 'application/json',
});
export const assetTypeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllAssetTypes: builder.query<
      BaseApiResponse<ListResponse<AssetType>>,
      QueryParams
    >({
      query: (data) => ({
        url: generateQueryStr(`/AssetTypes?`, data),
        method: 'GET',
        headers: getHeaders(),
      }),
      providesTags: ['allAssetTypes'],
    }),
    getAssetTypeById: builder.query<
      BaseApiResponse<AssetType>,
      { id: number | undefined }
    >({
      query: ({ id }) => ({
        url: `/AssetTypes/${id}`,
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    searchAssetTypes: builder.mutation<
      BaseApiResponse<ListResponse<AssetType>>,
      SearchQuery
    >({
      query: (body) => ({
        url: `/AssetStatus/Search`,
        method: 'POST',
        headers: getHeaders(),
        body,
      }),
    }),
    createAssetType: builder.mutation<
      BaseApiResponse<AssetType>,
      AssetTypePayload
    >({
      query: (body) => ({
        url: `/AssetTypes`,
        method: 'POST',
        headers: getHeaders(),
        body,
      }),
      invalidatesTags: ['allAssetTypes'],
    }),
  }),
});

export const {
  useGetAllAssetTypesQuery,
  useSearchAssetTypesMutation,
  useGetAssetTypeByIdQuery,
  useCreateAssetTypeMutation,
} = assetTypeApi;
