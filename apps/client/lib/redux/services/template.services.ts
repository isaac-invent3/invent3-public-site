import { baseApi } from '~/lib/redux/services/baseApi.services';
import { generateQueryStr } from '~/lib/utils/queryGenerator';

import {
  BaseApiResponse,
  ListResponse,
  QueryParams,
  SearchQuery,
} from '@repo/interfaces';
import { Template } from '~/lib/interfaces/template.interfaces';

const getHeaders = () => ({
  'Content-Type': 'application/json',
});
export const templateApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllTemplates: builder.query<
      BaseApiResponse<ListResponse<Template>>,
      QueryParams
    >({
      query: (data) => ({
        url: generateQueryStr(`/Templates?`, data),
        method: 'GET',
        headers: getHeaders(),
      }),
      providesTags: ['allTemplates'],
    }),
    getTemplateById: builder.query<BaseApiResponse<Template>, { id: number }>({
      query: ({ id }) => ({
        url: `/Templates/GetTemplateInfoHeader/${id}`,
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    getMaintenancePlanTemplate: builder.query<
      BaseApiResponse<ListResponse<Template>>,
      QueryParams
    >({
      query: (data) => ({
        url: generateQueryStr(`/Templates/GetMaintenancePlanTemplates?`, data),
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    getMaintenanceScheduleTemplate: builder.query<
      BaseApiResponse<ListResponse<Template>>,
      QueryParams
    >({
      query: (data) => ({
        url: generateQueryStr(
          `/Templates/GetMaintenanceScheduleTemplates?`,
          data
        ),
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    searchTemplates: builder.mutation<
      BaseApiResponse<ListResponse<Template>>,
      SearchQuery
    >({
      query: (body) => ({
        url: `/Templates/Search`,
        method: 'POST',
        headers: getHeaders(),
        body,
      }),
    }),
    getTemplateInfoBySystemContextTypeAndContextId: builder.query<
      BaseApiResponse<Template>,
      { systemContextTypeId: number; contextId: number | null }
    >({
      query: (data) => ({
        url: `/Templates/GetTemplateBySystemContextTypeIdAndContextId/${data.systemContextTypeId}?contextId=${data.contextId}`,
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    updateTemplate: builder.mutation<
      void,
      {
        templateId: number;
        templateName: string;
        description: string;
        lastModifiedBy: string;
      }
    >({
      query: (body) => ({
        url: `/Templates/${body.templateId}`,
        method: 'PUT',
        headers: getHeaders(),
        body,
      }),
      invalidatesTags: ['allTemplates'],
    }),
    deleteTemplate: builder.mutation<void, { id: number; deletedBy: string }>({
      query: ({ id, ...body }) => ({
        url: `/Templates/${id}`,
        method: 'DELETE',
        headers: getHeaders(),
        body,
      }),
      invalidatesTags: ['allTemplates'],
    }),
  }),
});

export const {
  useGetAllTemplatesQuery,
  useGetTemplateByIdQuery,
  useGetMaintenancePlanTemplateQuery,
  useGetMaintenanceScheduleTemplateQuery,
  useSearchTemplatesMutation,
  useGetTemplateInfoBySystemContextTypeAndContextIdQuery,
  useUpdateTemplateMutation,
  useDeleteTemplateMutation,
} = templateApi;
