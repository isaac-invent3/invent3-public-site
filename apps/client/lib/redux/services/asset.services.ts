import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { generateQueryStr } from '~/lib/utils/queryGenerator';

const getHeaders = () => ({
  'Content-Type': 'application/json',
});

export const assetApi = createApi({
  reducerPath: 'assetApi',
  baseQuery: fetchBaseQuery({ baseUrl: '' }),
  tagTypes: ['allAsset', 'singleAsset'],
  endpoints: (builder) => ({
    getallAsset: builder.query({
      query: (data: any) => ({
        url: generateQueryStr(`/assets`, data),
        method: 'GET',
        headers: getHeaders(),
      }),
      providesTags: ['allAsset'],
    }),
    getAssetById: builder.query({
      query: (id: any) => ({
        url: `/assets/${id}`,
        method: 'GET',
        headers: getHeaders(),
      }),
      providesTags: ['singleAsset'],
    }),
    createAsset: builder.mutation({
      query: (body: any) => ({
        url: `/assets/create`,
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
  useGetAssetByIdQuery,
  useGetallAssetQuery,
} = assetApi;
