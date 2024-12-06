import { createApi } from '@reduxjs/toolkit/query/react';
import { generateQueryStr } from '~/lib/utils/queryGenerator';
import baseQueryWithReauth from '../../baseQueryWithReauth';
import { MaintenanceScheduleInstance } from '~/lib/interfaces/maintenance.interfaces';
import {
  BaseApiResponse,
  ListResponse,
} from '~/lib/interfaces/general.interfaces';

const getHeaders = () => ({
  'Content-Type': 'application/json',
});
export const scheduleInstanceApi = createApi({
  reducerPath: 'scheduleInstance',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['allScheduleInstances'],
  endpoints: (builder) => ({
    updateScheduleInstance: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/MaintenanceScheduleInstances/${id}`,
        method: 'PUT',
        headers: getHeaders(),
        body: data,
      }),
      invalidatesTags: ['allScheduleInstances'],
    }),
    updateScheduleInstanceandTaskInstances: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/Invent3Pro/UpdateScheduleAndTaskInstances/${id}`,
        method: 'PUT',
        headers: getHeaders(),
        body: data,
      }),
    }),
    deleteMaintenanceSchedule: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/MaintenanceScheduleInstances/${id}`,
        method: 'DELETE',
        headers: getHeaders(),
        body: data,
      }),
      invalidatesTags: ['allScheduleInstances'],
    }),
    getAllScheduleInstance: builder.query<
      BaseApiResponse<ListResponse<MaintenanceScheduleInstance>>,
      {}
    >({
      query: (data) => ({
        url: generateQueryStr('/MaintenanceScheduleInstances?', data),
        method: 'GET',
        headers: getHeaders(),
      }),
      providesTags: ['allScheduleInstances'],
    }),
    getScheduleInstanceByGuid: builder.query<
      BaseApiResponse<MaintenanceScheduleInstance>,
      { id: number | string }
    >({
      query: ({ id }) => ({
        url: `/MaintenanceScheduleInstances/${id}`,
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    getInstanceScheduleAggregate: builder.query({
      query: ({ id, ...data }) => ({
        url: generateQueryStr(
          `/MaintenanceSchedules/GetMaintenanceScheduleAggregatesByArea/${id}?`,
          data
        ),
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    searchScheduleInstance: builder.mutation<
      BaseApiResponse<ListResponse<MaintenanceScheduleInstance>>,
      any
    >({
      query: (body: any) => ({
        url: `/MaintenanceScheduleInstances/Search`,
        method: 'POST',
        headers: getHeaders(),
        body,
      }),
    }),
  }),
});

export const {
  useDeleteMaintenanceScheduleMutation,
  useGetAllScheduleInstanceQuery,
  useGetInstanceScheduleAggregateQuery,
  useGetScheduleInstanceByGuidQuery,
  useSearchScheduleInstanceMutation,
  useUpdateScheduleInstanceMutation,
  useUpdateScheduleInstanceandTaskInstancesMutation,
} = scheduleInstanceApi;
