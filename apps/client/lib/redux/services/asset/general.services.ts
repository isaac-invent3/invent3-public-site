import { createApi } from '@reduxjs/toolkit/query/react';
import { generateQueryStr } from '~/lib/utils/queryGenerator';
import baseQueryWithReauth from '../../baseQueryWithReauth';

const getHeaders = () => ({
  'Content-Type': 'application/json',
});
export const assetApi = createApi({
  reducerPath: 'assetApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['allAsset', 'singleAsset', 'allAssetCategory'],
  endpoints: (builder) => ({
    getallAsset: builder.query({
      query: (data: any) => ({
        url: generateQueryStr(`/Assets?`, data),
        method: 'GET',
        headers: getHeaders(),
      }),
      providesTags: ['allAsset'],
    }),
    getAssetById: builder.query({
      query: (id: any) => ({
        url: `/Assets/${id}`,
        method: 'GET',
        headers: getHeaders(),
      }),
      providesTags: ['singleAsset'],
    }),
    getAcquisitionInfoByAssetId: builder.query({
      query: ({ id }) => ({
        url: `/Assets/GetAcquisitionInfo/${id}`,
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    GetAssetComponentInfoByAssetGuid: builder.query({
      query: ({ id }) => ({
        url: `/GetAssetComponentInfo/${id}`,
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    createAsset: builder.mutation({
      query: (body: any) => ({
        url: `/Invent3Pro/Assets/Create`,
        method: 'POST',
        headers: getHeaders(),
        body,
      }),
      invalidatesTags: ['allAsset'],
    }),
    updateAsset: builder.mutation({
      query: (body: any) => ({
        url: `/Invent3Pro/Assets/Update`,
        method: 'POST',
        headers: getHeaders(),
        body,
      }),
      invalidatesTags: ['allAsset'],
    }),
  }),
});

export const {
  useCreateAssetMutation,
  useUpdateAssetMutation,
  useGetAssetByIdQuery,
  useGetallAssetQuery,
  useGetAcquisitionInfoByAssetIdQuery,
  useGetAssetComponentInfoByAssetGuidQuery,
} = assetApi;
