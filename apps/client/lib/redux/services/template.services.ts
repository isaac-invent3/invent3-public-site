import { createApi } from '@reduxjs/toolkit/query/react';
import { generateQueryStr } from '~/lib/utils/queryGenerator';
import baseQueryWithReauth from '../baseQueryWithReauth';
import {
  BaseApiResponse,
  ListResponse,
  QueryParams,
} from '~/lib/interfaces/general.interfaces';
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
    searchTemplates: builder.mutation({
      query: (body: any) => ({
        url: `//api/Templates/Search`,
        method: 'POST',
        headers: getHeaders(),
        body,
      }),
    }),
  }),
});

export const {
  useGetMaintenancePlanTemplateQuery,
  useSearchTemplatesMutation,
} = templateApi;
