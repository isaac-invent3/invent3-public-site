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
  AssetBasedCompliance,
  AssetCategoryComplianceSummary,
  AssetComplaince,
  AssetComplianceByFacility,
  AssetComplianceCategory,
  AssetComplianceDetail,
  ComplianceSummary,
  FacilityAssetCompliance,
  FacilityAssetComplianceSummary,
} from '~/lib/interfaces/asset/compliance.interfaces';
const getHeaders = () => ({
  'Content-Type': 'application/json',
});
export const complianceApi = createApi({
  reducerPath: 'complianceApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    'allCompliance',
    'allComplianceByFacility',
    'allFacilityCompliance',
    'allCategoryCompliance',
  ],
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
    getAllAssetComplianceByFacility: builder.query<
      BaseApiResponse<ListResponse<AssetComplianceByFacility>>,
      QueryParams & { facilityId?: number }
    >({
      query: (data) => ({
        url: generateQueryStr(`/AssetCompliances?`, data),
        method: 'GET',
        headers: getHeaders(),
      }),
      providesTags: ['allComplianceByFacility'],
    }),
    getAllFacilityCompliance: builder.query<
      BaseApiResponse<FacilityAssetCompliance[]>,
      QueryParams
    >({
      query: (data) => ({
        url: generateQueryStr(`/AssetCompliances/FacilityCompliance?`, data),
        method: 'GET',
        headers: getHeaders(),
      }),
      providesTags: ['allFacilityCompliance'],
    }),
    getAllCategoryComplianceByFacility: builder.query<
      BaseApiResponse<AssetComplianceCategory[]>,
      QueryParams & { facilityId: number }
    >({
      query: ({ facilityId, ...data }) => ({
        url: generateQueryStr(
          `/AssetCompliances/AssetCompliancesByCategory/${facilityId}?`,
          data
        ),
        method: 'GET',
        headers: getHeaders(),
      }),
      providesTags: ['allCategoryCompliance'],
    }),
    getAllAssetBasedCompliances: builder.query<
      BaseApiResponse<AssetBasedCompliance[]>,
      QueryParams & { facilityId: number; categoryId: number }
    >({
      query: ({ facilityId, categoryId, ...data }) => ({
        url: generateQueryStr(
          `/AssetCompliances/AssetBasedCompliances/${facilityId}/${categoryId}?`,
          data
        ),
        method: 'GET',
        headers: getHeaders(),
      }),
      providesTags: [],
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
    getComplianceFacilitySummary: builder.query<
      BaseApiResponse<FacilityAssetComplianceSummary>,
      { facilityId: number }
    >({
      query: ({ facilityId }) => ({
        url: `/Invent3Pro/GetComplianceBranchSummary/${facilityId}`,
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    getComplianceAssetCategorySummary: builder.query<
      BaseApiResponse<AssetCategoryComplianceSummary>,
      { facilityId: number; assetCategoryId: number }
    >({
      query: ({ facilityId, assetCategoryId }) => ({
        url: `/Invent3Pro/GetComplianceAssetCategorySummary/${facilityId}/${assetCategoryId}`,
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    getAssetComplianceDetails: builder.query<
      BaseApiResponse<AssetComplianceDetail>,
      { facilityId: number; assetId: number }
    >({
      query: ({ facilityId, assetId }) => ({
        url: `/AssetCompliances/AssetComplianceDetails/${facilityId}/${assetId}`,
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
  useGetAllAssetComplianceByFacilityQuery,
  useGetAllFacilityComplianceQuery,
  useGetComplianceFacilitySummaryQuery,
  useGetComplianceAssetCategorySummaryQuery,
  useGetAllCategoryComplianceByFacilityQuery,
  useGetAllAssetBasedCompliancesQuery,
  useGetAssetComplianceDetailsQuery,
} = complianceApi;
