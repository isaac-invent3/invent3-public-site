import { createApi } from '@reduxjs/toolkit/query/react';
import { generateQueryStr } from '~/lib/utils/queryGenerator';
import baseQueryWithReauth from '../../baseQueryWithReauth';
import {
  BaseApiResponse,
  ListResponse,
  QueryParams,
  SearchQuery,
} from '@repo/interfaces';
import {
  AssetDisposal,
  AssetDisposalQuery,
  AssetDisposalReason,
} from '~/lib/interfaces/asset/disposal.interfaces';

const getHeaders = () => ({
  'Content-Type': 'application/json',
});
export const assetDisposalApi = createApi({
  reducerPath: 'assetDisposalApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['allAssetTypes'],
  endpoints: (builder) => ({
    getAllAssetDisposalReasons: builder.query<
      BaseApiResponse<ListResponse<AssetDisposalReason>>,
      QueryParams
    >({
      query: (data) => ({
        url: generateQueryStr(`/AssetDisposalReasons?`, data),
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    searchAssetDisposal: builder.mutation<
      BaseApiResponse<AssetDisposalReason>,
      SearchQuery
    >({
      query: (body) => ({
        url: `/AssetDisposalReasons/Search`,
        method: 'POST',
        headers: getHeaders(),
        body,
      }),
    }),

    requestAssetDisposal: builder.mutation<
      BaseApiResponse<AssetDisposalReason>,
      AssetDisposalQuery
    >({
      query: (body) => ({
        url: `/Invent3Pro/AssetDisposalRequests/Create`,
        method: 'POST',
        headers: getHeaders(),
        body,
      }),
    }),
    getAssetDisposal: builder.query<
      BaseApiResponse<AssetDisposal>,
      { id: number }
    >({
      query: ({ id }) => ({
        url: `/AssetDisposalRequests/GetAssetDisposalRequestInfoHeader/${id}?`,
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
  }),
});

export const {
  useGetAllAssetDisposalReasonsQuery,
  useSearchAssetDisposalMutation,
  useRequestAssetDisposalMutation,
  useGetAssetDisposalQuery,
} = assetDisposalApi;
