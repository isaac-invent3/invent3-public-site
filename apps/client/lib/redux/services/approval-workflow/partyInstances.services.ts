import { createApi } from '@reduxjs/toolkit/query/react';
import {
  BaseApiResponse,
  DeleteRecordQuery,
  ListResponse,
  SearchQuery,
} from '@repo/interfaces';
import {
  ApprovalWorkflowPartyInstance,
  CreateApprovalWorkflowPartyInstancePayload,
  GetApprovalWorkflowPartyInstances,
  UpdateApprovalWorkflowPartyInstancePayload,
  UpdateSubsequentPartyInstancesLevelNumbersPayload,
} from '~/lib/interfaces/approvalWorkflow.interfaces';
import { generateQueryStr } from '~/lib/utils/queryGenerator';
import baseQueryWithReauth from '../../baseQueryWithReauth';

const getHeaders = () => ({
  'Content-Type': 'application/json',
});
export const approvalWorkflowPartyInstanceApi = createApi({
  reducerPath: 'approvalWorkflowPartyInstanceApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    'allApprovalWorkflowPartyInstances',
    'singleApprovalWorkflowPartyInstance',
  ],
  endpoints: (builder) => ({
    createApprovalWorkflowPartyInstances: builder.mutation<
      BaseApiResponse<ApprovalWorkflowPartyInstance>,
      CreateApprovalWorkflowPartyInstancePayload
    >({
      query: ({ overlap, ...body }) => ({
        url: generateQueryStr(`/ApprovalWorkFlowPartiesInstances?`, {
          overlap,
        }),
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
      providesTags: ['singleApprovalWorkflowPartyInstance'],
    }),

    updateApprovalWorkflowPartyInstances: builder.mutation<
      BaseApiResponse<ApprovalWorkflowPartyInstance>,
      {
        id: number;
        overlap: boolean;
        data: Partial<UpdateApprovalWorkflowPartyInstancePayload>;
      }
    >({
      query: ({ id, overlap, data }) => ({
        url: generateQueryStr(`/ApprovalWorkFlowPartiesInstances/${id}?`, {
          overlap,
        }),
        method: 'PUT',
        headers: getHeaders(),
        body: data,
      }),
      invalidatesTags: ['allApprovalWorkflowPartyInstances'],
    }),

    updateSubsequentPartyInstancesLevelNumbers: builder.mutation<
      BaseApiResponse<ApprovalWorkflowPartyInstance>,
      UpdateSubsequentPartyInstancesLevelNumbersPayload
    >({
      query: ({ approvalWorkFlowInstanceId, ...data }) => ({
        url: generateQueryStr(
          `/ApprovalWorkFlowPartiesInstances/UpdateSubsequentPartyInstancesLevelNumbers/${approvalWorkFlowInstanceId}?`,
          data
        ),
        method: 'POST',
        headers: getHeaders(),
      }),
      invalidatesTags: ['allApprovalWorkflowPartyInstances'],
    }),

    deleteApprovalWorkflowPartyInstance: builder.mutation<
      BaseApiResponse<void>,
      DeleteRecordQuery
    >({
      query: ({ id, ...body }) => ({
        url: generateQueryStr(`/ApprovalWorkFlowPartiesInstances/${id}?`, {
          overlap: false,
        }),

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

    updateApprovalRequestPartyInstanceStatus: builder.mutation<
      BaseApiResponse<void>,
      {
        partyInstanceId: number;
        approvalRequestId: number;
        newStatus: boolean;
        lastModifiedBy: string;
      }
    >({
      query: ({ partyInstanceId, ...body }) => ({
        url: generateQueryStr(
          `/ApprovalRequests/UpdateApprovalRequestPartyInstanceStatus/${partyInstanceId}?`,
          body
        ),
        method: 'PUT',
        headers: getHeaders(),
      }),
      invalidatesTags: [
        'singleApprovalWorkflowPartyInstance',
        'allApprovalWorkflowPartyInstances',
      ],
    }),
  }),
});

export const {
  useCreateApprovalWorkflowPartyInstancesMutation,
  useDeleteApprovalWorkflowPartyInstanceMutation,
  useGetAllApprovalWorkflowPartyInstancesQuery,
  useGetApprovalWorkflowPartyInstancesByIdQuery,
  useUpdateApprovalWorkflowPartyInstancesMutation,
  useSearchApprovalWorkflowPartyInstancesQuery,
  useUpdateSubsequentPartyInstancesLevelNumbersMutation,
  useUpdateApprovalRequestPartyInstanceStatusMutation,
} = approvalWorkflowPartyInstanceApi;
