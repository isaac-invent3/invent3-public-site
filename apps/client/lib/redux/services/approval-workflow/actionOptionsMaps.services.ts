import { baseApi } from '~/lib/redux/services/baseApi.services';

import {
  BaseApiResponse,
  ListResponse,
  QueryParams,
  SearchQuery,
} from '@repo/interfaces';
import { ApprovalWorkflowActionOptionMap } from '~/lib/interfaces/approvalWorkflow.interfaces';
import { generateQueryStr } from '~/lib/utils/queryGenerator';

const getHeaders = () => ({
  'Content-Type': 'application/json',
});
export const approvalWorkflowActionOptionsMapApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ApprovalActionOptionMaps Endpoints
    createApprovalActionOptionMap: builder.mutation<
      BaseApiResponse<ApprovalWorkflowActionOptionMap>,
      Partial<ApprovalWorkflowActionOptionMap>
    >({
      query: (data) => ({
        url: '/ApprovalActionOptionMaps',
        method: 'POST',
        headers: getHeaders(),
        body: data,
      }),
      invalidatesTags: ['ApprovalWorkflowActionOptionMaps'],
    }),

    getAllApprovalActionOptionMaps: builder.query<
      BaseApiResponse<ListResponse<ApprovalWorkflowActionOptionMap>>,
      { approvalActionId: number } & QueryParams
    >({
      query: (data) => ({
        url: generateQueryStr(`/ApprovalActionOptionMaps?`, data),
        method: 'GET',
        headers: getHeaders(),
      }),
      providesTags: ['ApprovalWorkflowActionOptionMaps'],
    }),

    getApprovalActionOptionMapById: builder.query<
      BaseApiResponse<ApprovalWorkflowActionOptionMap>,
      string
    >({
      query: (id) => ({
        url: `/ApprovalActionOptionMaps/${id}`,
        method: 'GET',
        headers: getHeaders(),
      }),
    }),

    updateApprovalActionOptionMap: builder.mutation<
      BaseApiResponse<ApprovalWorkflowActionOptionMap>,
      { id: string; data: Partial<ApprovalWorkflowActionOptionMap> }
    >({
      query: ({ id, data }) => ({
        url: `/ApprovalActionOptionMaps/${id}`,
        method: 'PUT',
        headers: getHeaders(),
        body: data,
      }),
      invalidatesTags: ['ApprovalWorkflowActionOptionMaps'],
    }),

    deleteApprovalActionOptionMap: builder.mutation<
      BaseApiResponse<void>,
      string
    >({
      query: (id) => ({
        url: `/ApprovalActionOptionMaps/${id}`,
        method: 'DELETE',
        headers: getHeaders(),
      }),
      invalidatesTags: ['ApprovalWorkflowActionOptionMaps'],
    }),

    searchApprovalActionOptionMaps: builder.query<
      BaseApiResponse<ListResponse<ApprovalWorkflowActionOptionMap>>,
      SearchQuery
    >({
      query: (body) => ({
        url: '/ApprovalActionOptionMaps/Search',
        method: 'POST',
        headers: getHeaders(),
        body,
      }),
      providesTags: ['ApprovalWorkflowActionOptionMaps'],
    }),
  }),
});

export const {
  useCreateApprovalActionOptionMapMutation,
  useGetAllApprovalActionOptionMapsQuery,
  useGetApprovalActionOptionMapByIdQuery,
  useUpdateApprovalActionOptionMapMutation,
  useDeleteApprovalActionOptionMapMutation,
  useSearchApprovalActionOptionMapsQuery,
} = approvalWorkflowActionOptionsMapApi;
