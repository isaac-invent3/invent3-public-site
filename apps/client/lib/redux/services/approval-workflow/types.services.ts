import { createApi } from '@reduxjs/toolkit/query/react';
import {
  BaseApiResponse,
  DeleteRecordQuery,
  ListResponse,
  QueryParams,
  SearchQuery,
} from '@repo/interfaces';
import {
  ApprovalWorkflowType,
  CreateApprovalWorkflowTypePayload,
} from '~/lib/interfaces/approvalWorkflow.interfaces';
import { generateQueryStr } from '~/lib/utils/queryGenerator';
import baseQueryWithReauth from '../../baseQueryWithReauth';

const getHeaders = () => ({
  'Content-Type': 'application/json',
});
export const approvalWorkflowTypeApi = createApi({
  reducerPath: 'approvalWorkflowTypeApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['allApprovalWorkflowTypes'],
  endpoints: (builder) => ({
    createApprovalWorkflowTypes: builder.mutation<
      BaseApiResponse<ApprovalWorkflowType>,
      CreateApprovalWorkflowTypePayload
    >({
      query: (body) => ({
        url: '/ApprovalTypes',
        method: 'POST',
        headers: getHeaders(),
        body,
      }),
      invalidatesTags: ['allApprovalWorkflowTypes'],
    }),

    getAllApprovalWorkflowTypes: builder.query<
      BaseApiResponse<ListResponse<ApprovalWorkflowType>>,
      { systemContextTypeId?: number } & QueryParams
    >({
      query: (data) => ({
        url: generateQueryStr(`/ApprovalTypes?`, data),
        method: 'GET',
        headers: getHeaders(),
      }),
      providesTags: ['allApprovalWorkflowTypes'],
    }),

    getApprovalWorkflowTypeById: builder.query<
      BaseApiResponse<ApprovalWorkflowType>,
      { id: number }
    >({
      query: ({ id }) => ({
        url: `/ApprovalTypes/${id}`,
        method: 'GET',
        headers: getHeaders(),
      }),
    }),

    updateApprovalWorkflowTypes: builder.mutation<
      BaseApiResponse<ApprovalWorkflowType>,
      { id: number; data: Partial<ApprovalWorkflowType> }
    >({
      query: ({ id, data }) => ({
        url: `/ApprovalTypes/${id}`,
        method: 'PUT',
        headers: getHeaders(),
        body: data,
      }),
      invalidatesTags: ['allApprovalWorkflowTypes'],
    }),

    deleteApprovalWorkflowTypes: builder.mutation<
      BaseApiResponse<void>,
      DeleteRecordQuery
    >({
      query: ({ id, ...body }) => ({
        url: `/ApprovalTypes/${id}`,
        method: 'DELETE',
        headers: getHeaders(),
        body,
      }),
      invalidatesTags: ['allApprovalWorkflowTypes'],
    }),

    searchApprovalWorkflowTypes: builder.mutation<
      BaseApiResponse<ListResponse<ApprovalWorkflowType>>,
      SearchQuery
    >({
      query: (body) => ({
        url: '/ApprovalTypes/Search',
        method: 'POST',
        headers: getHeaders(),
        body,
      }),
    }),
  }),
});

export const {
  useCreateApprovalWorkflowTypesMutation,
  useDeleteApprovalWorkflowTypesMutation,
  useGetAllApprovalWorkflowTypesQuery,
  useGetApprovalWorkflowTypeByIdQuery,
  useSearchApprovalWorkflowTypesMutation,
  useUpdateApprovalWorkflowTypesMutation,
} = approvalWorkflowTypeApi;
