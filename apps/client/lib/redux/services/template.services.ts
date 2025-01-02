import { createApi } from '@reduxjs/toolkit/query/react';
import { generateQueryStr } from '~/lib/utils/queryGenerator';
import baseQueryWithReauth from '../baseQueryWithReauth';
import { BaseApiResponse, ListResponse, QueryParams } from '@repo/interfaces';
import { Template } from '~/lib/interfaces/template.interfaces';

const getHeaders = () => ({
  'Content-Type': 'application/json',
});
export const templateApi = createApi({
  reducerPath: 'templateApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['allMaintenancePlanTemplates'],
  endpoints: (builder) => ({
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
    searchTemplates: builder.mutation({
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
  }),
});

export const {
  useGetMaintenancePlanTemplateQuery,
  useGetMaintenanceScheduleTemplateQuery,
  useSearchTemplatesMutation,
  useGetTemplateInfoBySystemContextTypeAndContextIdQuery,
} = templateApi;
