import { createApi } from '@reduxjs/toolkit/query/react';
import {
  BaseApiResponse,
  ListResponse,
  QueryParams,
} from '~/lib/interfaces/general.interfaces';
import {
  Report,
  ReportDashboardValuesResponse,
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
      QueryParams
    >({
      query: () => ({
        url: `/Reports/GetReportDashboardValues`,
        method: 'GET',
        headers: getHeaders(),
      }),
      providesTags: ['reportDashboardValues'],
    }),
  }),
});

export const { useGetAllSavedReportsQuery,useGetAllDefaultReportsQuery, useGetReportDasboardValuesQuery } =
  reportApi;
