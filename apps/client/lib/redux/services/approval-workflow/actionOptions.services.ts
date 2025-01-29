import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryWithReauth from '../../baseQueryWithReauth';
import { BaseApiResponse, ListResponse, SearchQuery } from '@repo/interfaces';
import { ApprovalWorkflowActionOption } from '~/lib/interfaces/approvalWorkflow.interfaces';

const getHeaders = () => ({
  'Content-Type': 'application/json',
});
export const approvalWorkflowActionOptionApi = createApi({
  reducerPath: 'approvalWorkflowActionOptionApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    'ApprovalActionOptionMaps',
    'ApprovalActionOptions',
    'ApprovalActions',
  ],
  endpoints: (builder) => ({
    createApprovalActionOption: builder.mutation<
      BaseApiResponse<ApprovalWorkflowActionOption>,
      Partial<ApprovalWorkflowActionOption>
    >({
      query: (data) => ({
        url: '/api/ApprovalActionOptions',
        method: 'POST',
        headers: getHeaders(),
        body: data,
      }),
      invalidatesTags: ['ApprovalActionOptions'],
    }),

    getAllApprovalActionOptions: builder.query<
      BaseApiResponse<ListResponse<ApprovalWorkflowActionOption>>,
      void
    >({
      query: () => ({
        url: '/api/ApprovalActionOptions',
        method: 'GET',
        headers: getHeaders(),
      }),
      providesTags: ['ApprovalActionOptions'],
    }),

    getApprovalActionOptionById: builder.query<
      BaseApiResponse<ApprovalWorkflowActionOption>,
      string
    >({
      query: (id) => ({
        url: `/api/ApprovalActionOptions/${id}`,
        method: 'GET',
        headers: getHeaders(),
      }),
    }),

    updateApprovalActionOption: builder.mutation<
      BaseApiResponse<ApprovalWorkflowActionOption>,
      { id: string; data: Partial<ApprovalWorkflowActionOption> }
    >({
      query: ({ id, data }) => ({
        url: `/api/ApprovalActionOptions/${id}`,
        method: 'PUT',
        headers: getHeaders(),
        body: data,
      }),
      invalidatesTags: ['ApprovalActionOptions'],
    }),

    deleteApprovalActionOption: builder.mutation<BaseApiResponse<void>, string>(
      {
        query: (id) => ({
          url: `/api/ApprovalActionOptions/${id}`,
          method: 'DELETE',
          headers: getHeaders(),
        }),
        invalidatesTags: ['ApprovalActionOptions'],
      }
    ),

    searchApprovalActionOptions: builder.query<
      BaseApiResponse<ListResponse<ApprovalWorkflowActionOption>>,
      SearchQuery
    >({
      query: (params) => ({
        url: '/api/ApprovalActionOptions/Search',
        method: 'POST',
        headers: getHeaders(),
        body: params,
      }),
      providesTags: ['ApprovalActionOptions'],
    }),
  }),
});

export const {
  useCreateApprovalActionOptionMutation,
  useGetAllApprovalActionOptionsQuery,
  useGetApprovalActionOptionByIdQuery,
  useUpdateApprovalActionOptionMutation,
  useDeleteApprovalActionOptionMutation,
  useSearchApprovalActionOptionsQuery,
} = approvalWorkflowActionOptionApi;
