import { baseApi } from '~/lib/redux/services/baseApi.services';

import { generateQueryStr } from '~/lib/utils/queryGenerator';

import {
  BaseApiResponse,
  ListResponse,
  QueryParams,
  SearchQuery,
} from '@repo/interfaces';
import { LGA, LocationQueryParams } from '~/lib/interfaces/location.interfaces';

const getHeaders = () => ({
  'Content-Type': 'application/json',
});
export const lgaApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllLGAS: builder.query<BaseApiResponse<ListResponse<LGA>>, QueryParams>({
      query: (data) => ({
        url: generateQueryStr(`/StateLgas?`, data),
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    getLGAByStateId: builder.query<
      BaseApiResponse<ListResponse<LGA>>,
      LocationQueryParams
    >({
      query: ({ id, ...data }) => ({
        url: generateQueryStr(`/StateLgas/GetLGAsByStateId/${id}?`, data),
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    searchLGA: builder.mutation<
      BaseApiResponse<ListResponse<LGA>>,
      SearchQuery
    >({
      query: (body) => ({
        url: `/StateLgas/Search`,
        method: 'POST',
        headers: getHeaders(),
        body,
      }),
    }),
  }),
});

export const {
  useGetAllLGASQuery,
  useGetLGAByStateIdQuery,
  useSearchLGAMutation,
} = lgaApi;
