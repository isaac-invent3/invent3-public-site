import { createApi } from '@reduxjs/toolkit/query/react';
import { generateQueryStr } from '~/lib/utils/queryGenerator';
import baseQueryWithReauth from '../baseQueryWithReauth';
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
export const employeesApi = createApi({
  reducerPath: 'employeesApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['allUsers'],
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
