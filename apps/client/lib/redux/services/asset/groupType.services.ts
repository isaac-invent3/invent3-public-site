import { createApi } from '@reduxjs/toolkit/query/react';
import { generateQueryStr } from '~/lib/utils/queryGenerator';
import baseQueryWithReauth from '../../baseQueryWithReauth';

const getHeaders = () => ({
  'Content-Type': 'application/json',
});
export const assetGroupTypeApi = createApi({
  reducerPath: 'assetGroupTypeApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['allAssetGroupTypes', 'allAssetGroupContextRecords'],
  endpoints: (builder) => ({
    getAllAssetGroupTypes: builder.query({
      query: (data: any) => ({
        url: generateQueryStr(`/AssetGroupTypes?`, data),
        method: 'GET',
        headers: getHeaders(),
      }),
      providesTags: ['allAssetGroupTypes'],
    }),
    getAllGroupContextRecordsByTypeId: builder.query({
      query: ({ id, ...data }) => ({
        url: generateQueryStr(
          `/AssetGroupTypes/GetGroupTypeContextRecords/${id}?`,
          data
        ),
        method: 'GET',
        headers: getHeaders(),
      }),
      providesTags: ['allAssetGroupContextRecords'],
    }),
    searchAssetGroupTypes: builder.mutation({
      query: (body: any) => ({
        url: `/AssetGroupTypes/Search`,
        method: 'POST',
        headers: getHeaders(),
        body,
      }),
    }),
  }),
});

export const {
  useGetAllAssetGroupTypesQuery,
  useGetAllGroupContextRecordsByTypeIdQuery,
  useSearchAssetGroupTypesMutation,
} = assetGroupTypeApi;
