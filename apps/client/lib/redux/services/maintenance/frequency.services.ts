import { createApi } from '@reduxjs/toolkit/query/react';
import { generateQueryStr } from '~/lib/utils/queryGenerator';
import baseQueryWithReauth from '../../baseQueryWithReauth';
import {
  BaseApiResponse,
  ListResponse,
  QueryParams,
  SearchQuery,
} from '@repo/interfaces';
import { MaintenanceFrequency } from '~/lib/interfaces/maintenance.interfaces';

const getHeaders = () => ({
  'Content-Type': 'application/json',
});
export const maintenanceFrequencyApi = createApi({
  reducerPath: 'maintenanceFrequencyApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['allMaintenanceFrequencies'],
  endpoints: (builder) => ({
    getAllMaintenanceFrequencies: builder.query<
      BaseApiResponse<ListResponse<MaintenanceFrequency>>,
      QueryParams
    >({
      query: (data) => ({
        url: generateQueryStr(`/MaintenanceFrequencies?`, data),
        method: 'GET',
        headers: getHeaders(),
      }),
      providesTags: ['allMaintenanceFrequencies'],
    }),
    searchMaintenanceFrequencies: builder.mutation<
      BaseApiResponse<ListResponse<MaintenanceFrequency>>,
      SearchQuery
    >({
      query: (body) => ({
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
