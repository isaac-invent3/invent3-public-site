import { baseApi } from '~/lib/redux/services/baseApi.services';

import { generateQueryStr } from '~/lib/utils/queryGenerator';

import {
  BaseApiResponse,
  ListResponse,
  QueryParams,
  SearchQuery,
} from '@repo/interfaces';
import { AssetCondition } from '~/lib/interfaces/asset/condition.interface';

const getHeaders = () => ({
  'Content-Type': 'application/json',
});
export const conditionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllAssetCondition: builder.query<
      BaseApiResponse<ListResponse<AssetCondition>>,
      QueryParams
    >({
      query: (data) => ({
        url: generateQueryStr(`/AssetConditions?`, data),
        method: 'GET',
        headers: getHeaders(),
      }),
      providesTags: ['allCondition'],
    }),
    searchCondition: builder.mutation<
      BaseApiResponse<ListResponse<AssetCondition>>,
      SearchQuery
    >({
      query: (body) => ({
        url: `/AssetConditions/Search`,
        method: 'POST',
        headers: getHeaders(),
        body,
      }),
    }),
  }),
});

export const { useGetAllAssetConditionQuery, useSearchConditionMutation } =
  conditionApi;
