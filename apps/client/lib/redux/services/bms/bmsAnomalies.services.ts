import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryWithReauth from '../../baseQueryWithReauth';
import { BaseApiResponse, ListResponse, QueryParams } from '@repo/interfaces';
import { generateQueryStr } from '~/lib/utils/queryGenerator';
import { BMSAnomaly } from '~/lib/interfaces/dashboard/bms.interfaces';

const getHeaders = () => ({
  'Content-Type': 'application/json',
});
export const bmsAnomaliesApi = createApi({
  reducerPath: 'bmsAnomaliesApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: [],
  endpoints: (builder) => ({
    getBmsAnomaliesByAssetId: builder.query<
      BaseApiResponse<ListResponse<BMSAnomaly>>,
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
    createTicketFromAnomaly: builder.mutation<void, { anomalyId: number }>({
      query: ({ anomalyId, ...data }) => ({
        url: generateQueryStr(
          `/BMSAnomalies/CreateTicketFromAnomaly/${anomalyId}`,
          data
        ),
        method: 'POST',
        headers: getHeaders(),
        body: {},
      }),
    }),
    acknowledgeAnomaly: builder.mutation<
      void,
      { anomalyId: number; acknowledgedBy: string }
    >({
      query: ({ anomalyId, ...data }) => ({
        url: generateQueryStr(
          `/BMSAnomalies/AcknowledgeAnomaly/${anomalyId}`,
          data
        ),
        method: 'PUT',
        headers: getHeaders(),
        body: {},
      }),
    }),
    dismissAnomaly: builder.mutation<
      void,
      { anomalyId: number; dismissedBy: string }
    >({
      query: ({ anomalyId, ...data }) => ({
        url: generateQueryStr(
          `/BMSAnomalies/DismissAnomaly/${anomalyId}`,
          data
        ),
        method: 'PUT',
        headers: getHeaders(),
        body: {},
      }),
    }),
  }),
});

export const {
  useGetBmsAnomaliesByAssetIdQuery,
  useCreateTicketFromAnomalyMutation,
  useAcknowledgeAnomalyMutation,
  useDismissAnomalyMutation,
} = bmsAnomaliesApi;
