import { baseApi } from '~/lib/redux/services/baseApi.services';

import { generateQueryStr } from '~/lib/utils/queryGenerator';

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
export const departmentApi = baseApi.injectEndpoints({
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
    deleteDepartment: builder.mutation<void, { id: number; deletedBy: string }>(
      {
        query: ({ id, ...body }) => ({
          url: `/Departments/${id}`,
          method: 'DELETE',
          headers: getHeaders(),
          body,
        }),
        invalidatesTags: ['departmentsByFloorId'],
      }
    ),
    updateDepartment: builder.mutation<
      BaseApiResponse<Department>,
      {
        departmentId: number;
        departmentName: string;
        departmentRef?: string;
        currentCapacity?: number;
        maxCapacity?: number;
        lastModifiedBy: string;
      }
    >({
      query: (body) => ({
        url: `/Departments/${body.departmentId}`,
        method: 'PUT',
        headers: getHeaders(),
        body,
      }),
      invalidatesTags: ['departmentsByFloorId'],
    }),
  }),
});

export const {
  useCreateDepartmentMutation,
  useGetAllDepartmentsQuery,
  useGetDepartmentsByFloorIdQuery,
  useSearchDepartmentsMutation,
  useDeleteDepartmentMutation,
  useUpdateDepartmentMutation,
} = departmentApi;
