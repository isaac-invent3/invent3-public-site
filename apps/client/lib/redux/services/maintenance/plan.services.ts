import { createApi } from '@reduxjs/toolkit/query/react';
import { generateQueryStr } from '~/lib/utils/queryGenerator';
import baseQueryWithReauth from '../../baseQueryWithReauth';
import {
  BaseApiResponse,
  ListResponse,
  QueryParams,
  SearchQuery,
} from '@repo/interfaces';
import {
  CreateMaintenancePlanWithSchedulesPayload,
  MaintenancePlan,
  PlanPayload,
  SingleMaintenancePlan,
  UpdateMaintenancePlanWithSchedulesPayload,
} from '~/lib/interfaces/maintenance.interfaces';

const getHeaders = () => ({
  'Content-Type': 'application/json',
});
export const maintenancePlanApi = createApi({
  reducerPath: 'maintenancePlanApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['allMaintenancePlan', 'allMaintenancePlansByAssetId'],
  endpoints: (builder) => ({
    createMaintenancePlan: builder.mutation<
      BaseApiResponse<SingleMaintenancePlan>,
      PlanPayload
    >({
      query: (body) => ({
        url: `/MaintenancePlans`,
        method: 'POST',
        headers: getHeaders(),
        body,
      }),
      invalidatesTags: ['allMaintenancePlan', 'allMaintenancePlansByAssetId'],
    }),
    createMaintenancePlanWithSchedules: builder.mutation<
      BaseApiResponse<MaintenancePlan>,
      CreateMaintenancePlanWithSchedulesPayload
    >({
      query: (body) => ({
        url: `/Invent3Pro/CreateMaintenancePlan`,
        method: 'POST',
        headers: getHeaders(),
        body,
      }),
      invalidatesTags: ['allMaintenancePlan', 'allMaintenancePlansByAssetId'],
    }),
    updateMaintenancePlanWithSchedules: builder.mutation<
      void,
      UpdateMaintenancePlanWithSchedulesPayload
    >({
      query: (body) => ({
        url: `/Invent3Pro/UpdateMaintenancePlan`,
        method: 'PUT',
        headers: getHeaders(),
        body,
      }),
      invalidatesTags: ['allMaintenancePlan', 'allMaintenancePlansByAssetId'],
    }),
    getAllMaintenancePlan: builder.query<
      BaseApiResponse<ListResponse<MaintenancePlan>>,
      QueryParams
    >({
      query: (data) => ({
        url: generateQueryStr(`/MaintenancePlans?`, data),
        method: 'GET',
        headers: getHeaders(),
      }),
      providesTags: ['allMaintenancePlan'],
    }),
    getMaintenancePlanById: builder.query<
      BaseApiResponse<SingleMaintenancePlan>,
      { id: number }
    >({
      query: ({ id }) => ({
        url: `/MaintenancePlans/${id}`,
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    deleteMaintenancePlan: builder.mutation<
      void,
      { id: number; deletedBy: string }
    >({
      query: ({ id, ...body }) => ({
        url: `/MaintenancePlans/${id}`,
        method: 'DELETE',
        headers: getHeaders(),
        body,
      }),
      invalidatesTags: ['allMaintenancePlan', 'allMaintenancePlansByAssetId'],
    }),
    getAllMaintenancePlansByAssetId: builder.query<
      BaseApiResponse<ListResponse<MaintenancePlan>>,
      { id: number; assetTypeId: number } & QueryParams
    >({
      query: ({ id, ...data }) => ({
        url: generateQueryStr(
          `/MaintenancePlans/GetAssetMaintenancePlans/${id}?`,
          data
        ),
        method: 'GET',
        headers: getHeaders(),
      }),
      providesTags: ['allMaintenancePlansByAssetId'],
    }),
    getAllMaintenancePlansByGroupContextIdAndGroupTypeId: builder.query<
      BaseApiResponse<MaintenancePlan>,
      { groupContextId: number; groupTypeId: number }
    >({
      query: ({ groupContextId, ...data }) => ({
        url: generateQueryStr(
          `/MaintenancePlans/GetAssetGroupPlan/${groupContextId}?`,
          data
        ),
        method: 'GET',
        headers: getHeaders(),
      }),
      providesTags: ['allMaintenancePlansByAssetId'],
    }),
    getAssetCustomMaintenancePlanByAssetGuid: builder.query<
      BaseApiResponse<ListResponse<MaintenancePlan>>,
      { assetGuid: string | undefined }
    >({
      query: ({ assetGuid }) => ({
        url: `/MaintenancePlans/GetAssetCustomMaintenancePlan/${assetGuid}`,
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    searchMaintenancePlan: builder.mutation<
      ListResponse<MaintenancePlan>,
      SearchQuery
    >({
      query: (body) => ({
        url: `/MaintenancePlans/Search`,
        method: 'POST',
        headers: getHeaders(),
        body,
      }),
    }),
  }),
});

export const {
  useGetMaintenancePlanByIdQuery,
  useCreateMaintenancePlanMutation,
  useCreateMaintenancePlanWithSchedulesMutation,
  useUpdateMaintenancePlanWithSchedulesMutation,
  useDeleteMaintenancePlanMutation,
  useGetAllMaintenancePlanQuery,
  useSearchMaintenancePlanMutation,
  useGetAllMaintenancePlansByAssetIdQuery,
  useGetAssetCustomMaintenancePlanByAssetGuidQuery,
  useGetAllMaintenancePlansByGroupContextIdAndGroupTypeIdQuery,
} = maintenancePlanApi;
