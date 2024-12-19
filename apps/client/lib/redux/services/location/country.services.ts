import { createApi } from '@reduxjs/toolkit/query/react';
import { generateQueryStr } from '~/lib/utils/queryGenerator';
import baseQueryWithReauth from '../../baseQueryWithReauth';
import {
  BaseApiResponse,
  ListResponse,
  QueryParams,
  SearchQuery,
} from '@repo/interfaces';
import { Country } from '~/lib/interfaces/location.interfaces';

const getHeaders = () => ({
  'Content-Type': 'application/json',
});
export const countryApi = createApi({
  reducerPath: 'countryApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: [],
  endpoints: (builder) => ({
    getAllCountries: builder.query<
      BaseApiResponse<ListResponse<Country>>,
      QueryParams
    >({
      query: (data) => ({
        url: generateQueryStr(`/Countries?`, data),
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    searchCountries: builder.mutation<
      BaseApiResponse<ListResponse<Country>>,
      SearchQuery
    >({
      query: (body) => ({
        url: `/Countries/Search`,
        method: 'POST',
        headers: getHeaders(),
        body,
      }),
    }),
  }),
});

export const { useGetAllCountriesQuery, useSearchCountriesMutation } =
  countryApi;
