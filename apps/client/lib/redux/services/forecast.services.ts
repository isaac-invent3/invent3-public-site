import { createApi } from '@reduxjs/toolkit/query/react';
import { BaseApiResponse } from '@repo/interfaces';
import baseQueryWithReauth from '../baseQueryWithReauth';
import { AssetForecast } from '~/lib/interfaces/forecast.interfaces';
import { FORECAST_TYPE_ENUM } from '~/lib/utils/constants';
import { generateQueryStr } from '~/lib/utils/queryGenerator';

const getHeaders = () => ({
  'Content-Type': 'application/json',
});
export const forecastApi = createApi({
  reducerPath: 'forecastApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: [],
  endpoints: (builder) => ({
    getAssetForecast: builder.query<
      BaseApiResponse<AssetForecast>,
      {
        assetId: number;
        forecastType: (typeof FORECAST_TYPE_ENUM)[keyof typeof FORECAST_TYPE_ENUM];
      }
    >({
      query: ({ assetId, forecastType }) => ({
        url: generateQueryStr(`/Forecasts/GetAssetForecasts/${assetId}?`, {
          forecastType,
        }),
        method: 'GET',
        headers: getHeaders(),
      }),
      providesTags: [],
    }),
  }),
});

export const { useGetAssetForecastQuery } = forecastApi;
