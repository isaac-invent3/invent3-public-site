import { createApi } from '@reduxjs/toolkit/query/react';
import { generateQueryStr } from '~/lib/utils/queryGenerator';
import baseQueryWithReauth from '../../baseQueryWithReauth';

const getHeaders = () => ({
  'Content-Type': 'application/json',
});
export const assetGroupContextApi = createApi({
  reducerPath: 'assetGroupContextApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['allAssetGroupContext'],
  endpoints: (builder) => ({
    getAllAssetGroupContextsByGroupPlanId: builder.query({
      query: (data: any) => ({
        url: generateQueryStr(`/AssetGroupContext?`, data),
        method: 'GET',
        headers: getHeaders(),
      }),
      providesTags: ['allAssetGroupContext'],
    }),
    searchAssetGroupContexts: builder.mutation({
      query: (body: any) => ({
        url: `/AssetGroupContexts/Search`,
        method: 'POST',
        headers: getHeaders(),
        body,
      }),
    }),
  }),
});

export const {
  useGetAllAssetGroupContextsByGroupPlanIdQuery,
  useSearchAssetGroupContextsMutation,
} = assetGroupContextApi;
