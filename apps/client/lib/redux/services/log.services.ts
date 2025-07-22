import { createApi } from '@reduxjs/toolkit/query/react';
import { generateQueryStr } from '~/lib/utils/queryGenerator';
import baseQueryWithReauth from '../baseQueryWithReauth';
import {
  BaseApiResponse,
  ListResponse,
  QueryParams,
  SearchQuery,
} from '@repo/interfaces';
import {
  AuditChanges,
  AuditLog,
  AuditRecord,
  AuditSummary,
} from '~/lib/interfaces/log.interfaces';

const getHeaders = () => ({
  'Content-Type': 'application/json',
});
export const logApi = createApi({
  reducerPath: 'logApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['allLogs', 'allAuditRecords', 'allAuditRecordsChanges'],
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

    getAllAuditRecords: builder.query<
      BaseApiResponse<ListResponse<AuditRecord>>,
      QueryParams
    >({
      query: (data) => ({
        url: generateQueryStr(`/AuditRecords/GetAuditRecordsInfoHeader?`, data),
        method: 'GET',
        headers: getHeaders(),
      }),
      providesTags: ['allAuditRecords'],
    }),
    getAllAuditRecordChanges: builder.query<
      BaseApiResponse<AuditChanges[]>,
      QueryParams & { auditRecordId: number }
    >({
      query: ({ auditRecordId, ...data }) => ({
        url: generateQueryStr(
          `/AuditRecords/ChangesMade/${auditRecordId}?`,
          data
        ),
        method: 'GET',
        headers: getHeaders(),
      }),
      providesTags: ['allAuditRecordsChanges'],
    }),
    getLogById: builder.query<BaseApiResponse<AuditLog>, { id: number }>({
      query: ({ id }) => ({
        url: `/AuditLogMessages/${id}`,
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    getAuditRecordById: builder.query<
      BaseApiResponse<AuditRecord>,
      { id: number }
    >({
      query: ({ id }) => ({
        url: `/AuditRecords/GetAuditRecordInfoHeader/${id}`,
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    getAuditRecordSummary: builder.query<BaseApiResponse<AuditSummary>, void>({
      query: () => ({
        url: `/AuditRecords/GetDashboardCountResponse`,
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
    updateAuditRecord: builder.mutation<
      BaseApiResponse<ListResponse<AuditRecord>>,
      {
        auditRecordId: number;
        isFlaggedForReview: boolean;
        lastModifiedBy: string;
      }
    >({
      query: (body) => ({
        url: `/AuditRecords/${body.auditRecordId}`,
        method: 'PUT',
        headers: getHeaders(),
        body,
      }),
    }),
    flagAuditRecordForReview: builder.mutation<
      void,
      {
        auditRecordId: number;
        lastModifiedBy: string;
      }
    >({
      query: ({ auditRecordId, ...body }) => ({
        url: generateQueryStr(
          `/AuditRecords/FlagAuditRecordForReview/${auditRecordId}?`,
          body
        ),
        method: 'PUT',
        headers: getHeaders(),
      }),
    }),
    searchAuditRecords: builder.mutation<
      BaseApiResponse<ListResponse<AuditRecord>>,
      SearchQuery
    >({
      query: (body) => ({
        url: `/AuditRecords/Search`,
        method: 'POST',
        headers: getHeaders(),
        body,
      }),
    }),
    exportFieldChanges: builder.mutation<
      BaseApiResponse<string>,
      {
        auditRecordId: number;
      }
    >({
      query: ({ auditRecordId }) => ({
        url: generateQueryStr(`/AuditRecords/ExportFieldChanges?`, {
          auditRecordId,
        }),
        method: 'POST',
        headers: getHeaders(),
      }),
    }),
  }),
});

export const {
  useGetAllLogsQuery,
  useGetLogByIdQuery,
  useSearchLogMutation,
  useGetAllAuditRecordsQuery,
  useSearchAuditRecordsMutation,
  useGetAllAuditRecordChangesQuery,
  useGetAuditRecordByIdQuery,
  useUpdateAuditRecordMutation,
  useGetAuditRecordSummaryQuery,
  useFlagAuditRecordForReviewMutation,
  useExportFieldChangesMutation,
} = logApi;
