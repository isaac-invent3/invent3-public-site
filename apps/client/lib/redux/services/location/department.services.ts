import { createApi } from '@reduxjs/toolkit/query/react';
import { generateQueryStr } from '~/lib/utils/queryGenerator';
import baseQueryWithReauth from '../../baseQueryWithReauth';
import {
  BaseApiResponse,
  ListResponse,
  QueryParams,
  SearchQuery,
} from '@repo/interfaces';
import {
  Department,
  LocationQueryParams,
} from '~/lib/interfaces/location.interfaces';

const getHeaders = () => ({
  'Content-Type': 'application/json',
});
export const departmentApi = createApi({
  reducerPath: 'departmentApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['allDepartments', 'departmentsByFloorId'],
  endpoints: (builder) => ({
    getAllDepartments: builder.query<
      BaseApiResponse<ListResponse<Department>>,
      QueryParams
    >({
      query: (data) => ({
        url: generateQueryStr(`/Departments?`, data),
        method: 'GET',
        headers: getHeaders(),
      }),
      providesTags: ['allDepartments'],
    }),
    getDepartmentsByFloorId: builder.query<
      BaseApiResponse<ListResponse<Department>>,
      LocationQueryParams
    >({
      query: ({ id, ...data }) => ({
        url: generateQueryStr(
          `/Departments/GetDepartmentByFloorId/${id}?`,
          data
        ),
        method: 'GET',
        headers: getHeaders(),
      }),
      providesTags: ['departmentsByFloorId'],
    }),
    createDepartment: builder.mutation<
      BaseApiResponse<Department>,
      {
        departmentName: string;
        departmentRef: string;
        floorId: number | undefined;
        createdBy: string | undefined;
      }
    >({
      query: (body) => ({
        url: `/Departments`,
        method: 'POST',
        headers: getHeaders(),
        body,
      }),
      invalidatesTags: ['allDepartments', 'departmentsByFloorId'],
    }),
    searchDepartments: builder.mutation<
      BaseApiResponse<ListResponse<Department>>,
      SearchQuery
    >({
      query: (body) => ({
        url: `/Departments/Search`,
        method: 'POST',
        headers: getHeaders(),
        body,
      }),
    }),
  }),
});

export const {
  useCreateDepartmentMutation,
  useGetAllDepartmentsQuery,
  useGetDepartmentsByFloorIdQuery,
  useSearchDepartmentsMutation,
} = departmentApi;
