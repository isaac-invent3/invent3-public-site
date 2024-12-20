import { createApi } from '@reduxjs/toolkit/query/react';
import {
  BaseApiResponse,
  ListResponse,
  QueryParams,
  SearchQuery,
} from '@repo/interfaces';
import {
  MaintenanceSchedule,
  MaintenanceScheduleStat,
} from '~/lib/interfaces/maintenance.interfaces';
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
      query: (body) => ({
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
    deleteMaintenanceSchedule: builder.mutation<
      void,
      { id: number; deletedBy: string }
    >({
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
    getAllMaintenanceSchedule: builder.query<
      BaseApiResponse<ListResponse<MaintenanceSchedule>>,
      QueryParams
    >({
      // eslint-disable-next-line no-unused-vars
      query: (data) => ({
        url: generateQueryStr(`/MaintenanceSchedules?`, data),
        method: 'GET',
        headers: getHeaders(),
      }),
      providesTags: ['allMaintenanceSchedule'],
    }),
    getAllMaintenanceScheduleByAssetId: builder.query<
      BaseApiResponse<ListResponse<MaintenanceSchedule>>,
      { id: number; pageSize?: number; pageNumber?: number }
    >({
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
    getMaintenanceScheduleByGuid: builder.query<
      BaseApiResponse<MaintenanceSchedule>,
      string
    >({
      query: (guid) => ({
        url: `/MaintenanceSchedules/${guid}`,
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    getMaintenanceScheduleStats: builder.query<
      BaseApiResponse<MaintenanceScheduleStat>,
      {
        areaId: number;
        areaType: number;
        startDate: string;
        endDate: string;
      }
    >({
      query: ({ areaId, ...data }) => ({
        url: generateQueryStr(
          `/MaintenanceSchedules/GetAssetMaintenanceSchedulesStats/${areaId}?`,
          data
        ),
        method: 'GET',
        headers: getHeaders(),
      }),
      providesTags: ['maintenanceScheduleStats'],
    }),
    getMaintenanceSchedulesByPlanId: builder.query<
      BaseApiResponse<ListResponse<MaintenanceSchedule>>,
      { id: number; pageSize?: number; pageNumber: number }
    >({
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
    getMaintenanceSchedulesByArea: builder.query<
      BaseApiResponse<ListResponse<MaintenanceSchedule>>,
      {
        areaId: number;
        areaType: number;
        startDate: string;
        endDate: string;
      } & QueryParams
    >({
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
      { id: number }
    >({
      query: ({ id }) => ({
        url: `/MaintenanceSchedules/GetMaintenanceScheduleInfoHeaderRecordByScheduleId/${id}?`,
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    getMaintenanceSchedulesByTicketId: builder.query<
      BaseApiResponse<MaintenanceSchedule>,
      { ticketId: number }
    >({
      query: ({ ticketId }) => ({
        url: `/MaintenanceSchedules/GetMaintenanceSchedulesByTicketId/${ticketId}`,

        method: 'GET',
        headers: getHeaders(),
      }),
      providesTags: ['maintenanceScheduleByTicketId'],
    }),
    searchMaintenanceSchedule: builder.mutation<
      BaseApiResponse<ListResponse<MaintenanceSchedule>>,
      SearchQuery
    >({
      query: (body) => ({
        url: `/MaintenanceSchedules/Search`,
        method: 'POST',
        headers: getHeaders(),
        body,
      }),
    }),
    validateFirstInstanceScheduledDate: builder.mutation<
      void,
      {
        frequencyId: number;
        intervalValue: number;
        startDate: string;
        dayOccurrences?: string[];
        weekOccurrences?: number[];
        monthOccurences?: number[];
        yearOccurences?: { [name: string]: number[] };
        endDate: string | null;
      }
    >({
      query: (body) => ({
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
  useSearchMaintenanceScheduleMutation,
  useGetMaintenanceSchedulesByAreaQuery,
  useGetMaintenanceScheduleByGuidQuery,
  useGetMaintenanceSchedulesByPlanIdQuery,
  useGetMaintenenanceScheduleInfoHeaderByScheduleIDQuery,
  useValidateFirstInstanceScheduledDateMutation,
  useGetMaintenanceSchedulesByTicketIdQuery,
} = maintenanceScheduleApi;
