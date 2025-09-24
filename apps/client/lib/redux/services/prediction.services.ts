import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryWithReauth from '../baseQueryWithReauth';
import { BaseApiResponse } from '@repo/interfaces';
import { Prediction } from '~/lib/interfaces/prediction.interfaces';

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
  }),
});

export const { useGetAlertPredictionsByAlertIdQuery } = predictionApi;
