import { createApi } from '@reduxjs/toolkit/query/react';
import { BaseApiResponse, ListResponse, QueryParams } from '@repo/interfaces';
import {
  GenerateReportPayload,
  GenerateReportResponse,
  Report,
  ReportDashboardValuesResponse,
  SaveReportPayload,
  ScheduleReportPayload,
  ViewReportTableData,
  ViewReportTableDataPayload,
} from '~/lib/interfaces/report.interfaces';
import { generateQueryStr } from '~/lib/utils/queryGenerator';
import baseQueryWithReauth from '../baseQueryWithReauth';

const getHeaders = () => ({
  'Content-Type': 'application/json',
});
export const reportApi = createApi({
  reducerPath: 'reportApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['allSavedReports', 'allDefaultReports', 'reportDashboardValues'],
  endpoints: (builder) => ({
    getAllSavedReports: builder.query<
      BaseApiResponse<ListResponse<Report>>,
      QueryParams
    >({
      query: (data) => ({
        url: generateQueryStr(`/Reports/GetSavedReports?`, data),
        method: 'GET',
        headers: getHeaders(),
      }),
      providesTags: ['allSavedReports'],
    }),

    getAllDefaultReports: builder.query<
      BaseApiResponse<ListResponse<Report>>,
      QueryParams
    >({
      query: (data) => ({
        url: generateQueryStr(`/Reports/GetDefaultReports?`, data),
        method: 'GET',
        headers: getHeaders(),
      }),
      providesTags: ['allDefaultReports'],
    }),

    getReportDasboardValues: builder.query<
      BaseApiResponse<ReportDashboardValuesResponse>,
      QueryParams & {
        startDate: string;
        endDate: string;
        regionIds?: number[];
        lgaIds?: number[];
        facilityIds?: number[];
      }
    >({
      query: (data) => ({
        url: generateQueryStr(`/Reports/GetReportDashboardValues?`, data),
        method: 'GET',
        headers: getHeaders(),
      }),
      providesTags: ['reportDashboardValues'],
    }),

    getReportById: builder.query<BaseApiResponse<Report>, string>({
      query: (id: string) => ({
        url: `/Reports/${id}`,
        method: 'GET',
        headers: getHeaders(),
      }),
    }),

    viewReportById: builder.query<
      BaseApiResponse<ListResponse<ViewReportTableData>>,
      ViewReportTableDataPayload
    >({
      query: ({ reportId, ...data }) => ({
        url: generateQueryStr(`/Reports/ViewReport/${reportId}?`, data),
        method: 'GET',
        headers: getHeaders(),
      }),
    }),

    scheduleReport: builder.mutation<
      BaseApiResponse<ListResponse<ViewReportTableData>>,
      ScheduleReportPayload
    >({
      query: (body: any) => ({
        url: `/ReportSchedules`,
        method: 'POST',
        headers: getHeaders(),
        body,
      }),
    }),

    generateReport: builder.mutation<
      BaseApiResponse<ListResponse<GenerateReportResponse>>,
      GenerateReportPayload
    >({
      query: (body) => ({
        url: `/Invent3Pro/GenerateReport`,
        method: 'POST',
        headers: getHeaders(),
        body,
      }),
    }),
    saveReportAsTemplate: builder.mutation<
      BaseApiResponse<Report>,
      SaveReportPayload
    >({
      query: (body) => ({
        url: `/Reports`,
        method: 'POST',
        headers: getHeaders(),
        body,
      }),
    }),
    exportReport: builder.mutation<
      BaseApiResponse<string>,
      {
        reportId: number;
        exportType: number;
        startDate?: string;
        endDate?: string;
        regionIds?: number[];
        lgaIds?: number[];
        facilityIds?: number[];
      } & QueryParams
    >({
      query: (data) => ({
        url: generateQueryStr(`/Reports/Export?`, data),
        method: 'POST',
        headers: getHeaders(),
      }),
    }),
  }),
});

export const {
  useGetAllSavedReportsQuery,
  useGetAllDefaultReportsQuery,
  useGetReportDasboardValuesQuery,
  useGetReportByIdQuery,
  useViewReportByIdQuery,
  useScheduleReportMutation,
  useGenerateReportMutation,
  useSaveReportAsTemplateMutation,
  useExportReportMutation,
} = reportApi;
