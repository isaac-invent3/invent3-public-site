import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryWithReauth from '../../baseQueryWithReauth';
import { BaseApiResponse, ListResponse, QueryParams } from '@repo/interfaces';
import { generateQueryStr } from '~/lib/utils/queryGenerator';
import { AssetBMSReading } from '~/lib/interfaces/dashboard/bms.interfaces';

const getHeaders = () => ({
  'Content-Type': 'application/json',
});
export const bmsAnomaliesApi = createApi({
  reducerPath: 'bmsAnomaliesApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: [],
  endpoints: (builder) => ({
    getBmsAnomaliesByAssetId: builder.query<
      BaseApiResponse<ListResponse<AssetBMSReading>>,
      { assetId: number } & QueryParams
    >({
      query: ({ assetId, ...data }) => ({
        url: generateQueryStr(
          `/BMSAnomalies/GetBmsAnomaliesByAssetId/${assetId}`,
          data
        ),
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
  }),
});

export const { useGetBmsAnomaliesByAssetIdQuery } = bmsAnomaliesApi;
