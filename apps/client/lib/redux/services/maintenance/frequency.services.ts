import { baseApi } from '~/lib/redux/services/baseApi.services';

import { generateQueryStr } from '~/lib/utils/queryGenerator';

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
export const maintenanceFrequencyApi = baseApi.injectEndpoints({
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
