import { createApi } from '@reduxjs/toolkit/query/react';
import { generateQueryStr } from '~/lib/utils/queryGenerator';
import baseQueryWithReauth from '../../baseQueryWithReauth';
import {
  BaseApiResponse,
  ListResponse,
  QueryParams,
  SearchQuery,
} from '@repo/interfaces';
import { AssetType } from '~/lib/interfaces/asset/type.interface';

const getHeaders = () => ({
  'Content-Type': 'application/json',
});
export const assetTypeApi = createApi({
  reducerPath: 'assetTypeApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['allAssetTypes'],
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
      {
        typeName: string;
        createdBy: string;
      }
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
