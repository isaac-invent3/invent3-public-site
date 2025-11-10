import { baseApi } from '~/lib/redux/services/baseApi.services';

import {
  BaseApiResponse,
  DeleteRecordQuery,
  ListResponse,
  QueryParams,
  SearchQuery,
} from '@repo/interfaces';
import {
  ApprovalWorkflowRequirementType,
  CreateApprovalWorkflowTypePayload,
} from '~/lib/interfaces/approvalWorkflow.interfaces';
import { generateQueryStr } from '~/lib/utils/queryGenerator';

const getHeaders = () => ({
  'Content-Type': 'application/json',
});
export const approvalWorkflowRequirementTypeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createApprovalWorkflowRequirementTypes: builder.mutation<
      BaseApiResponse<ApprovalWorkflowRequirementType>,
      CreateApprovalWorkflowTypePayload
    >({
      query: (body) => ({
        url: '/ApprovalRequirementTypes',
        method: 'POST',
        headers: getHeaders(),
        body,
      }),
      invalidatesTags: ['allApprovalWorkflowRequirementTypes'],
    }),

    getAllApprovalWorkflowRequirementTypes: builder.query<
      BaseApiResponse<ListResponse<ApprovalWorkflowRequirementType>>,
      QueryParams
    >({
      query: (data) => ({
        url: generateQueryStr(`/ApprovalRequirementTypes?`, data),
        method: 'GET',
        headers: getHeaders(),
      }),
      providesTags: ['allApprovalWorkflowRequirementTypes'],
    }),

    getApprovalWorkflowRequirementTypeById: builder.query<
      BaseApiResponse<ApprovalWorkflowRequirementType>,
      { id: number }
    >({
      query: ({ id }) => ({
        url: `/ApprovalRequirementTypes/${id}`,
        method: 'GET',
        headers: getHeaders(),
      }),
    }),

    updateApprovalWorkflowRequirementTypes: builder.mutation<
      BaseApiResponse<ApprovalWorkflowRequirementType>,
      { id: number; data: Partial<ApprovalWorkflowRequirementType> }
    >({
      query: ({ id, data }) => ({
        url: `/ApprovalRequirementTypes/${id}`,
        method: 'PUT',
        headers: getHeaders(),
        body: data,
      }),
      invalidatesTags: ['allApprovalWorkflowRequirementTypes'],
    }),

    deleteApprovalWorkflowRequirementTypes: builder.mutation<
      BaseApiResponse<void>,
      DeleteRecordQuery
    >({
      query: ({ id, ...body }) => ({
        url: `/ApprovalRequirementTypes/${id}`,
        method: 'DELETE',
        headers: getHeaders(),
        body,
      }),
      invalidatesTags: ['allApprovalWorkflowRequirementTypes'],
    }),

    searchApprovalWorkflowRequirementTypes: builder.query<
      BaseApiResponse<ListResponse<ApprovalWorkflowRequirementType>>,
      SearchQuery
    >({
      query: (body) => ({
        url: '/ApprovalRequirementTypes/Search',
        method: 'POST',
        headers: getHeaders(),
        body,
      }),
      providesTags: ['allApprovalWorkflowRequirementTypes'],
    }),
  }),
});

export const {
  useCreateApprovalWorkflowRequirementTypesMutation,
  useDeleteApprovalWorkflowRequirementTypesMutation,
  useGetAllApprovalWorkflowRequirementTypesQuery,
  useGetApprovalWorkflowRequirementTypeByIdQuery,
  useUpdateApprovalWorkflowRequirementTypesMutation,
  useSearchApprovalWorkflowRequirementTypesQuery,
} = approvalWorkflowRequirementTypeApi;
