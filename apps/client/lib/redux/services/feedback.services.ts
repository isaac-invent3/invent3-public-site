import { createApi } from '@reduxjs/toolkit/query/react';
import { BaseApiResponse, ListResponse, QueryParams, SearchQuery } from '@repo/interfaces';
import {
  CreateFeedbackAttachmentPayload,
  CreateFeedbackPayload,
  Feedback,
  FeedbackAttachment,
  FeedbackTypes,
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

    // Feedback Types
    getAllFeedbackTypes: builder.query<
      BaseApiResponse<ListResponse<FeedbackTypes>>,
      QueryParams
    >({
      query: (data) => ({
        url: generateQueryStr(`/FeedbackTypes?`, data),
        method: 'GET',
        headers: getHeaders(),
      }),
      providesTags: ['feedbackTypes'],
    }),

    // Feedback Attachments
    createFeedbackAttachment: builder.mutation<
      FeedbackAttachment,
      CreateFeedbackAttachmentPayload
    >({
      query: (body) => ({
        url: `/FeedbackAttachments`,
        method: 'POST',
        headers: getHeaders(),
        body,
      }),
      invalidatesTags: ['feedbackAttachments'],
    }),
  }),
});

export const {
  useGetAllFeedbacksQuery,
  useCreateFeedbackMutation,
  useGetAllFeedbackTypesQuery,
  useCreateFeedbackAttachmentMutation,
  useSearchFeedbacksMutation
} = feedbackApi;
