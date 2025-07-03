import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryWithReauth from '../baseQueryWithReauth';
import {
  BaseApiResponse,
  ListResponse,
  QueryParams,
  SearchQuery,
} from '@repo/interfaces';
import { generateQueryStr } from '~/lib/utils/queryGenerator';
import {
  Designation,
  designationPayload,
  DesignationType,
} from '~/lib/interfaces/designation.interfaces';

const getHeaders = () => ({
  'Content-Type': 'application/json',
});
export const designationApi = createApi({
  reducerPath: 'designationApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['allDesignations'],
  endpoints: (builder) => ({
    getAllDesignations: builder.query<
      BaseApiResponse<ListResponse<Designation>>,
      QueryParams
    >({
      query: (data) => ({
        url: generateQueryStr(`/UserDesignations?`, data),
        method: 'GET',
        headers: getHeaders(),
      }),
      providesTags: ['allDesignations'],
    }),
    createDesignation: builder.mutation<
      BaseApiResponse<Designation>,
      designationPayload
    >({
      query: (body) => ({
        url: `/Designations`,
        method: 'POST',
        headers: getHeaders(),
        body,
      }),
      invalidatesTags: ['allDesignations'],
    }),
    searchDesignation: builder.mutation<
      BaseApiResponse<ListResponse<Designation>>,
      SearchQuery
    >({
      query: (body) => ({
        url: `/Designations`,
        method: 'POST',
        headers: getHeaders(),
        body,
      }),
    }),
    getAllDesignationTypes: builder.query<
      BaseApiResponse<ListResponse<DesignationType>>,
      QueryParams
    >({
      query: (data) => ({
        url: generateQueryStr(`/DesignationTypes?`, data),
        method: 'GET',
        headers: getHeaders(),
      }),
      providesTags: [],
    }),
    searchDesignationType: builder.mutation<
      BaseApiResponse<ListResponse<Designation>>,
      SearchQuery
    >({
      query: (body) => ({
        url: `/DesignationTypes`,
        method: 'POST',
        headers: getHeaders(),
        body,
      }),
    }),
  }),
});

export const {
  useGetAllDesignationsQuery,
  useCreateDesignationMutation,
  useSearchDesignationMutation,
  useSearchDesignationTypeMutation,
  useGetAllDesignationTypesQuery,
} = designationApi;
