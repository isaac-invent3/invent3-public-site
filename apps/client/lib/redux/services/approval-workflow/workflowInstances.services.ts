import { createApi } from '@reduxjs/toolkit/query/react';
import {
  BaseApiResponse,
  DeleteRecordQuery,
  ListResponse,
  QueryParams,
  SearchQuery,
} from '@repo/interfaces';
import {
  ApprovalWorkflowInstance,
  CreateApprovalWorkflowInstancePayload,
} from '~/lib/interfaces/approvalWorkflow.interfaces';
import { generateQueryStr } from '~/lib/utils/queryGenerator';
import baseQueryWithReauth from '../../baseQueryWithReauth';

export const getHeaders = () => ({
  'Content-Type': 'application/json',
});
export const approvalWorkflowInstanceApi = createApi({
  reducerPath: 'approvalWorkflowInstanceApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['allApprovalWorkflowInstances'],
  endpoints: (builder) => ({
    createApprovalWorkflowInstance: builder.mutation<
      BaseApiResponse<ApprovalWorkflowInstance>,
      CreateApprovalWorkflowInstancePayload
    >({
      query: (body) => ({
        url: '/ApprovalWorkFlowInstances',
        method: 'POST',
        headers: getHeaders(),
        body,
      }),
      invalidatesTags: ['allApprovalWorkflowInstances'],
    }),

    getAllApprovalWorkflowInstances: builder.query<
      BaseApiResponse<ListResponse<ApprovalWorkflowInstance>>,
      QueryParams
    >({
      query: (data) => ({
        url: generateQueryStr(`/ApprovalWorkFlowInstances?`, data),
        method: 'GET',
        headers: getHeaders(),
      }),
      providesTags: ['allApprovalWorkflowInstances'],
    }),

    getApprovalWorkflowInstanceById: builder.query<
      BaseApiResponse<ApprovalWorkflowInstance>,
      { id: number }
    >({
      query: ({ id }) => ({
        url: `ApprovalWorkFlowInstances/${id}`,
        method: 'GET',
        headers: getHeaders(),
      }),
    }),

    updateApprovalWorkflowInstances: builder.mutation<
      BaseApiResponse<ApprovalWorkflowInstance>,
      { id: number; data: Partial<ApprovalWorkflowInstance> }
    >({
      query: ({ id, data }) => ({
        url: `ApprovalWorkFlowInstances/${id}`,
        method: 'PUT',
        headers: getHeaders(),
        body: data,
      }),
      invalidatesTags: ['allApprovalWorkflowInstances'],
    }),

    deleteApprovalWorkflowInstance: builder.mutation<
      BaseApiResponse<void>,
      DeleteRecordQuery
    >({
      query: ({ id, ...body }) => ({
        url: `ApprovalWorkFlowInstances/${id}`,
        method: 'DELETE',
        headers: getHeaders(),
        body,
      }),
      invalidatesTags: ['allApprovalWorkflowInstances'],
    }),

    searchApprovalWorkflowInstances: builder.query<
      BaseApiResponse<ListResponse<ApprovalWorkflowInstance>>,
      SearchQuery
    >({
      query: (body) => ({
        url: 'ApprovalWorkFlowInstances/Search',
        method: 'POST',
        headers: getHeaders(),
        body,
      }),
      providesTags: ['allApprovalWorkflowInstances'],
    }),
  }),
});

export const {
  useCreateApprovalWorkflowInstanceMutation,
  useDeleteApprovalWorkflowInstanceMutation,
  useGetAllApprovalWorkflowInstancesQuery,
  useGetApprovalWorkflowInstanceByIdQuery,
  useUpdateApprovalWorkflowInstancesMutation,
  useSearchApprovalWorkflowInstancesQuery,
} = approvalWorkflowInstanceApi;
