import { createApi } from '@reduxjs/toolkit/query/react';
import { generateQueryStr } from '~/lib/utils/queryGenerator';
import baseQueryWithReauth from '../baseQueryWithReauth';
import {
  BaseApiResponse,
  ListResponse,
  QueryParams,
  SearchQuery,
} from '@repo/interfaces';
import {
  createRoleModulePermissionPayload,
  Role,
  RoleSystemModuleContextPermission,
  updateRoleModulePermissionPayload,
} from '~/lib/interfaces/role.interfaces';

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
    createRoleModulePermission: builder.mutation<
      void,
      createRoleModulePermissionPayload
    >({
      query: (body) => ({
        url: `/Invent3Pro/CreateRoleModulePermissions`,
        method: 'POST',
        headers: getHeaders(),
        body,
      }),
    }),
    updateRoleModulePermission: builder.mutation<
      void,
      updateRoleModulePermissionPayload
    >({
      query: (body) => ({
        url: `/Invent3Pro/UpdateRoleModulePermissions`,
        method: 'PUT',
        headers: getHeaders(),
        body,
      }),
    }),
    getAllRoleSystemModuleContextPermissions: builder.query<
      BaseApiResponse<ListResponse<RoleSystemModuleContextPermission>>,
      QueryParams & { roleIds?: number[] }
    >({
      query: (data) => ({
        url: generateQueryStr(`/RoleSystemModuleContextPermissions?`, data),
        method: 'GET',
        headers: getHeaders(),
      }),
      providesTags: ['allRoles'],
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
    deleteRole: builder.mutation<void, { id: number; deletedBy: string }>({
      query: ({ id, ...body }) => ({
        url: `/Roles/${id}`,
        method: 'DELETE',
        headers: getHeaders(),
        body,
      }),
      invalidatesTags: ['allRoles'],
    }),
  }),
});

export const {
  useGetAllRolesQuery,
  useGetRoleByIdQuery,
  useSearchRolesMutation,
  useGetAllRoleSystemModuleContextPermissionsQuery,
  useCreateRoleModulePermissionMutation,
  useUpdateRoleModulePermissionMutation,
  useDeleteRoleMutation,
} = rolesApi;
