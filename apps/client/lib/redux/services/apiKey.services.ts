import { createApi } from '@reduxjs/toolkit/query/react';
import { generateQueryStr } from '~/lib/utils/queryGenerator';
import baseQueryWithReauth from '../baseQueryWithReauth';
import { BaseApiResponse, ListResponse, QueryParams } from '@repo/interfaces';
import {
  CompanyApiKeys,
  CreateAPIKeyPayload,
} from '~/lib/interfaces/apiKey.interfaces';

const getHeaders = () => ({
  'Content-Type': 'application/json',
});
export const companyApiKey = createApi({
  reducerPath: 'companyApiKey',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['allCompanyApiKeys'],
  endpoints: (builder) => ({
    getAllCompanyApiKeys: builder.query<
      BaseApiResponse<ListResponse<CompanyApiKeys>>,
      QueryParams
    >({
      query: (data) => ({
        url: generateQueryStr(`/CompanyApiKeys?`, data),
        method: 'GET',
        headers: getHeaders(),
      }),
      providesTags: ['allCompanyApiKeys'],
    }),
    deleteCompanyApiKey: builder.mutation<
      void,
      { id: number; deletedBy: string }
    >({
      query: ({ id, ...body }) => ({
        url: `/CompanyApiKeys/${id}`,
        method: 'DELETE',
        headers: getHeaders(),
        body,
      }),
      invalidatesTags: ['allCompanyApiKeys'],
    }),
    createAPIKey: builder.mutation<
      BaseApiResponse<CompanyApiKeys>,
      CreateAPIKeyPayload
    >({
      query: (body) => ({
        url: `/CompanyApiKeys`,
        method: 'POST',
        headers: getHeaders(),
        body,
      }),
      invalidatesTags: ['allCompanyApiKeys'],
    }),
  }),
});

export const {
  useGetAllCompanyApiKeysQuery,
  useDeleteCompanyApiKeyMutation,
  useCreateAPIKeyMutation,
} = companyApiKey;
