import { baseApi } from '~/lib/redux/services/baseApi.services';
import { generateQueryStr } from '~/lib/utils/queryGenerator';

import { BaseApiResponse, ListResponse, QueryParams } from '@repo/interfaces';
import { Module, SubModule } from '~/lib/interfaces/module.interfaces';

const getHeaders = () => ({
  'Content-Type': 'application/json',
});
export const moduleApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllModules: builder.query<
      BaseApiResponse<ListResponse<Module>>,
      QueryParams
    >({
      query: (data) => ({
        url: generateQueryStr(`/SystemModuleContextTypes?`, data),
        method: 'GET',
        headers: getHeaders(),
      }),
      providesTags: ['allModules'],
    }),
    getAllSubModules: builder.query<
      BaseApiResponse<ListResponse<SubModule>>,
      QueryParams & { systemModuleContextTypeId?: number }
    >({
      query: (data) => ({
        url: generateQueryStr(`/SystemSubModuleContextTypes?`, data),
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    getAllSubModulesKeyByModuleId: builder.query<
      BaseApiResponse<ListResponse<{ keyName: string }>>,
      QueryParams & { moduleId?: number }
    >({
      query: ({ moduleId, ...data }) => ({
        url: generateQueryStr(
          `/SystemSubModuleContextTypes/GetSystemSubModuleKeyValuesByParentModuleId/${moduleId}?`,
          data
        ),
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    getSubModulesByModuleId: builder.query<
      BaseApiResponse<SubModule>,
      { id: number }
    >({
      query: ({ id }) => ({
        url: `/Employees/${id}`,
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
  }),
});

export const {
  useGetSubModulesByModuleIdQuery,
  useGetAllSubModulesQuery,
  useGetAllModulesQuery,
  useGetAllSubModulesKeyByModuleIdQuery,
} = moduleApi;
