import { createApi } from '@reduxjs/toolkit/query/react';
import { generateQueryStr } from '~/lib/utils/queryGenerator';
import baseQueryWithReauth from '../../baseQueryWithReauth';

const getHeaders = () => ({
  'Content-Type': 'application/json',
});
export const assetStatsApi = createApi({
  reducerPath: 'assetStatsApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['allStateAssetCount', 'allLGAAssetCount'],
  endpoints: (builder) => ({
    getStateAssetCountByCountryId: builder.query({
      query: ({ id, ...data }) => ({
        url: generateQueryStr(
          `/Locations/GetStateAssetStatusCountByCountryId/${id}?`,
          data
        ),
        method: 'GET',
        headers: getHeaders(),
      }),
      providesTags: ['allStateAssetCount'],
    }),
    getLGAAssetCountByStateId: builder.query({
      query: ({ id, ...data }) => ({
        url: generateQueryStr(
          `/Locations/GetLGAAssetStatusCountByStateId/${id}?`,
          data
        ),
        method: 'GET',
        headers: getHeaders(),
      }),
      providesTags: ['allLGAAssetCount'],
    }),
    getCumulativeAssetStatusCountByCountryId: builder.query({
      query: (id) => ({
        url: `/Locations/GetCumulativeAssetStatusCountsByCountryId/${id}`,
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    getCumulativeAssetStatusCountByStateId: builder.query({
      query: (id) => ({
        url: `/Locations/GetCumulativeAssetStatusCountsByStateId/${id}`,
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
  }),
});

export const {
  useGetLGAAssetCountByStateIdQuery,
  useGetStateAssetCountByCountryIdQuery,
  useGetCumulativeAssetStatusCountByCountryIdQuery,
  useGetCumulativeAssetStatusCountByStateIdQuery,
} = assetStatsApi;
