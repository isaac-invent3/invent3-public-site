import { baseApi } from '~/lib/redux/services/baseApi.services';
import { generateQueryStr } from '~/lib/utils/queryGenerator';

import {
  BaseApiResponse,
  ListResponse,
  QueryParams,
  SearchQuery,
} from '@repo/interfaces';
import { Industry } from '~/lib/interfaces/industry.interfaces';

const getHeaders = () => ({
  'Content-Type': 'application/json',
});
export const industryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllIndustries: builder.query<
      BaseApiResponse<ListResponse<Industry>>,
      QueryParams
    >({
      query: (data) => ({
        url: generateQueryStr(`/Industries?`, data),
        method: 'GET',
        headers: getHeaders(),
      }),
      providesTags: ['allIndustries'],
    }),
    searchIndustries: builder.mutation<
      BaseApiResponse<ListResponse<Industry>>,
      SearchQuery
    >({
      query: (body) => ({
        url: `/Industries/Search`,
        method: 'POST',
        headers: getHeaders(),
        body,
      }),
    }),
  }),
});

export const { useGetAllIndustriesQuery, useSearchIndustriesMutation } =
  industryApi;
