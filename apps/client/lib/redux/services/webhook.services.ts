import { baseApi } from '~/lib/redux/services/baseApi.services';
import { generateQueryStr } from '~/lib/utils/queryGenerator';

import { BaseApiResponse, ListResponse, QueryParams } from '@repo/interfaces';
import {
  AuthMethod,
  CompanyWebhookURL,
  CreateWebhookPayload,
  UpdateWebhookPayload,
  WebhookSystemModuleContextPermission,
} from '~/lib/interfaces/webhook.interfaces';

const getHeaders = () => ({
  'Content-Type': 'application/json',
});
export const webhookApi = baseApi.injectEndpoints({
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
      CreateWebhookPayload
    >({
      query: (body) => ({
        url: `/Invent3Pro/CreateWebhookModulePermissions`,
        method: 'POST',
        headers: getHeaders(),
        body,
      }),
      invalidatesTags: ['allCompanyWebhookUrls'],
    }),
    updateWebhook: builder.mutation<
      BaseApiResponse<CompanyWebhookURL>,
      UpdateWebhookPayload
    >({
      query: (body) => ({
        url: `/Invent3Pro/UpdateWebhookModulePermissions`,
        method: 'PUT',
        headers: getHeaders(),
        body,
      }),
      invalidatesTags: ['allCompanyWebhookUrls'],
    }),
    getWebhookSystemModuleContextPermissions: builder.query<
      BaseApiResponse<ListResponse<WebhookSystemModuleContextPermission>>,
      QueryParams & { webhookIds?: number[] }
    >({
      query: (data) => ({
        url: generateQueryStr(`/WebhookSystemModuleContextPermissions?`, data),
        method: 'GET',
        headers: getHeaders(),
      }),
      providesTags: ['allWebhookSystemModuleContextPermissions'],
    }),
    getAllAuthenticationMethod: builder.query<
      BaseApiResponse<ListResponse<AuthMethod>>,
      QueryParams
    >({
      query: (data) => ({
        url: generateQueryStr(`/CompanyWebhookUrls/GetAuthMethods?`, data),
        method: 'GET',
        headers: getHeaders(),
      }),
      providesTags: ['allAuthMethods'],
    }),
  }),
});

export const {
  useGetAllCompanyWebhookUrlsQuery,
  useDeleteCompanyWebhookURLMutation,
  useCreateWebhookMutation,
  useUpdateWebhookMutation,
  useGetAllAuthenticationMethodQuery,
  useGetWebhookSystemModuleContextPermissionsQuery,
} = webhookApi;
