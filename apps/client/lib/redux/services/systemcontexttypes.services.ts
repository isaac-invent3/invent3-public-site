import { createApi } from '@reduxjs/toolkit/query/react';
import {
  BaseApiResponse,
  ListResponse,
  QueryParams,
} from '~/lib/interfaces/general.interfaces';
import { Report } from '~/lib/interfaces/report.interfaces';
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
      BaseApiResponse<ListResponse<Report>>,
      QueryParams
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

    searchContextTypes: builder.mutation({
      query: (body: any) => ({
        url: `/SystemContextTypes/Search`,
        method: 'POST',
        headers: getHeaders(),
        body,
      }),
    }),
  }),
});

export const { useGetReportableSystemContextTypesQuery ,useSearchContextTypesMutation} =
  systemContextTypesApi;
