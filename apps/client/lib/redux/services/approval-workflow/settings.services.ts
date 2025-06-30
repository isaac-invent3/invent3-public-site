import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryWithReauth from '../../baseQueryWithReauth';
import {
  BaseApiResponse,
  DeleteRecordQuery,
  ListResponse,
  QueryParams,
} from '@repo/interfaces';
import {
  ApprovalWorkflow,
  ApprovalWorkflowParty,
  CreateApprovalWorkflowPayload,
  UpdateApprovalWorkflowPayload,
} from '~/lib/interfaces/approvalWorkflow.interfaces';
import { generateQueryStr } from '~/lib/utils/queryGenerator';

const getHeaders = () => ({
  'Content-Type': 'application/json',
});
export const approvalWorkflowSettingsApi = createApi({
  reducerPath: 'approvalWorkflowSettingsApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['allApprovalWorkflow'],
  endpoints: (builder) => ({
    getAllApprovalWorkflow: builder.query<
      BaseApiResponse<ListResponse<ApprovalWorkflow>>,
      QueryParams
    >({
      query: (data) => ({
        url: generateQueryStr(`/ApprovalWorkFlows?`, data),
        method: 'GET',
        headers: getHeaders(),
      }),
      providesTags: ['allApprovalWorkflow'],
    }),
    getAllApprovalWorkflowParty: builder.query<
      BaseApiResponse<ListResponse<ApprovalWorkflowParty>>,
      QueryParams & { approvalWorkFlowId?: number }
    >({
      query: (data) => ({
        url: generateQueryStr(`/ApprovalWorkFlowParties?`, data),
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    createApprovalWorkflow: builder.mutation<
      BaseApiResponse<ApprovalWorkflow>,
      CreateApprovalWorkflowPayload
    >({
      query: (data) => ({
        url: '/Invent3Pro/CreateApprovalWorkFlowAndParties',
        method: 'POST',
        headers: getHeaders(),
        body: data,
      }),
      invalidatesTags: ['allApprovalWorkflow'],
    }),
    updateApprovalWorkflow: builder.mutation<
      BaseApiResponse<ApprovalWorkflow>,
      UpdateApprovalWorkflowPayload
    >({
      query: (data) => ({
        url: '/Invent3Pro/UpdateApprovalWorkFlowAndParties',
        method: 'PUT',
        headers: getHeaders(),
        body: data,
      }),
      invalidatesTags: ['allApprovalWorkflow'],
    }),
    deleteApprovalWorkflow: builder.mutation<
      BaseApiResponse<void>,
      DeleteRecordQuery
    >({
      query: ({ id, ...body }) => ({
        url: `/ApprovalWorkFlows/${id}`,
        method: 'DELETE',
        headers: getHeaders(),
        body,
      }),
      invalidatesTags: ['allApprovalWorkflow'],
    }),
  }),
});

export const {
  useGetAllApprovalWorkflowQuery,
  useCreateApprovalWorkflowMutation,
  useUpdateApprovalWorkflowMutation,
  useDeleteApprovalWorkflowMutation,
  useGetAllApprovalWorkflowPartyQuery,
} = approvalWorkflowSettingsApi;
