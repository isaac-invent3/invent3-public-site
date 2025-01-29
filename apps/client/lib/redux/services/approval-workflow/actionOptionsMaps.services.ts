import { createApi } from '@reduxjs/toolkit/query/react';
import { BaseApiResponse, ListResponse, SearchQuery } from '@repo/interfaces';
import baseQueryWithReauth from '../../baseQueryWithReauth';
import { ApprovalWorkflowActionOptionMap } from '~/lib/interfaces/approvalWorkflow.interfaces';

const getHeaders = () => ({
  'Content-Type': 'application/json',
});
export const approvalWorkflowActionOptionsMapApi = createApi({
  reducerPath: 'approvalWorkflowActionOptionsMapApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['ApprovalWorkflowActionOptionMaps'],
  endpoints: (builder) => ({
    // ApprovalActionOptionMaps Endpoints
    createApprovalActionOptionMap: builder.mutation<
      BaseApiResponse<ApprovalWorkflowActionOptionMap>,
      Partial<ApprovalWorkflowActionOptionMap>
    >({
      query: (data) => ({
        url: '/api/ApprovalActionOptionMaps',
        method: 'POST',
        headers: getHeaders(),
        body: data,
      }),
      invalidatesTags: ['ApprovalWorkflowActionOptionMaps'],
    }),

    getAllApprovalActionOptionMaps: builder.query<
      BaseApiResponse<ListResponse<ApprovalWorkflowActionOptionMap>>,
      void
    >({
      query: () => ({
        url: '/api/ApprovalActionOptionMaps',
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
        url: `/api/ApprovalActionOptionMaps/${id}`,
        method: 'GET',
        headers: getHeaders(),
      }),
    }),

    updateApprovalActionOptionMap: builder.mutation<
      BaseApiResponse<ApprovalWorkflowActionOptionMap>,
      { id: string; data: Partial<ApprovalWorkflowActionOptionMap> }
    >({
      query: ({ id, data }) => ({
        url: `/api/ApprovalActionOptionMaps/${id}`,
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
        url: `/api/ApprovalActionOptionMaps/${id}`,
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
