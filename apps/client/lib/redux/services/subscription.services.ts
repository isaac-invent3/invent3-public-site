import { baseApi } from '~/lib/redux/services/baseApi.services';
import { generateQueryStr } from '~/lib/utils/queryGenerator';

import {
  BaseApiResponse,
  ListResponse,
  QueryParams,
  SearchQuery,
} from '@repo/interfaces';
import { SubscriptionPlan } from '~/lib/interfaces/subscription.interfaces';

const getHeaders = () => ({
  'Content-Type': 'application/json',
});
export const subscriptionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllSubscriptionPlans: builder.query<
      BaseApiResponse<ListResponse<SubscriptionPlan>>,
      QueryParams
    >({
      query: (data) => ({
        url: generateQueryStr(`/SubscriptionPlan?`, data),
        method: 'GET',
        headers: getHeaders(),
      }),
      providesTags: ['allSubscriptions'],
    }),
    searchSubscriptionPlans: builder.mutation<
      BaseApiResponse<ListResponse<SubscriptionPlan>>,
      SearchQuery
    >({
      query: (body) => ({
        url: `/SubscriptionPlan/Search`,
        method: 'POST',
        headers: getHeaders(),
        body,
      }),
    }),
  }),
});

export const {
  useGetAllSubscriptionPlansQuery,
  useSearchSubscriptionPlansMutation,
} = subscriptionApi;
