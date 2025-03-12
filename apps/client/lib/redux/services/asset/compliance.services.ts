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
  AssetComplaince,
  ComplianceSummary,
} from '~/lib/interfaces/asset/compliance.interfaces';
const getHeaders = () => ({
  'Content-Type': 'application/json',
});
export const complianceApi = createApi({
  reducerPath: 'complianceApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['allCompliance'],
  endpoints: (builder) => ({
    getAllAssetCompliance: builder.query<
      BaseApiResponse<ListResponse<AssetComplaince>>,
      QueryParams
    >({
      query: (data) => ({
        url: generateQueryStr(`/AssetCompliances?`, data),
        method: 'GET',
        headers: getHeaders(),
      }),
      providesTags: ['allCompliance'],
    }),
    getComplianceSummary: builder.query<
      BaseApiResponse<ComplianceSummary>,
      void
    >({
      query: () => ({
        url: `/Invent3Pro/GetComplianceSummary`,
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    searchAssetCompliance: builder.mutation<
      BaseApiResponse<ListResponse<AssetComplaince>>,
      SearchQuery
    >({
      query: (body) => ({
        url: `/AssetCompliances/Search`,
        method: 'POST',
        headers: getHeaders(),
        body,
      }),
    }),
  }),
});

export const {
  useGetComplianceSummaryQuery,
  useGetAllAssetComplianceQuery,
  useSearchAssetComplianceMutation,
} = complianceApi;
