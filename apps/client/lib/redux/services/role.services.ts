import { createApi } from '@reduxjs/toolkit/query/react';
import { generateQueryStr } from '~/lib/utils/queryGenerator';
import baseQueryWithReauth from '../baseQueryWithReauth';
import {
  BaseApiResponse,
  ListResponse,
  QueryParams,
  SearchQuery,
} from '@repo/interfaces';
import { Role } from '~/lib/interfaces/role.interfaces';

const getHeaders = () => ({
  'Content-Type': 'application/json',
});
export const rolesApi = createApi({
  reducerPath: 'rolesApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['allRoles'],
  endpoints: (builder) => ({
    getAllRoles: builder.query<
      BaseApiResponse<ListResponse<Role>>,
      QueryParams
    >({
      query: (data) => ({
        url: generateQueryStr(`/Roles?`, data),
        method: 'GET',
        headers: getHeaders(),
      }),
      providesTags: ['allRoles'],
    }),
    getRoleById: builder.query<BaseApiResponse<Role>, { id: number }>({
      query: ({ id }) => ({
        url: `/Roles/${id}`,
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    searchRoles: builder.mutation<
      BaseApiResponse<ListResponse<Role>>,
      SearchQuery
    >({
      query: (body) => ({
        url: `/Roles/Search`,
        method: 'POST',
        headers: getHeaders(),
        body,
      }),
    }),
  }),
});

export const {
  useGetAllRolesQuery,
  useGetRoleByIdQuery,
  useSearchRolesMutation,
} = rolesApi;
