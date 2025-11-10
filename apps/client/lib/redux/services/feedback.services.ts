import { baseApi } from '~/lib/redux/services/baseApi.services';
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
  FeedbackAttachment,
  ResolveFeedbackPayload,
  SingleFeedback,
  UpdateFeedbackPayload,
} from '~/lib/interfaces/feedback.interfaces';
import { generateQueryStr } from '~/lib/utils/queryGenerator';

const getHeaders = () => ({
  'Content-Type': 'application/json',
});
export const feedbackApi = baseApi.injectEndpoints({
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
    getAFeedback: builder.query<
      BaseApiResponse<SingleFeedback>,
      { id: number }
    >({
      query: ({ id }) => ({
        url: `/Feedbacks/GetFeedbackInfo/${id}`,
        method: 'GET',
        headers: getHeaders(),
      }),
    }),

    getAttachmentsByFeedBackId: builder.query<
      BaseApiResponse<ListResponse<FeedbackAttachment>>,
      QueryParams & { id: number }
    >({
      query: ({ id, ...data }) => ({
        url: generateQueryStr(`/Feedbacks/AllFeedbackAttachments/${id}?`, data),
        method: 'GET',
        headers: getHeaders(),
      }),
      providesTags: ['feedbackAttachments'],
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

    resolveFeedback: builder.mutation<
      BaseApiResponse<Feedback>,
      ResolveFeedbackPayload
    >({
      query: ({ id, ...data }) => ({
        url: generateQueryStr(
          `/Feedbacks/ChangeFeedbackResolution/${id}?`,
          data
        ),
        method: 'PUT',
        headers: getHeaders(),
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
  useResolveFeedbackMutation,
  useGetAttachmentsByFeedBackIdQuery,
  useGetAFeedbackQuery,
} = feedbackApi;
