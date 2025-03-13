import { createApi } from '@reduxjs/toolkit/query/react';
import { BaseApiResponse, ListResponse, QueryParams } from '@repo/interfaces';
import { Feedback } from '~/lib/interfaces/feedback.interfaces';
import { generateQueryStr } from '~/lib/utils/queryGenerator';
import baseQueryWithReauth from '../baseQueryWithReauth';

const getHeaders = () => ({
  'Content-Type': 'application/json',
});
export const feedbackApi = createApi({
  reducerPath: 'feedbackApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['allFeedbacks'],
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
  }),
});

export const { useGetAllFeedbacksQuery } = feedbackApi;
