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
    getAllMaintenancePlan: builder.query({
      query: (data: any) => ({
        url: generateQueryStr(`/MaintenancePlans?`, data),
        method: 'GET',
        headers: getHeaders(),
      }),
      providesTags: ['allMaintenancePlan'],
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
  useCreateMaintenancePlanMutation,
  useGetAllMaintenancePlanQuery,
  useSearchMaintenancePlanMutation,
  useGetAllMaintenancePlansByAssetIdQuery,
} = maintenancePlanApi;
