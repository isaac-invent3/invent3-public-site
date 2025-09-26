import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryWithReauth from '../baseQueryWithReauth';
import { BaseApiResponse, ListResponse } from '@repo/interfaces';
import { Prediction } from '~/lib/interfaces/prediction.interfaces';
import { QueryParams } from '@prismicio/client';
import { generateQueryStr } from '~/lib/utils/queryGenerator';

const getHeaders = () => ({
  'Content-Type': 'application/json',
});
export const predictionApi = createApi({
  reducerPath: 'predictionApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: [],
  endpoints: (builder) => ({
    getAlertPredictionsByAlertId: builder.query<
      BaseApiResponse<Prediction>,
      { alertId: number }
    >({
      query: ({ alertId }) => ({
        url: `/Predictions/GetAlertPredictions/${alertId}`,
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    getRecentPredictionAlert: builder.query<
      BaseApiResponse<ListResponse<Prediction>>,
      QueryParams
    >({
      query: (data) => ({
        url: generateQueryStr(`/Predictions/GetRecentPredictionAlerts?`, data),
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    generateWorkOrderFromPrediction: builder.mutation<
      BaseApiResponse<Prediction>,
      { alertId: number }
    >({
      query: ({ alertId }) => ({
        url: `/Predictions/GenerateWorkOrderFromPrediction/${alertId}`,
        method: 'POST',
        headers: getHeaders(),
      }),
    }),
    acknowledgePredictions: builder.mutation<
      BaseApiResponse<Prediction>,
      { alertId: number; acknowlegedBy: string }
    >({
      query: ({ alertId, acknowlegedBy }) => ({
        url: generateQueryStr(
          `/Predictions/AcknowledgePrediction/${alertId}?`,
          { acknowlegedBy }
        ),
        method: 'PUT',
        headers: getHeaders(),
      }),
    }),
  }),
});

export const {
  useGetAlertPredictionsByAlertIdQuery,
  useAcknowledgePredictionsMutation,
  useGenerateWorkOrderFromPredictionMutation,
  useGetRecentPredictionAlertQuery,
} = predictionApi;
