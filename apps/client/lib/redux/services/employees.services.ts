import { baseApi } from '~/lib/redux/services/baseApi.services';
import { generateQueryStr } from '~/lib/utils/queryGenerator';

import {
  BaseApiResponse,
  ListResponse,
  QueryParams,
  SearchQuery,
} from '@repo/interfaces';
import { Employee } from '~/lib/interfaces/user.interfaces';

const getHeaders = () => ({
  'Content-Type': 'application/json',
});
export const employeesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllEmployees: builder.query<
      BaseApiResponse<ListResponse<Employee>>,
      QueryParams
    >({
      query: (data) => ({
        url: generateQueryStr(`/Employees?`, data),
        method: 'GET',
        headers: getHeaders(),
      }),
      providesTags: ['allUsers'],
    }),
    getEmployeeById: builder.query<
      BaseApiResponse<Employee>,
      { id: number | undefined }
    >({
      query: ({ id }) => ({
        url: `/Employees/${id}`,
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    searchEmployees: builder.mutation<
      BaseApiResponse<ListResponse<Employee>>,
      SearchQuery
    >({
      query: (body) => ({
        url: `/Employees/Search`,
        method: 'POST',
        headers: getHeaders(),
        body,
      }),
    }),
  }),
});

export const {
  useGetAllEmployeesQuery,
  useGetEmployeeByIdQuery,
  useSearchEmployeesMutation,
} = employeesApi;
