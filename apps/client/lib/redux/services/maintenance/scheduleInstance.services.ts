import { createApi } from '@reduxjs/toolkit/query/react';
import { generateQueryStr } from '~/lib/utils/queryGenerator';
import baseQueryWithReauth from '../../baseQueryWithReauth';
import { MaintenanceScheduleInstance } from '~/lib/interfaces/maintenance.interfaces';
import { BaseApiResponse, ListResponse } from '@repo/interfaces';

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
        url: `/Invent3Pro/UpdateScheduleAndTaskInstances/${id}`,
        method: 'PUT',
        headers: getHeaders(),
        body: data,
      }),
      invalidatesTags: ['allScheduleInstances'],
    }),
    updateScheduleInstanceandTaskInstances: builder.mutation({
      query: (data) => ({
        url: `/Invent3Pro/UpdateScheduleAndTaskInstances`,
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
    getMaintenanceScheduleInstanceAggregate: builder.query({
      query: ({ areaId, ...data }) => ({
        url: generateQueryStr(
          `/MaintenanceScheduleInstances/GetMaintenanceScheduleInstanceAggregatesByArea/${areaId}?`,
          data
        ),
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    getMaintenanceScheduleInstancesWithSingleAggregateCountsByArea:
      builder.query<
        BaseApiResponse<ListResponse<MaintenanceScheduleInstance>>,
        {
          areaId: string | number;
          areaType: string | number;
          startDate: string;
          endDate: string;
          pageNumber: number;
          pageSize: number;
        }
      >({
        query: ({ areaId, ...data }) => ({
          url: generateQueryStr(
            `/MaintenanceScheduleInstances/GetMaintenanceScheduleInstancesWithSingleAggregateCountsByArea/${areaId}?`,
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
  useGetScheduleInstanceByGuidQuery,
  useSearchScheduleInstanceMutation,
  useUpdateScheduleInstanceMutation,
  useUpdateScheduleInstanceandTaskInstancesMutation,
  useGetMaintenanceScheduleInstanceAggregateQuery,
  useGetMaintenanceScheduleInstancesWithSingleAggregateCountsByAreaQuery,
} = scheduleInstanceApi;
