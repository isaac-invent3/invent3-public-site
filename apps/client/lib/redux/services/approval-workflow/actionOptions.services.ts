import { baseApi } from '~/lib/redux/services/baseApi.services';

import {
  BaseApiResponse,
  ListResponse,
  QueryParams,
  SearchQuery,
} from '@repo/interfaces';
import { ApprovalWorkflowActionOption } from '~/lib/interfaces/approvalWorkflow.interfaces';
import { generateQueryStr } from '~/lib/utils/queryGenerator';

const getHeaders = () => ({
  'Content-Type': 'application/json',
});
export const approvalWorkflowActionOptionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createApprovalActionOption: builder.mutation<
      BaseApiResponse<ApprovalWorkflowActionOption>,
      Partial<ApprovalWorkflowActionOption>
    >({
      query: (data) => ({
        url: '/ApprovalActionOptions',
        method: 'POST',
        headers: getHeaders(),
        body: data,
      }),
      invalidatesTags: ['ApprovalActionOptions'],
    }),

    getAllApprovalActionOptions: builder.query<
      BaseApiResponse<ListResponse<ApprovalWorkflowActionOption>>,
      QueryParams
    >({
      query: (data) => ({
        url: generateQueryStr(`/ApprovalActionOptions?`, data),

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
        url: `/ApprovalActionOptions/${id}`,
        method: 'GET',
        headers: getHeaders(),
      }),
    }),

    updateApprovalActionOption: builder.mutation<
      BaseApiResponse<ApprovalWorkflowActionOption>,
      { id: string; data: Partial<ApprovalWorkflowActionOption> }
    >({
      query: ({ id, data }) => ({
        url: `/ApprovalActionOptions/${id}`,
        method: 'PUT',
        headers: getHeaders(),
        body: data,
      }),
      invalidatesTags: ['ApprovalActionOptions'],
    }),

    deleteApprovalActionOption: builder.mutation<BaseApiResponse<void>, string>(
      {
        query: (id) => ({
          url: `/ApprovalActionOptions/${id}`,
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
        url: '/ApprovalActionOptions/Search',
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
