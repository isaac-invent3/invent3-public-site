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
  CompanySummary,
  createCompanyPayload,
  updateCompanyPayload,
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
      createCompanyPayload
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
      updateCompanyPayload
    >({
      query: (body) => ({
        url: `/Invent3Pro/Companies/Update`,
        method: 'PUT',
        headers: getHeaders(),
        body,
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
} = companyApi;
