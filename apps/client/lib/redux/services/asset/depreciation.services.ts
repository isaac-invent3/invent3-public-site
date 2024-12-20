import { createApi } from '@reduxjs/toolkit/query/react';
import { generateQueryStr } from '~/lib/utils/queryGenerator';
import baseQueryWithReauth from '../../baseQueryWithReauth';
import {
  BaseApiResponse,
  ListResponse,
  QueryParams,
  SearchQuery,
} from '@repo/interfaces';
import { AssetDepreciation } from '~/lib/interfaces/asset/depreciation.interfaces';

const getHeaders = () => ({
  'Content-Type': 'application/json',
});
export const depreciationApi = createApi({
  reducerPath: 'depreciationApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['allDepreciation'],
  endpoints: (builder) => ({
    getAllAssetDepreciation: builder.query<
      BaseApiResponse<ListResponse<AssetDepreciation>>,
      QueryParams
    >({
      query: (data) => ({
        url: generateQueryStr(`/AssetDepreciations?`, data),
        method: 'GET',
        headers: getHeaders(),
      }),
      providesTags: ['allDepreciation'],
    }),
    searchDepreciation: builder.mutation<
      BaseApiResponse<ListResponse<AssetDepreciation>>,
      SearchQuery
    >({
      query: (body) => ({
        url: `/AssetDepreciations/Search`,
        method: 'POST',
        headers: getHeaders(),
        body,
      }),
    }),
  }),
});

export const {
  useGetAllAssetDepreciationQuery,
  useSearchDepreciationMutation,
} = depreciationApi;
