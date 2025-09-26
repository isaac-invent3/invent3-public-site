import { createApi } from '@reduxjs/toolkit/query/react';
import { BaseApiResponse, ListResponse, QueryParams } from '@repo/interfaces';
import { generateQueryStr } from '~/lib/utils/queryGenerator';
import {
  CreateSLADefinitionPayload,
  SLADefinition,
  UpdateSLADefinitionPayload,
} from '~/lib/interfaces/sla.interfaces';
import baseQueryWithReauth from '../../baseQueryWithReauth';

const getHeaders = () => ({
  'Content-Type': 'application/json',
});
export const slaApi = createApi({
  reducerPath: 'slaApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['allSLADefintions'],
  endpoints: (builder) => ({
    getSLADefinitions: builder.query<
      BaseApiResponse<ListResponse<SLADefinition>>,
      QueryParams
    >({
      query: (data) => ({
        url: generateQueryStr(`/SlaDefinitions?`, data),
        method: 'GET',
        headers: getHeaders(),
      }),
      providesTags: ['allSLADefintions'],
    }),
    createSLADefintion: builder.mutation<
      BaseApiResponse<SLADefinition>,
      CreateSLADefinitionPayload
    >({
      query: (body) => ({
        url: '/SlaDefinitions',
        method: 'POST',
        headers: getHeaders(),
        body,
      }),

      invalidatesTags: ['allSLADefintions'],
    }),
    updateSLADefintion: builder.mutation<
      BaseApiResponse<SLADefinition>,
      UpdateSLADefinitionPayload
    >({
      query: (body) => ({
        url: '/SlaDefinitions',
        method: 'PUT',
        headers: getHeaders(),
        body,
      }),

      invalidatesTags: ['allSLADefintions'],
    }),
    deleteSLADefintion: builder.mutation<
      void,
      { id: number; deletedBy: string }
    >({
      query: ({ id, ...body }) => ({
        url: `/SlaDefinitions/${id}`,
        method: 'DELETE',
        headers: getHeaders(),
        body,
      }),
      invalidatesTags: ['allSLADefintions'],
    }),
  }),
});

export const {
  useGetSLADefinitionsQuery,
  useCreateSLADefintionMutation,
  useUpdateSLADefintionMutation,
  useDeleteSLADefintionMutation,
} = slaApi;
