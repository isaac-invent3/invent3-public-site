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
  AssetComplianceCategoryDetail,
  AssetComplianceDetail,
  AssetCompliancePayload,
  Compliance,
  ComplianceRegulation,
  ComplianceStatusType,
  ComplianceSummary,
  ComplianceType,
  CreateCompliancePayload,
  FacilityAssetCompliance,
  FacilityAssetComplianceSummary,
  MarkCompliancePayload,
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
    'allComplianceRegulations',
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
      BaseApiResponse<ListResponse<FacilityAssetCompliance>>,
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
      BaseApiResponse<ListResponse<AssetComplianceCategory>>,
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
    getAllComplianceTypes: builder.query<
      BaseApiResponse<ListResponse<ComplianceType>>,
      QueryParams
    >({
      query: (data) => ({
        url: generateQueryStr(`/ComplianceTypes?`, data),
        method: 'GET',
        headers: getHeaders(),
      }),
      providesTags: ['allCategoryCompliance'],
    }),
    getComplianceStatusType: builder.query<
      BaseApiResponse<ListResponse<ComplianceStatusType>>,
      QueryParams
    >({
      query: (data) => ({
        url: '/ComplianceStatusTypes',
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    getAllComplianceByType: builder.query<
      BaseApiResponse<ListResponse<ComplianceRegulation>>,
      QueryParams & { complianceTypeId: number }
    >({
      query: ({ complianceTypeId, ...data }) => ({
        url: generateQueryStr(
          `/ComplianceRegulations/GetByComplianceType/${complianceTypeId}?`,
          data
        ),
        method: 'GET',
        headers: getHeaders(),
      }),
      providesTags: ['allComplianceRegulations'],
    }),
    getAllAssetBasedCompliances: builder.query<
      BaseApiResponse<ListResponse<AssetBasedCompliance>>,
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
    getComplianceAssetCategoryDetails: builder.query<
      BaseApiResponse<AssetComplianceCategoryDetail>,
      { facilityId: number; assetCategoryId: number }
    >({
      query: ({ facilityId, assetCategoryId }) => ({
        url: `/AssetCompliances/AssetCompliancesByCategoryDetails/${facilityId}/${assetCategoryId}`,
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    getAssetComplianceDetails: builder.query<
      BaseApiResponse<AssetComplianceDetail>,
      { facilityId: number; assetId: number }
    >({
      query: ({ facilityId, assetId }) => ({
        url: `/AssetCompliances/AssetCompliancesByCategoryDetails/${facilityId}/${assetId}`,
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
    createAssetCompliance: builder.mutation<
      BaseApiResponse<Compliance>,
      AssetCompliancePayload
    >({
      query: (body) => ({
        url: `/Invent3Pro/AssetCompliance/Create`,
        method: 'POST',
        headers: getHeaders(),
        body,
      }),
      invalidatesTags: ['allFacilityCompliance'],
    }),
    createComplianceRegulation: builder.mutation<
      BaseApiResponse<ComplianceRegulation>,
      CreateCompliancePayload
    >({
      query: (body) => ({
        url: `/ComplianceRegulations`,
        method: 'POST',
        headers: getHeaders(),
        body,
      }),
      invalidatesTags: ['allComplianceRegulations'],
    }),
    deleteComplianceRegulation: builder.mutation<
      void,
      { id: number; deletedBy: string }
    >({
      query: ({ id, ...body }) => ({
        url: `/ComplianceRegulations/${id}`,
        method: 'DELETE',
        headers: getHeaders(),
        body,
      }),
      invalidatesTags: ['allComplianceRegulations'],
    }),
    markComplianceStatus: builder.mutation<
      BaseApiResponse<void>,
      MarkCompliancePayload
    >({
      query: (body) => ({
        url: `/ComplianceAuditLogs`,
        method: 'POST',
        headers: getHeaders(),
        body,
      }),
      invalidatesTags: ['allCategoryCompliance'],
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
  useCreateAssetComplianceMutation,
  useGetAllComplianceTypesQuery,
  useGetAllComplianceByTypeQuery,
  useCreateComplianceRegulationMutation,
  useDeleteComplianceRegulationMutation,
  useGetComplianceAssetCategoryDetailsQuery,
  useGetComplianceStatusTypeQuery,
  useMarkComplianceStatusMutation,
} = complianceApi;
