import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryWithReauth from '../../baseQueryWithReauth';
import { ApprovalWorkflowAction } from '~/lib/interfaces/approvalWorkflow.interfaces';
import { BaseApiResponse, ListResponse, SearchQuery } from '@repo/interfaces';

const getHeaders = () => ({
  'Content-Type': 'application/json',
});
export const approvalWorkflowActionApi = createApi({
  reducerPath: 'approvalWorkflowActionApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['ApprovalWorkflowAction'],
  endpoints: (builder) => ({
    createApprovalAction: builder.mutation<
      BaseApiResponse<ApprovalWorkflowAction>,
      Partial<ApprovalWorkflowAction>
    >({
      query: (data) => ({
        url: '/ApprovalActions',
        method: 'POST',
        headers: getHeaders(),
        body: data,
      }),
      invalidatesTags: ['ApprovalWorkflowAction'],
    }),

    getAllApprovalActions: builder.query<
      BaseApiResponse<ListResponse<ApprovalWorkflowAction>>,
      void
    >({
      query: () => ({
        url: '/ApprovalActions',
        method: 'GET',
        headers: getHeaders(),
      }),
      providesTags: ['ApprovalWorkflowAction'],
    }),

    getApprovalActionById: builder.query<
      BaseApiResponse<ApprovalWorkflowAction>,
      string
    >({
      query: (id) => ({
        url: `/ApprovalActions/${id}`,
        method: 'GET',
        headers: getHeaders(),
      }),
    }),

    updateApprovalAction: builder.mutation<
      BaseApiResponse<ApprovalWorkflowAction>,
      { id: string; data: Partial<ApprovalWorkflowAction> }
    >({
      query: ({ id, data }) => ({
        url: `/ApprovalActions/${id}`,
        method: 'PUT',
        headers: getHeaders(),
        body: data,
      }),
      invalidatesTags: ['ApprovalWorkflowAction'],
    }),

    deleteApprovalAction: builder.mutation<BaseApiResponse<void>, string>({
      query: (id) => ({
        url: `/ApprovalActions/${id}`,
        method: 'DELETE',
        headers: getHeaders(),
      }),
      invalidatesTags: ['ApprovalWorkflowAction'],
    }),

    searchApprovalActions: builder.query<
      BaseApiResponse<ListResponse<ApprovalWorkflowAction>>,
      SearchQuery
    >({
      query: (params) => ({
        url: '/ApprovalActions/Search',
        method: 'POST',
        headers: getHeaders(),
        body: params,
      }),
      providesTags: ['ApprovalWorkflowAction'],
    }),
  }),
});

export const {
  useCreateApprovalActionMutation,
  useGetAllApprovalActionsQuery,
  useGetApprovalActionByIdQuery,
  useUpdateApprovalActionMutation,
  useDeleteApprovalActionMutation,
  useSearchApprovalActionsQuery,
} = approvalWorkflowActionApi;
