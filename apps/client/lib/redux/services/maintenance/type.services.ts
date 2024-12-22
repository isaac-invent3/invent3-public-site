import { createApi } from '@reduxjs/toolkit/query/react';
import { generateQueryStr } from '~/lib/utils/queryGenerator';
import baseQueryWithReauth from '../../baseQueryWithReauth';
import { MaintenanceType } from '~/lib/interfaces/maintenance.interfaces';
import {
  BaseApiResponse,
  ListResponse,
  QueryParams,
  SearchQuery,
} from '@repo/interfaces';

const getHeaders = () => ({
  'Content-Type': 'application/json',
});
export const maintenanceTypeApi = createApi({
  reducerPath: 'maintenanceTypeApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['allMaintenanceType'],
  endpoints: (builder) => ({
    getAllMaintenanceType: builder.query<
      BaseApiResponse<ListResponse<MaintenanceType>>,
      QueryParams
    >({
      query: (data) => ({
        url: generateQueryStr(`/MaintenanceTypes?`, data),
        method: 'GET',
        headers: getHeaders(),
      }),
      providesTags: ['allMaintenanceType'],
    }),
    searchMaintenanceType: builder.mutation<
      BaseApiResponse<ListResponse<MaintenanceType>>,
      SearchQuery
    >({
      query: (body) => ({
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
