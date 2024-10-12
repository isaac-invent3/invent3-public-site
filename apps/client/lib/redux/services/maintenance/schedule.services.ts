import { createApi } from '@reduxjs/toolkit/query/react';
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
  ],
  endpoints: (builder) => ({
    createMaintenanceSchedule: builder.mutation({
      query: (body: any) => ({
        url: `/MaintenanceSchedules`,
        method: 'POST',
        headers: getHeaders(),
        body,
      }),
      invalidatesTags: ['allMaintenanceSchedule'],
    }),
    updateMaintenanceSchedule: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/MaintenanceSchedules/${id}`,
        method: 'PUT',
        headers: getHeaders(),
        body: data,
      }),
      invalidatesTags: ['allMaintenanceSchedule'],
    }),
    getAllMaintenanceSchedule: builder.query({
      // eslint-disable-next-line no-unused-vars
      query: ({ id, ...data }) => ({
        url: generateQueryStr(`/MaintenanceSchedules`, data),
        method: 'GET',
        headers: getHeaders(),
      }),
      providesTags: ['allMaintenanceSchedule'],
    }),
    getMaintenanceScheduleById: builder.query({
      query: (id) => ({
        url: `/MaintenanceSchedules/${id}`,
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
          `/MaintenanceSchedules/GetMaintenanceScheduleAggregtesByArea/${id}?`,
          data
        ),
        method: 'GET',
        headers: getHeaders(),
      }),
      providesTags: ['maintenanceScheduleStats'],
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

    searchMaintenanceSchedule: builder.mutation({
      query: (body: any) => ({
        url: `/MaintenanceSchedules/Search`,
        method: 'POST',
        headers: getHeaders(),
        body,
      }),
    }),
  }),
});

export const {
  useCreateMaintenanceScheduleMutation,
  useUpdateMaintenanceScheduleMutation,
  useGetAllMaintenanceScheduleQuery,
  useGetMaintenanceScheduleStatsQuery,
  useGetMaintenanceScheduleAggregateQuery,
  useSearchMaintenanceScheduleMutation,
  useGetMaintenanceSchedulesByAreaQuery,
  useGetMaintenanceScheduleByIdQuery,
} = maintenanceScheduleApi;
