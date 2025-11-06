import { createApi } from '@reduxjs/toolkit/query/react';
import { BaseApiResponse } from '@repo/interfaces';
import baseQueryWithReauth from '../../baseQueryWithReauth';
import { generateQueryStr } from '~/lib/utils/queryGenerator';
import {
  PriorityLevelCount,
  TicketByStatus,
  TicketClosedByTechnician,
  TicketCountByFacility,
  TicketCreationScore,
  TicketPerformanceDashboardSummary,
  TicketPerformanceTrends,
} from '~/lib/interfaces/dashboard/ticket.interfaces';

const getHeaders = () => ({
  'Content-Type': 'application/json',
});

interface ticketQuery {
  facilityIds?: number[];
  assetCategoryIds?: number[];
  datePeriod?: number;
  ticketTypes?: number[];
}

export const ticketDashboardApis = createApi({
  reducerPath: 'ticketDashboardApis',
  baseQuery: baseQueryWithReauth,
  tagTypes: [],
  endpoints: (builder) => ({
    getTicketPerformanceDashboardSummary: builder.query<
      BaseApiResponse<TicketPerformanceDashboardSummary>,
      ticketQuery
    >({
      query: (data) => ({
        url: generateQueryStr(
          `/Invent3Pro/TicketPerformanceDashboardSummary?`,
          data
        ),
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    getTicketClosedByTechnician: builder.query<
      BaseApiResponse<TicketClosedByTechnician[]>,
      ticketQuery
    >({
      query: (data) => ({
        url: generateQueryStr(`/Invent3Pro/TicketClosedByTechnician?`, data),
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    getTicketCreationSource: builder.query<
      BaseApiResponse<TicketCreationScore>,
      ticketQuery
    >({
      query: (data) => ({
        url: generateQueryStr(`/Invent3Pro/TicketCreationSource?`, data),
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    getTicketByStatus: builder.query<
      BaseApiResponse<TicketByStatus[]>,
      ticketQuery
    >({
      query: (data) => ({
        url: generateQueryStr(`/Invent3Pro/TicketByStatus?`, data),
        method: 'GET',
        headers: getHeaders(),
      }),
    }),

    getTicketPerformanceDashboardPerformanceTrends: builder.query<
      BaseApiResponse<TicketPerformanceTrends>,
      ticketQuery
    >({
      query: (data) => ({
        url: generateQueryStr(
          `/Invent3Pro/TicketPerformanceDashboardPerformanceTrends?`,
          data
        ),
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    getTicketByPriorityLevel: builder.query<
      BaseApiResponse<PriorityLevelCount[]>,
      ticketQuery
    >({
      query: (data) => ({
        url: generateQueryStr(`/Invent3Pro/TicketByPriorityLevel?`, data),
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    getTopTicketCount: builder.query<
      BaseApiResponse<TicketCountByFacility[]>,
      ticketQuery
    >({
      query: (data) => ({
        url: generateQueryStr(`/Invent3Pro/TopTicketCountByFacility?`, data),
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
  }),
});

export const {
  useGetTicketByStatusQuery,
  useGetTicketClosedByTechnicianQuery,
  useGetTicketCreationSourceQuery,
  useGetTicketPerformanceDashboardPerformanceTrendsQuery,
  useGetTicketPerformanceDashboardSummaryQuery,
  useLazyGetTicketByStatusQuery,
  useGetTicketByPriorityLevelQuery,
  useGetTopTicketCountQuery,
} = ticketDashboardApis;
