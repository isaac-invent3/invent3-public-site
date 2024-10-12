import { createApi } from '@reduxjs/toolkit/query/react';
import { generateQueryStr } from '~/lib/utils/queryGenerator';
import baseQueryWithReauth from '../../baseQueryWithReauth';

const getHeaders = () => ({
  'Content-Type': 'application/json',
});
export const maintenanceFrequencyApi = createApi({
  reducerPath: 'maintenanceFrequencyApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['allMaintenanceFrequencies'],
  endpoints: (builder) => ({
    getAllMaintenanceFrequencies: builder.query({
      query: (data: any) => ({
        url: generateQueryStr(`/MaintenanceFrequencies?`, data),
        method: 'GET',
        headers: getHeaders(),
      }),
      providesTags: ['allMaintenanceFrequencies'],
    }),
    searchMaintenanceFrequencies: builder.mutation({
      query: (body: any) => ({
        url: `/MaintenanceFrequencies/Search`,
        method: 'POST',
        headers: getHeaders(),
        body,
      }),
    }),
  }),
});

export const {
  useGetAllMaintenanceFrequenciesQuery,
  useSearchMaintenanceFrequenciesMutation,
} = maintenanceFrequencyApi;
