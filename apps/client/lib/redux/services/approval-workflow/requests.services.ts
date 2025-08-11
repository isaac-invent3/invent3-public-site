import { createApi } from '@reduxjs/toolkit/query/react';
import {
  BaseApiResponse,
  DeleteRecordQuery,
  ListResponse,
  QueryParams,
  SearchQuery,
} from '@repo/interfaces';
import {
  ApprovalWorkflowRequest,
  CreateApprovalWorkflowRequestPayload,
} from '~/lib/interfaces/approvalWorkflow.interfaces';
import { generateQueryStr } from '~/lib/utils/queryGenerator';
import baseQueryWithReauth from '../../baseQueryWithReauth';
import { APPROVAL_REQUEST_TYPES } from '~/lib/utils/constants';

const getHeaders = () => ({
  'Content-Type': 'application/json',
});
export const approvalWorkflowRequestApi = createApi({
  reducerPath: 'approvalWorkflowRequestApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['allApprovalWorkflowRequests'],
  endpoints: (builder) => ({
    createApprovalWorkflowRequest: builder.mutation<
      BaseApiResponse<ApprovalWorkflowRequest>,
      CreateApprovalWorkflowRequestPayload
    >({
      query: (body) => ({
        url: '/ApprovalRequests',
        method: 'POST',
        headers: getHeaders(),
        body,
      }),
      invalidatesTags: ['allApprovalWorkflowRequests'],
    }),

    getAllApprovalWorkflowRequests: builder.query<
      BaseApiResponse<ListResponse<ApprovalWorkflowRequest>>,
      { approvalTypeId?: number } & QueryParams
    >({
      query: (data) => ({
        url: generateQueryStr(`/ApprovalRequests?`, data),
        method: 'GET',
        headers: getHeaders(),
      }),
      providesTags: ['allApprovalWorkflowRequests'],
    }),

    getApprovalWorkflowRequestById: builder.query<
      BaseApiResponse<ApprovalWorkflowRequest>,
      { id: number }
    >({
      query: ({ id }) => ({
        url: `/ApprovalRequests/${id}`,
        method: 'GET',
        headers: getHeaders(),
      }),
    }),

    updateApprovalWorkflowRequest: builder.mutation<
      BaseApiResponse<ApprovalWorkflowRequest>,
      { id: number; data: Partial<ApprovalWorkflowRequest> }
    >({
      query: ({ id, data }) => ({
        url: `/ApprovalRequests/${id}`,
        method: 'PUT',
        headers: getHeaders(),
        body: data,
      }),
      invalidatesTags: ['allApprovalWorkflowRequests'],
    }),

    deleteApprovalWorkflowRequest: builder.mutation<
      BaseApiResponse<void>,
      DeleteRecordQuery
    >({
      query: ({ id, ...body }) => ({
        url: `/ApprovalRequests/${id}`,
        method: 'DELETE',
        headers: getHeaders(),
        body,
      }),
      invalidatesTags: ['allApprovalWorkflowRequests'],
    }),

    searchApprovalWorkflowRequest: builder.query<
      BaseApiResponse<ListResponse<ApprovalWorkflowRequest>>,
      SearchQuery
    >({
      query: (body) => ({
        url: '/ApprovalRequests/Search',
        method: 'POST',
        headers: getHeaders(),
        body,
      }),
      providesTags: ['allApprovalWorkflowRequests'],
    }),

    checkAssetHasOngoingApprovalRequest: builder.query<
      BaseApiResponse<number[]>,
      {
        assetIds: number[];
        requestType: (typeof APPROVAL_REQUEST_TYPES)[keyof typeof APPROVAL_REQUEST_TYPES];
      }
    >({
      query: (data) => ({
        url: generateQueryStr(
          `/Invent3Pro/CheckAssetHasOngoingApprovalRequest?`,
          data
        ),
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
  }),
});

export const {
  useCreateApprovalWorkflowRequestMutation,
  useDeleteApprovalWorkflowRequestMutation,
  useGetAllApprovalWorkflowRequestsQuery,
  useGetApprovalWorkflowRequestByIdQuery,
  useSearchApprovalWorkflowRequestQuery,
  useUpdateApprovalWorkflowRequestMutation,
  useCheckAssetHasOngoingApprovalRequestQuery,
} = approvalWorkflowRequestApi;
