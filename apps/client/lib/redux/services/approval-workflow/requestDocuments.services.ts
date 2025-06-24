import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryWithReauth from '../../baseQueryWithReauth';
import { BaseApiResponse, ListResponse, QueryParams } from '@repo/interfaces';
import { ApprovalWorkflowRequestDocument } from '~/lib/interfaces/approvalWorkflow.interfaces';
import { generateQueryStr } from '~/lib/utils/queryGenerator';

const getHeaders = () => ({
  'Content-Type': 'application/json',
});
export const approvalWorkflowRequestDocumentApi = createApi({
  reducerPath: 'approvalWorkflowRequestDocumentApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: [],
  endpoints: (builder) => ({
    getAllDocumentsByApprovalRequestId: builder.query<
      BaseApiResponse<ListResponse<ApprovalWorkflowRequestDocument>>,
      QueryParams & { id: number }
    >({
      query: ({ id, ...data }) => ({
        url: generateQueryStr(
          `/ApprovalRequestDocuments/GetApprovalRequestDocuments/${id}?`,
          data
        ),

        method: 'GET',
        headers: getHeaders(),
      }),
      providesTags: [],
    }),
  }),
});

export const { useGetAllDocumentsByApprovalRequestIdQuery } =
  approvalWorkflowRequestDocumentApi;
