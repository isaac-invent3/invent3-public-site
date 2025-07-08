import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryWithReauth from '../../baseQueryWithReauth';
import { BaseApiResponse, ListResponse, QueryParams } from '@repo/interfaces';
import { ApprovalWorkflowComment } from '~/lib/interfaces/approvalWorkflow.interfaces';
import { generateQueryStr } from '~/lib/utils/queryGenerator';

const getHeaders = () => ({
  'Content-Type': 'application/json',
});
export const approvalWorkflowRequestCommentApi = createApi({
  reducerPath: 'approvalWorkflowRequestCommentApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['allApprovalRequestComments'],
  endpoints: (builder) => ({
    getAllCommentsByApprovalRequestId: builder.query<
      BaseApiResponse<ListResponse<ApprovalWorkflowComment>>,
      QueryParams & { approvalRequestId: number }
    >({
      query: ({ approvalRequestId, ...data }) => ({
        url: generateQueryStr(
          `/ApprovalRequestComments/GetApprovalRequestTopComments/${approvalRequestId}?`,
          data
        ),

        method: 'GET',
        headers: getHeaders(),
      }),
      providesTags: ['allApprovalRequestComments'],
    }),
    postComment: builder.mutation<
      BaseApiResponse<void>,
      {
        authorId: number;
        comment: string;
        parentCommentId?: number | null;
        approvalRequestId: number;
        createdBy: string;
      }
    >({
      query: (body) => ({
        url: '/ApprovalRequestComments',
        method: 'POST',
        headers: getHeaders(),
        body,
      }),
      invalidatesTags: ['allApprovalRequestComments'],
    }),
  }),
});

export const {
  useGetAllCommentsByApprovalRequestIdQuery,
  usePostCommentMutation,
} = approvalWorkflowRequestCommentApi;
