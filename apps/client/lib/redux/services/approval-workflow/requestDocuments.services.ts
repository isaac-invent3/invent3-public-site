import { baseApi } from '~/lib/redux/services/baseApi.services';

import { BaseApiResponse, ListResponse, QueryParams } from '@repo/interfaces';
import { ApprovalWorkflowRequestDocument } from '~/lib/interfaces/approvalWorkflow.interfaces';
import { generateQueryStr } from '~/lib/utils/queryGenerator';

const getHeaders = () => ({
  'Content-Type': 'application/json',
});
export const approvalWorkflowRequestDocumentApi = baseApi.injectEndpoints({
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
