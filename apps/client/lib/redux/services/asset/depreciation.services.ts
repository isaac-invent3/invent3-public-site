import { createApi } from '@reduxjs/toolkit/query/react';
import { generateQueryStr } from '~/lib/utils/queryGenerator';
import baseQueryWithReauth from '../../baseQueryWithReauth';

const getHeaders = () => ({
  'Content-Type': 'application/json',
});
export const depreciationApi = createApi({
  reducerPath: 'depreciationApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['allDepreciation'],
  endpoints: (builder) => ({
    getAllAssetDepreciation: builder.query({
      query: (data: any) => ({
        url: generateQueryStr(`/AssetDepreciations?`, data),
        method: 'GET',
        headers: getHeaders(),
      }),
      providesTags: ['allDepreciation'],
    }),
  }),
});

export const { useGetAllAssetDepreciationQuery } = depreciationApi;
