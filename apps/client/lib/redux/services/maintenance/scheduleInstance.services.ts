import { createApi } from '@reduxjs/toolkit/query/react';
import { generateQueryStr } from '~/lib/utils/queryGenerator';
import baseQueryWithReauth from '../../baseQueryWithReauth';
import {
  MaintenanceScheduleInstance,
  UpdateScheduleInstanceAndTasksPayload,
} from '~/lib/interfaces/maintenance.interfaces';
import {
  BaseApiResponse,
  ListResponse,
  QueryParams,
  SearchQuery,
} from '@repo/interfaces';

const getHeaders = () => ({
  'Content-Type': 'application/json',
});
export const scheduleInstanceApi = createApi({
  reducerPath: 'scheduleInstance',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['allScheduleInstances'],
  endpoints: (builder) => ({
    updateScheduleInstanceandTaskInstances: builder.mutation<
      void,
      UpdateScheduleInstanceAndTasksPayload
    >({
      query: (data) => ({
        url: `/Invent3Pro/UpdateScheduleAndTaskInstances`,
        method: 'PUT',
        headers: getHeaders(),
        body: data,
      }),
    }),
    deleteMaintenanceSchedule: builder.mutation<
      void,
      { id: number | undefined; deletedBy: string | undefined }
    >({
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
      QueryParams
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
      { instanceGuid: string }
    >({
      query: ({ instanceGuid }) => ({
        url: `/MaintenanceScheduleInstances/${instanceGuid}`,
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    getMaintenanceScheduleInstanceAggregate: builder.query<
      BaseApiResponse<ListResponse<MaintenanceScheduleInstance>>,
      {
        areaId: number;
        areaType: number;
        startDate: string;
        endDate: string;
        pageNumber?: number;
        pageSize?: number;
      }
    >({
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
          areaId: number;
          areaType: number;
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
      SearchQuery
    >({
      query: (body) => ({
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
  useUpdateScheduleInstanceandTaskInstancesMutation,
  useGetMaintenanceScheduleInstanceAggregateQuery,
  useGetMaintenanceScheduleInstancesWithSingleAggregateCountsByAreaQuery,
} = scheduleInstanceApi;
