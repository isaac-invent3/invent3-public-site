import { createApi } from '@reduxjs/toolkit/query/react';
import { generateQueryStr } from '~/lib/utils/queryGenerator';
import baseQueryWithReauth from '../baseQueryWithReauth';
import { BaseApiResponse, ListResponse, QueryParams } from '@repo/interfaces';
import { ThirdPartyIntegration } from '~/lib/interfaces/integration.interfaces';

const getHeaders = () => ({
  'Content-Type': 'application/json',
});
export const integrationApi = createApi({
  reducerPath: 'integrationApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['allThirdPartyIntegrations'],
  endpoints: (builder) => ({
    getAllThirdPartyIntegrations: builder.query<
      BaseApiResponse<ListResponse<ThirdPartyIntegration>>,
      QueryParams
    >({
      query: (data) => ({
        url: generateQueryStr(`/ThirdPartyIntegrations?`, data),
        method: 'GET',
        headers: getHeaders(),
      }),
      providesTags: ['allThirdPartyIntegrations'],
    }),
  }),
});

export const { useGetAllThirdPartyIntegrationsQuery } = integrationApi;
