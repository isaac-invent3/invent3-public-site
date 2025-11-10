import { baseApi } from '~/lib/redux/services/baseApi.services';

import { generateQueryStr } from '~/lib/utils/queryGenerator';

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
export const scheduleInstanceApi = baseApi.injectEndpoints({
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
      QueryParams & {
        statusId?: number;
        assignedTo?: number;
        startDateRange?: string;
        endDateRange?: string;
      }
    >({
      query: (data) => ({
        url: generateQueryStr('/MaintenanceScheduleInstances?', data),
        method: 'GET',
        headers: getHeaders(),
      }),
      providesTags: ['allScheduleInstances'],
    }),
    getScheduleInstanceById: builder.query<
      BaseApiResponse<MaintenanceScheduleInstance>,
      { instanceId: number }
    >({
      query: ({ instanceId }) => ({
        url: `/MaintenanceScheduleInstances/${instanceId}`,
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
    getAllMaintenanceScheduleInstanceByAssetId: builder.query<
      BaseApiResponse<ListResponse<MaintenanceScheduleInstance>>,
      { id: number; pageSize?: number; pageNumber?: number }
    >({
      query: ({ id, ...data }) => ({
        url: generateQueryStr(
          `/MaintenanceScheduleInstances/GetAssetMaintenanceHistory/${id}?`,
          data
        ),
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
  }),
});

export const {
  useGetAllMaintenanceScheduleInstanceByAssetIdQuery,
  useDeleteMaintenanceScheduleMutation,
  useGetAllScheduleInstanceQuery,
  useGetScheduleInstanceByIdQuery,
  useSearchScheduleInstanceMutation,
  useUpdateScheduleInstanceandTaskInstancesMutation,
  useGetMaintenanceScheduleInstanceAggregateQuery,
  useGetMaintenanceScheduleInstancesWithSingleAggregateCountsByAreaQuery,
} = scheduleInstanceApi;
