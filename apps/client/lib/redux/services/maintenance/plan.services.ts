import { createApi } from '@reduxjs/toolkit/query/react';
import { generateQueryStr } from '~/lib/utils/queryGenerator';
import baseQueryWithReauth from '../../baseQueryWithReauth';

const getHeaders = () => ({
  'Content-Type': 'application/json',
});
export const maintenancePlanApi = createApi({
  reducerPath: 'maintenancePlanApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['allMaintenancePlan', 'allMaintenancePlansByAssetId'],
  endpoints: (builder) => ({
    createMaintenancePlan: builder.mutation({
      query: (body: any) => ({
        url: `/MaintenancePlans`,
        method: 'POST',
        headers: getHeaders(),
        body,
      }),
      invalidatesTags: ['allMaintenancePlan', 'allMaintenancePlansByAssetId'],
    }),
    createMaintenancePlanWithSchedules: builder.mutation({
      query: (body: any) => ({
        url: `/Invent3Pro/CreateMaintenancePlan`,
        method: 'POST',
        headers: getHeaders(),
        body,
      }),
      invalidatesTags: ['allMaintenancePlan', 'allMaintenancePlansByAssetId'],
    }),
    updateMaintenancePlan: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/MaintenancePlans/${id}`,
        method: 'PUT',
        headers: getHeaders(),
        body,
      }),
      invalidatesTags: ['allMaintenancePlan', 'allMaintenancePlansByAssetId'],
    }),
    getAllMaintenancePlan: builder.query({
      query: (data: any) => ({
        url: generateQueryStr(`/MaintenancePlans?`, data),
        method: 'GET',
        headers: getHeaders(),
      }),
      providesTags: ['allMaintenancePlan'],
    }),
    getMaintenancePlanById: builder.query({
      query: (id: any) => ({
        url: `/MaintenancePlans/${id}`,
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    deleteMaintenancePlan: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/MaintenancePlans/${id}`,
        method: 'DELETE',
        headers: getHeaders(),
        body,
      }),
      invalidatesTags: ['allMaintenancePlan', 'allMaintenancePlansByAssetId'],
    }),
    getAllMaintenancePlansByAssetId: builder.query({
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
    getAssetCustomMaintenancePlanByAssetGuid: builder.query({
      query: (id) => ({
        url: `/MaintenancePlans/GetAssetCustomMaintenancePlan/${id}`,
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    searchMaintenancePlan: builder.mutation({
      query: (body: any) => ({
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
  useUpdateMaintenancePlanMutation,
  useCreateMaintenancePlanMutation,
  useCreateMaintenancePlanWithSchedulesMutation,
  useDeleteMaintenancePlanMutation,
  useGetAllMaintenancePlanQuery,
  useSearchMaintenancePlanMutation,
  useGetAllMaintenancePlansByAssetIdQuery,
  useGetAssetCustomMaintenancePlanByAssetGuidQuery,
} = maintenancePlanApi;
