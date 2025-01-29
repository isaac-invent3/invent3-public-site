import { createApi } from '@reduxjs/toolkit/query/react';
import {
  BaseApiResponse,
  DeleteRecordQuery,
  ListResponse,
  SearchQuery,
} from '@repo/interfaces';
import {
  ApprovalWorkflowPartyInstance,
  CreateApprovalPartyInstancePayload,
  GetApprovalWorkflowPartyInstances,
} from '~/lib/interfaces/approvalWorkflow.interfaces';
import { generateQueryStr } from '~/lib/utils/queryGenerator';
import baseQueryWithReauth from '../../baseQueryWithReauth';

const getHeaders = () => ({
  'Content-Type': 'application/json',
});
export const approvalWorkflowPartyInstanceApi = createApi({
  reducerPath: 'approvalWorkflowPartyInstanceApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['allApprovalWorkflowPartyInstances'],
  endpoints: (builder) => ({
    createApprovalWorkflowPartyInstances: builder.mutation<
      BaseApiResponse<ApprovalWorkflowPartyInstance>,
      CreateApprovalPartyInstancePayload
    >({
      query: (body) => ({
        url: '/ApprovalWorkFlowPartiesInstances',
        method: 'POST',
        headers: getHeaders(),
        body,
      }),
      invalidatesTags: ['allApprovalWorkflowPartyInstances'],
    }),

    getAllApprovalWorkflowPartyInstances: builder.query<
      BaseApiResponse<ListResponse<ApprovalWorkflowPartyInstance>>,
      GetApprovalWorkflowPartyInstances
    >({
      query: (data) => ({
        url: generateQueryStr(`/ApprovalWorkFlowPartiesInstances?`, data),
        method: 'GET',
        headers: getHeaders(),
      }),
      providesTags: ['allApprovalWorkflowPartyInstances'],
    }),

    getApprovalWorkflowPartyInstancesById: builder.query<
      BaseApiResponse<ApprovalWorkflowPartyInstance>,
      { id: number }
    >({
      query: ({ id }) => ({
        url: `/ApprovalWorkFlowPartiesInstances/${id}`,
        method: 'GET',
        headers: getHeaders(),
      }),
    }),

    updateApprovalWorkflowPartyInstances: builder.mutation<
      BaseApiResponse<ApprovalWorkflowPartyInstance>,
      { id: number; data: Partial<ApprovalWorkflowPartyInstance> }
    >({
      query: ({ id, data }) => ({
        url: `/ApprovalWorkFlowPartiesInstances/${id}`,
        method: 'PUT',
        headers: getHeaders(),
        body: data,
      }),
      invalidatesTags: ['allApprovalWorkflowPartyInstances'],
    }),

    deleteApprovalWorkflowPartyInstances: builder.mutation<
      BaseApiResponse<void>,
      DeleteRecordQuery
    >({
      query: ({ id, ...body }) => ({
        url: `/ApprovalWorkFlowPartiesInstances/${id}`,
        method: 'DELETE',
        headers: getHeaders(),
        body,
      }),
      invalidatesTags: ['allApprovalWorkflowPartyInstances'],
    }),

    searchApprovalWorkflowPartyInstances: builder.query<
      BaseApiResponse<ListResponse<ApprovalWorkflowPartyInstance>>,
      SearchQuery
    >({
      query: (body) => ({
        url: '/ApprovalWorkFlowPartiesInstances/Search',
        method: 'POST',
        headers: getHeaders(),
        body,
      }),
      providesTags: ['allApprovalWorkflowPartyInstances'],
    }),
  }),
});

export const {
  useCreateApprovalWorkflowPartyInstancesMutation,
  useDeleteApprovalWorkflowPartyInstancesMutation,
  useGetAllApprovalWorkflowPartyInstancesQuery,
  useGetApprovalWorkflowPartyInstancesByIdQuery,
  useUpdateApprovalWorkflowPartyInstancesMutation,
  useSearchApprovalWorkflowPartyInstancesQuery,
} = approvalWorkflowPartyInstanceApi;
