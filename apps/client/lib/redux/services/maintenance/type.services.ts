import { baseApi } from '~/lib/redux/services/baseApi.services';

import { generateQueryStr } from '~/lib/utils/queryGenerator';

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
export const maintenanceTypeApi = baseApi.injectEndpoints({
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
