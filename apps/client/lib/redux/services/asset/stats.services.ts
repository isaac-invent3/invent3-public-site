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
          `/Locations/GetStateAssetCountByCountryId/${id}?`,
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
          `/Locations/GetLGAAssetCountByStateId/${id}?`,
          data
        ),
        method: 'GET',
        headers: getHeaders(),
      }),
      providesTags: ['allLGAAssetCount'],
    }),
  }),
});

export const {
  useGetLGAAssetCountByStateIdQuery,
  useGetStateAssetCountByCountryIdQuery,
} = assetStatsApi;
