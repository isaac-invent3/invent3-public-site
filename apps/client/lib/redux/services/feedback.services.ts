import { createApi } from '@reduxjs/toolkit/query/react';
import {
  BaseApiResponse,
  ListResponse,
  QueryParams,
  SearchQuery,
} from '@repo/interfaces';
import {
  CreateFeedbackPayload,
  CreateFeedbackWithAttachmentPayload,
  Feedback,
  UpdateFeedbackPayload,
} from '~/lib/interfaces/feedback.interfaces';
import { generateQueryStr } from '~/lib/utils/queryGenerator';
import baseQueryWithReauth from '../baseQueryWithReauth';

const getHeaders = () => ({
  'Content-Type': 'application/json',
});
export const feedbackApi = createApi({
  reducerPath: 'feedbackApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['allFeedbacks', 'feedbackTypes', 'feedbackAttachments'],
  endpoints: (builder) => ({
    getAllFeedbacks: builder.query<
      BaseApiResponse<ListResponse<Feedback>>,
      QueryParams
    >({
      query: (data) => ({
        url: generateQueryStr(`/Feedbacks?`, data),
        method: 'GET',
        headers: getHeaders(),
      }),
      providesTags: ['allFeedbacks'],
    }),

    createFeedback: builder.mutation<Feedback, CreateFeedbackPayload>({
      query: (body) => ({
        url: `/Feedbacks`,
        method: 'POST',
        headers: getHeaders(),
        body,
      }),
      invalidatesTags: ['allFeedbacks'],
    }),

    createFeedbackWithAttachment: builder.mutation<
      Feedback,
      CreateFeedbackWithAttachmentPayload
    >({
      query: (body) => ({
        url: `/Feedbacks/CreateFeedback`,
        method: 'POST',
        headers: getHeaders(),
        body,
      }),
      invalidatesTags: ['allFeedbacks'],
    }),

    updateFeedback: builder.mutation<
      BaseApiResponse<Feedback>,
      UpdateFeedbackPayload
    >({
      query: ({ feedbackId, data }) => ({
        url: `/Feedbacks/${feedbackId}`,
        method: 'PUT',
        headers: getHeaders(),
        body: data,
      }),
      invalidatesTags: ['allFeedbacks'],
    }),

    searchFeedbacks: builder.mutation<
      BaseApiResponse<ListResponse<Feedback>>,
      SearchQuery
    >({
      query: (body) => ({
        url: `/Feedbacks/Search`,
        method: 'POST',
        headers: getHeaders(),
        body,
      }),
    }),
  }),
});

export const {
  useGetAllFeedbacksQuery,
  useCreateFeedbackMutation,
  useSearchFeedbacksMutation,
  useCreateFeedbackWithAttachmentMutation,
  useUpdateFeedbackMutation,
} = feedbackApi;
