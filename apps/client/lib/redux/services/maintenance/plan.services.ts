import { createApi } from '@reduxjs/toolkit/query/react';
import { generateQueryStr } from '~/lib/utils/queryGenerator';
import baseQueryWithReauth from '../../baseQueryWithReauth';

const getHeaders = () => ({
  'Content-Type': 'application/json',
});
export const maintenancePlanApi = createApi({
  reducerPath: 'maintenancePlanApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['allMaintenancePlan'],
  endpoints: (builder) => ({
    getAllMaintenancePlan: builder.query({
      query: (data: any) => ({
        url: generateQueryStr(`/MaintenancePlans?`, data),
        method: 'GET',
        headers: getHeaders(),
      }),
      providesTags: ['allMaintenancePlan'],
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
  useGetAllMaintenancePlanQuery,
  useSearchMaintenancePlanMutation,
} = maintenancePlanApi;
