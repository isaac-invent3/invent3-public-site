import { createApi } from '@reduxjs/toolkit/query/react';
import {
  BaseApiResponse,
  ListResponse,
  SearchQuery,
} from '~/lib/interfaces/general.interfaces';
import { Report } from '~/lib/interfaces/report.interfaces';
import {
  GetSystemContextTypeColumnsPayload,
  SystemContextType,
  SystemContextTypeColumns,
} from '~/lib/interfaces/systemContextType.interfaces';
import { generateQueryStr } from '~/lib/utils/queryGenerator';
import baseQueryWithReauth from '../baseQueryWithReauth';

const getHeaders = () => ({
  'Content-Type': 'application/json',
});
export const systemContextTypesApi = createApi({
  reducerPath: 'systemContextTypesApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['reportableSystemContextTypes'],
  endpoints: (builder) => ({
    getReportableSystemContextTypes: builder.query<
      BaseApiResponse<ListResponse<SystemContextType>>,
      SearchQuery
    >({
      query: (data) => ({
        url: generateQueryStr(
          `/SystemContextTypes/GetReportableSystemContextTypes?`,
          data
        ),
        method: 'GET',
        headers: getHeaders(),
      }),
      providesTags: ['reportableSystemContextTypes'],
    }),

    getSystemContextTypeColumnsInfo: builder.query<
      BaseApiResponse<ListResponse<SystemContextTypeColumns>>,
      GetSystemContextTypeColumnsPayload
    >({
      query: ({ systemContextTypeId, ...data }) => ({
        url: generateQueryStr(
          `/SystemContextTypes/GetSystemContextTypeColumnsInfo/${systemContextTypeId}?`,
          data
        ),
        method: 'GET',
        headers: getHeaders(),
      }),
    }),

    searchContextTypes: builder.mutation<
      BaseApiResponse<ListResponse<Report>>,
      SearchQuery
    >({
      query: (body: any) => ({
        url: `/SystemContextTypes/Search`,
        method: 'POST',
        headers: getHeaders(),
        body,
      }),
    }),
  }),
});

export const {
  useGetReportableSystemContextTypesQuery,
  useSearchContextTypesMutation,
  useGetSystemContextTypeColumnsInfoQuery
} = systemContextTypesApi;
