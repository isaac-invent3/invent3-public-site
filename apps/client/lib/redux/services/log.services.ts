import { createApi } from '@reduxjs/toolkit/query/react';
import { generateQueryStr } from '~/lib/utils/queryGenerator';
import baseQueryWithReauth from '../baseQueryWithReauth';
import {
  BaseApiResponse,
  ListResponse,
  QueryParams,
  SearchQuery,
} from '@repo/interfaces';
import { AuditLog } from '~/lib/interfaces/log.interfaces';

const getHeaders = () => ({
  'Content-Type': 'application/json',
});
export const logApi = createApi({
  reducerPath: 'logApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['allLogs'],
  endpoints: (builder) => ({
    getAllLogs: builder.query<
      BaseApiResponse<ListResponse<AuditLog>>,
      QueryParams
    >({
      query: (data) => ({
        url: generateQueryStr(`/AuditLogMessages?`, data),
        method: 'GET',
        headers: getHeaders(),
      }),
      providesTags: ['allLogs'],
    }),
    getLogById: builder.query<BaseApiResponse<AuditLog>, { id: number }>({
      query: ({ id }) => ({
        url: `/AuditLogMessages/${id}`,
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    searchLog: builder.mutation<
      BaseApiResponse<ListResponse<AuditLog>>,
      SearchQuery
    >({
      query: (body) => ({
        url: `/AuditLogMessages/Search`,
        method: 'POST',
        headers: getHeaders(),
        body,
      }),
    }),
  }),
});

export const { useGetAllLogsQuery, useGetLogByIdQuery, useSearchLogMutation } =
  logApi;
