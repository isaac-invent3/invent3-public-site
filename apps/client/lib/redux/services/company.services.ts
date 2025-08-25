import { createApi } from '@reduxjs/toolkit/query/react';
import { generateQueryStr } from '~/lib/utils/queryGenerator';
import baseQueryWithReauth from '../baseQueryWithReauth';
import {
  BaseApiResponse,
  ListResponse,
  QueryParams,
  SearchQuery,
} from '@repo/interfaces';
import {
  Company,
  CompanyDistribution,
  CompanyJourneyGuide,
  CompanySummary,
  CreateCompanyPayload,
  TenantSummary,
  UpdateCompanyPayload,
} from '~/lib/interfaces/company.interfaces';

const getHeaders = () => ({
  'Content-Type': 'application/json',
});
export const companyApi = createApi({
  reducerPath: 'companyApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['allCompanies'],
  endpoints: (builder) => ({
    getAllCompanies: builder.query<
      BaseApiResponse<ListResponse<Company>>,
      QueryParams
    >({
      query: (data) => ({
        url: generateQueryStr(`/Companies/GetInfoHeader?`, data),
        method: 'GET',
        headers: getHeaders(),
      }),
      providesTags: ['allCompanies'],
    }),
    getCompanyById: builder.query<BaseApiResponse<Company>, { id: number }>({
      query: ({ id }) => ({
        url: `/Companies/GetInfo/${id}`,
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    getCompaniesSummary: builder.query<BaseApiResponse<CompanySummary>, void>({
      query: () => ({
        url: `/Invent3Pro/GetCompaniesDashboardSummary`,
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    getTenantAssetAndUserCount: builder.query<
      BaseApiResponse<TenantSummary>,
      { tenantName: string }
    >({
      query: (data) => ({
        url: generateQueryStr(`/Companies/GetTenantAssetAndUserCounts?`, data),
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    getCompanyComplianceStatus: builder.query<
      BaseApiResponse<number>,
      { tenantName: string }
    >({
      query: (data) => ({
        url: generateQueryStr(`/Invent3Pro/GetCompanyComplianceStatus?`, data),
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    getCompanyApiKey: builder.query<
      BaseApiResponse<{ apiKey: string }>,
      { companyId: number; requestedBy: string }
    >({
      query: ({ companyId, ...data }) => ({
        url: generateQueryStr(`/Companies/GetApiKey/${companyId}?`, data),
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    searchCompanies: builder.mutation<
      BaseApiResponse<ListResponse<Company>>,
      SearchQuery
    >({
      query: (body) => ({
        url: `/Companies/Search`,
        method: 'POST',
        headers: getHeaders(),
        body,
      }),
    }),
    createCompany: builder.mutation<
      BaseApiResponse<Company>,
      CreateCompanyPayload
    >({
      query: (body) => ({
        url: `/Invent3Pro/Companies/Create`,
        method: 'POST',
        headers: getHeaders(),
        body,
      }),
    }),
    updateCompany: builder.mutation<
      BaseApiResponse<Company>,
      UpdateCompanyPayload
    >({
      query: (body) => ({
        url: `/Invent3Pro/Companies/Update`,
        method: 'PUT',
        headers: getHeaders(),
        body,
      }),
    }),
    toggleCompanyStatus: builder.mutation<
      BaseApiResponse<Company>,
      { companyId: number; lastModifiedBy: string }
    >({
      query: ({ companyId, ...body }) => ({
        url: generateQueryStr(
          `/Companies/ToggleCompanyStatus/${companyId}?`,
          body
        ),
        method: 'PUT',
        headers: getHeaders(),
        body,
      }),
      invalidatesTags: ['allCompanies'],
    }),
    getCompanyJourneyGuide: builder.query<
      BaseApiResponse<CompanyJourneyGuide>,
      { companyId: number }
    >({
      query: ({ companyId }) => ({
        url: `/Invent3Pro/GetComapnyJourneyGuide/${companyId}`,
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    getCompanyDistribution: builder.query<
      BaseApiResponse<ListResponse<CompanyDistribution>>,
      void
    >({
      query: () => ({
        url: '/Companies/GetCompanyDistribution',
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
  }),
});

export const {
  useGetAllCompaniesQuery,
  useGetCompanyByIdQuery,
  useSearchCompaniesMutation,
  useGetCompaniesSummaryQuery,
  useCreateCompanyMutation,
  useUpdateCompanyMutation,
  useToggleCompanyStatusMutation,
  useGetCompanyJourneyGuideQuery,
  useGetCompanyApiKeyQuery,
  useGetTenantAssetAndUserCountQuery,
  useGetCompanyDistributionQuery,
  useGetCompanyComplianceStatusQuery,
} = companyApi;
