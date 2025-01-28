import { createApi } from '@reduxjs/toolkit/query/react';
import { generateQueryStr } from '~/lib/utils/queryGenerator';
import baseQueryWithReauth from '../baseQueryWithReauth';
import {
  BaseApiResponse,
  ListResponse,
  QueryParams,
  SearchQuery,
} from '@repo/interfaces';
import { Company } from '~/lib/interfaces/company.interfaces';

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
        url: generateQueryStr(`/Companies?`, data),
        method: 'GET',
        headers: getHeaders(),
      }),
      providesTags: ['allCompanies'],
    }),
    getCompanyById: builder.query<
      BaseApiResponse<Company>,
      { id: number | undefined }
    >({
      query: ({ id }) => ({
        url: `/Companies/${id}`,
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
  }),
});

export const {
  useGetAllCompaniesQuery,
  useGetCompanyByIdQuery,
  useSearchCompaniesMutation,
} = companyApi;
