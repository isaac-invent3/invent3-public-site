import { createApi } from '@reduxjs/toolkit/query/react';
import { generateQueryStr } from '~/lib/utils/queryGenerator';
import baseQueryWithReauth from '../baseQueryWithReauth';
import { BaseApiResponse, ListResponse, QueryParams } from '@repo/interfaces';
import {
  CompanyWebhookURL,
  createWebhookPayload,
} from '~/lib/interfaces/webhook.interfaces';

const getHeaders = () => ({
  'Content-Type': 'application/json',
});
export const webhookApi = createApi({
  reducerPath: 'webhookApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['allCompanyWebhookUrls'],
  endpoints: (builder) => ({
    getAllCompanyWebhookUrls: builder.query<
      BaseApiResponse<ListResponse<CompanyWebhookURL>>,
      QueryParams
    >({
      query: (data) => ({
        url: generateQueryStr(`/CompanyWebhookUrls?`, data),
        method: 'GET',
        headers: getHeaders(),
      }),
      providesTags: ['allCompanyWebhookUrls'],
    }),
    deleteCompanyWebhookURL: builder.mutation<
      void,
      { id: number; deletedBy: string }
    >({
      query: ({ id, ...body }) => ({
        url: `/CompanyWebhookUrls/${id}`,
        method: 'DELETE',
        headers: getHeaders(),
        body,
      }),
      invalidatesTags: ['allCompanyWebhookUrls'],
    }),
    createWebhook: builder.mutation<
      BaseApiResponse<CompanyWebhookURL>,
      createWebhookPayload
    >({
      query: (body) => ({
        url: `/CompanyWebhookUrls`,
        method: 'POST',
        headers: getHeaders(),
        body,
      }),
      invalidatesTags: ['allCompanyWebhookUrls'],
    }),
  }),
});

export const {
  useGetAllCompanyWebhookUrlsQuery,
  useDeleteCompanyWebhookURLMutation,
  useCreateWebhookMutation,
} = webhookApi;
