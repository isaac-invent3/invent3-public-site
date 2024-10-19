import { createApi } from '@reduxjs/toolkit/query/react';
import { generateQueryStr } from '~/lib/utils/queryGenerator';
import baseQueryWithReauth from '../../baseQueryWithReauth';

const getHeaders = () => ({
  'Content-Type': 'application/json',
});
export const assetTypeApi = createApi({
  reducerPath: 'assetTypeApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['allAssetTypes'],
  endpoints: (builder) => ({
    getAllAssetTypes: builder.query({
      query: (data: any) => ({
        url: generateQueryStr(`/AssetTypes?`, data),
        method: 'GET',
        headers: getHeaders(),
      }),
      providesTags: ['allAssetTypes'],
    }),
    getAssetTypeById: builder.query({
      query: (id: any) => ({
        url: `/AssetTypes/${id}`,
        method: 'GET',
        headers: getHeaders(),
      }),
    }),

    searchAssetTypes: builder.mutation({
      query: (body: any) => ({
        url: `/AssetStatus/Search`,
        method: 'POST',
        headers: getHeaders(),
        body,
      }),
    }),
  }),
});

export const {
  useGetAllAssetTypesQuery,
  useSearchAssetTypesMutation,
  useGetAssetTypeByIdQuery,
} = assetTypeApi;
