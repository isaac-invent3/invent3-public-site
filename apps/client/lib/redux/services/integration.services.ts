import { baseApi } from '~/lib/redux/services/baseApi.services';
import { generateQueryStr } from '~/lib/utils/queryGenerator';
import { BaseApiResponse, ListResponse, QueryParams } from '@repo/interfaces';
import { ThirdPartyIntegration } from '~/lib/interfaces/integration.interfaces';

const getHeaders = () => ({
  'Content-Type': 'application/json',
});
export const integrationApi = baseApi.injectEndpoints({
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
