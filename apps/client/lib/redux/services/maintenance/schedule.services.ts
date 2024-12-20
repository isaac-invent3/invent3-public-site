import { createApi } from '@reduxjs/toolkit/query/react';
import { BaseApiResponse } from '@repo/interfaces';
import { MaintenanceSchedule } from '~/lib/interfaces/maintenance.interfaces';
import { generateQueryStr } from '~/lib/utils/queryGenerator';
import baseQueryWithReauth from '../../baseQueryWithReauth';
const getHeaders = () => ({
  'Content-Type': 'application/json',
});
export const maintenanceScheduleApi = createApi({
  reducerPath: 'maintenanceSchedule',
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    'allMaintenanceSchedule',
    'maintenanceScheduleStats',
    'maintenanceScheduleByArea',
    'allMaintenanceScheduleByPlanId',
    'maintenanceScheduleByTicketId',
  ],
  endpoints: (builder) => ({
    createMaintenanceScheduleAndTasks: builder.mutation({
      query: (body: any) => ({
        url: `/Invent3Pro/CreateScheduleAndTasks`,
        method: 'POST',
        headers: getHeaders(),
        body,
      }),
      invalidatesTags: [
        'allMaintenanceSchedule',
        'allMaintenanceScheduleByPlanId',
      ],
    }),
    updateMaintenanceSchedule: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/MaintenanceSchedules/${id}`,
        method: 'PUT',
        headers: getHeaders(),
        body: data,
      }),
      invalidatesTags: [
        'allMaintenanceSchedule',
        'allMaintenanceScheduleByPlanId',
      ],
    }),
    deleteMaintenanceSchedule: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/MaintenanceSchedules/${id}`,
        method: 'DELETE',
        headers: getHeaders(),
        body: data,
      }),
      invalidatesTags: [
        'allMaintenanceSchedule',
        'allMaintenanceScheduleByPlanId',
      ],
    }),
    getAllMaintenanceSchedule: builder.query({
      // eslint-disable-next-line no-unused-vars
      query: ({ id, ...data }) => ({
        url: generateQueryStr(`/MaintenanceSchedules?`, data),
        method: 'GET',
        headers: getHeaders(),
      }),
      providesTags: ['allMaintenanceSchedule'],
    }),
    getAllMaintenanceScheduleByAssetId: builder.query({
      query: ({ id, ...data }) => ({
        url: generateQueryStr(
          `/MaintenanceSchedules/GetMaintenanceSchedulesByAssetId/${id}?`,
          data
        ),
        method: 'GET',
        headers: getHeaders(),
      }),
      providesTags: ['allMaintenanceSchedule'],
    }),
    getMaintenanceScheduleByGuid: builder.query({
      query: (guid) => ({
        url: `/MaintenanceSchedules/${guid}`,
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    getMaintenanceScheduleStats: builder.query({
      query: ({ id, ...data }) => ({
        url: generateQueryStr(
          `/MaintenanceSchedules/GetAssetMaintenanceSchedulesStats/${id}?`,
          data
        ),
        method: 'GET',
        headers: getHeaders(),
      }),
      providesTags: ['maintenanceScheduleStats'],
    }),
    getMaintenanceScheduleAggregate: builder.query({
      query: ({ id, ...data }) => ({
        url: generateQueryStr(
          `/MaintenanceSchedules/GetMaintenanceScheduleAggregatesByArea/${id}?`,
          data
        ),
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    getMaintenanceSchedulesWithSingleAggregateCountsByArea: builder.query({
      query: ({ id, ...data }) => ({
        url: generateQueryStr(
          `/MaintenanceSchedules/GetMaintenanceSchedulesWithSingleAggregateCountsByArea/${id}?`,
          data
        ),
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    getMaintenanceSchedulesByPlanId: builder.query({
      query: ({ id, ...data }) => ({
        url: generateQueryStr(
          `/MaintenanceSchedules/GetMaintenanceSchedulesByPlanId/${id}?`,
          data
        ),
        method: 'GET',
        headers: getHeaders(),
      }),
      providesTags: ['allMaintenanceScheduleByPlanId'],
    }),
    getMaintenanceSchedulesByArea: builder.query({
      query: (data) => ({
        url: generateQueryStr(
          '/MaintenanceSchedules/GetSchedulesByArea?',
          data
        ),
        method: 'GET',
        headers: getHeaders(),
      }),
      providesTags: ['maintenanceScheduleByArea'],
    }),
    getMaintenenanceScheduleInfoHeaderByScheduleID: builder.query<
      BaseApiResponse<MaintenanceSchedule>,
      { id: string | number | null }
    >({
      query: ({ id }) => ({
        url: `/MaintenanceSchedules/GetMaintenanceScheduleInfoHeaderRecordByScheduleId/${id}?`,
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    getMaintenanceSchedulesByTicketId: builder.query<
      BaseApiResponse<MaintenanceSchedule>,
      { ticketId: number } & Record<string, any>
    >({
      query: ({ ticketId, ...data }) => ({
        // url: `/MaintenanceSchedules/GetMaintenanceSchedulesByTicketId/${ticketId}`,
        url: generateQueryStr(
          `/MaintenanceSchedules/GetMaintenanceSchedulesByTicketId/${ticketId}?`,
          data
        ),
        method: 'GET',
        headers: getHeaders(),
      }),
      providesTags: ['maintenanceScheduleByTicketId'],
    }),
    searchMaintenanceSchedule: builder.mutation({
      query: (body: any) => ({
        url: `/MaintenanceSchedules/Search`,
        method: 'POST',
        headers: getHeaders(),
        body,
      }),
    }),
    validateFirstInstanceScheduledDate: builder.mutation({
      query: (body: any) => ({
        url: `/Invent3Pro/ValidateFirstInstanceScheduledDate`,
        method: 'POST',
        headers: getHeaders(),
        body,
      }),
    }),
  }),
});

export const {
  useGetAllMaintenanceScheduleByAssetIdQuery,
  useDeleteMaintenanceScheduleMutation,
  useCreateMaintenanceScheduleAndTasksMutation,
  useUpdateMaintenanceScheduleMutation,
  useGetAllMaintenanceScheduleQuery,
  useGetMaintenanceScheduleStatsQuery,
  useGetMaintenanceScheduleAggregateQuery,
  useSearchMaintenanceScheduleMutation,
  useGetMaintenanceSchedulesByAreaQuery,
  useGetMaintenanceScheduleByGuidQuery,
  useGetMaintenanceSchedulesByPlanIdQuery,
  useGetMaintenanceSchedulesWithSingleAggregateCountsByAreaQuery,
  useGetMaintenenanceScheduleInfoHeaderByScheduleIDQuery,
  useValidateFirstInstanceScheduledDateMutation,
  useGetMaintenanceSchedulesByTicketIdQuery,
} = maintenanceScheduleApi;
