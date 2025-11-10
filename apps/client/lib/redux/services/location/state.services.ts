import { baseApi } from '~/lib/redux/services/baseApi.services';

import { generateQueryStr } from '~/lib/utils/queryGenerator';

import { BaseApiResponse, ListResponse, SearchQuery } from '@repo/interfaces';
import {
  LocationQueryParams,
  State,
} from '~/lib/interfaces/location.interfaces';

const getHeaders = () => ({
  'Content-Type': 'application/json',
});
export const stateApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getStatesByCountryId: builder.query<
      BaseApiResponse<ListResponse<State>>,
      LocationQueryParams
    >({
      query: ({ id, ...data }) => ({
        url: generateQueryStr(`/States/GetStatesByCountryId/${id}?`, data),
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    getStateById: builder.query<BaseApiResponse<State>, { id: number }>({
      query: ({ id }) => ({
        url: `/States/${id}`,
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    searchStates: builder.mutation<
      BaseApiResponse<ListResponse<State>>,
      SearchQuery
    >({
      query: (body) => ({
        url: `/States/Search`,
        method: 'POST',
        headers: getHeaders(),
        body,
      }),
    }),
  }),
});

export const {
  useGetStatesByCountryIdQuery,
  useSearchStatesMutation,
  useGetStateByIdQuery,
} = stateApi;
