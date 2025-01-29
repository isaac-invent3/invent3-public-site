import { createApi } from '@reduxjs/toolkit/query/react';
import {
  BaseApiResponse,
  DeleteRecordQuery,
  ListResponse,
  QueryParams,
  SearchQuery,
} from '@repo/interfaces';
import {
  ApprovalWorkflowStatus,
  CreateApprovalWorkflowTypePayload,
} from '~/lib/interfaces/approvalWorkflow.interfaces';
import { generateQueryStr } from '~/lib/utils/queryGenerator';
import baseQueryWithReauth from '../../baseQueryWithReauth';

const getHeaders = () => ({
  'Content-Type': 'application/json',
});
export const approvalWorkflowStatusApi = createApi({
  reducerPath: 'approvalWorkflowStatusApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['allApprovalWorkflowStatuses'],
  endpoints: (builder) => ({
    createApprovalWorkflowStatus: builder.mutation<
      BaseApiResponse<ApprovalWorkflowStatus>,
      CreateApprovalWorkflowTypePayload
    >({
      query: (body) => ({
        url: '/ApprovalStatuses',
        method: 'POST',
        headers: getHeaders(),
        body,
      }),
      invalidatesTags: ['allApprovalWorkflowStatuses'],
    }),

    getAllApprovalWorkflowStatus: builder.query<
      BaseApiResponse<ListResponse<ApprovalWorkflowStatus>>,
      QueryParams
    >({
      query: (data) => ({
        url: generateQueryStr(`/ApprovalStatuses?`, data),
        method: 'GET',
        headers: getHeaders(),
      }),
      providesTags: ['allApprovalWorkflowStatuses'],
    }),

    getApprovalWorkflowStatusById: builder.query<
      BaseApiResponse<ApprovalWorkflowStatus>,
      { id: number }
    >({
      query: ({ id }) => ({
        url: `/ApprovalStatuses/${id}`,
        method: 'GET',
        headers: getHeaders(),
      }),
    }),

    updateApprovalWorkflowStatus: builder.mutation<
      BaseApiResponse<ApprovalWorkflowStatus>,
      { id: number; data: Partial<ApprovalWorkflowStatus> }
    >({
      query: ({ id, data }) => ({
        url: `/ApprovalStatuses/${id}`,
        method: 'PUT',
        headers: getHeaders(),
        body: data,
      }),
      invalidatesTags: ['allApprovalWorkflowStatuses'],
    }),

    deleteApprovalWorkflowStatus: builder.mutation<
      BaseApiResponse<void>,
      DeleteRecordQuery
    >({
      query: ({ id, ...body }) => ({
        url: `/ApprovalStatuses/${id}`,
        method: 'DELETE',
        headers: getHeaders(),
        body,
      }),
      invalidatesTags: ['allApprovalWorkflowStatuses'],
    }),

    searchApprovalWorkflowStatus: builder.query<
      BaseApiResponse<ListResponse<ApprovalWorkflowStatus>>,
      SearchQuery
    >({
      query: (body) => ({
        url: '/ApprovalStatuses/Search',
        method: 'POST',
        headers: getHeaders(),
        body,
      }),
      providesTags: ['allApprovalWorkflowStatuses'],
    }),
  }),
});

export const {
  useCreateApprovalWorkflowStatusMutation,
  useDeleteApprovalWorkflowStatusMutation,
  useGetAllApprovalWorkflowStatusQuery,
  useGetApprovalWorkflowStatusByIdQuery,
  useUpdateApprovalWorkflowStatusMutation,
  useSearchApprovalWorkflowStatusQuery,
} = approvalWorkflowStatusApi;
