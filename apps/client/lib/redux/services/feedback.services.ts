import { createApi } from '@reduxjs/toolkit/query/react';
import { BaseApiResponse, ListResponse, QueryParams } from '@repo/interfaces';
import {
  CreateFeedbackPayload,
  Feedback,
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
  tagTypes: ['allFeedbacks', 'feedbackTypes'],
  endpoints: (builder) => ({
    getAllFeedbacks: builder.query<
      BaseApiResponse<ListResponse<Feedback>>,
      QueryParams
    >({
      query: (data) => ({
        url: generateQueryStr(`/Invent3Pro/Feedbacks?`, data),
        method: 'GET',
        headers: getHeaders(),
      }),
      providesTags: ['allFeedbacks'],
    }),

    createFeedback: builder.mutation<Feedback, CreateFeedbackPayload>({
      query: (body) => ({
        url: `/Feedbacks/CreateFeedback`,
        method: 'POST',
        headers: getHeaders(),
        body,
      }),
      invalidatesTags: ['allFeedbacks'],
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
  }),
});

export const { useGetAllFeedbacksQuery, useCreateFeedbackMutation,useGetAllFeedbackTypesQuery } =
  feedbackApi;
