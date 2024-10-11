import { createApi } from '@reduxjs/toolkit/query/react';
import { generateQueryStr } from '~/lib/utils/queryGenerator';
import baseQueryWithReauth from '../../baseQueryWithReauth';

const getHeaders = () => ({
  'Content-Type': 'application/json',
});
export const maintenanceTypeApi = createApi({
  reducerPath: 'maintenanceTypeApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['allMaintenanceType'],
  endpoints: (builder) => ({
    getAllMaintenanceType: builder.query({
      query: (data: any) => ({
        url: generateQueryStr(`/MaintenanceTypes?`, data),
        method: 'GET',
        headers: getHeaders(),
      }),
      providesTags: ['allMaintenanceType'],
    }),
    searchMaintenanceType: builder.mutation({
      query: (body: any) => ({
        url: `/MaintenanceTypes/Search`,
        method: 'POST',
        headers: getHeaders(),
        body,
      }),
    }),
  }),
});

export const {
  useGetAllMaintenanceTypeQuery,
  useSearchMaintenanceTypeMutation,
} = maintenanceTypeApi;
