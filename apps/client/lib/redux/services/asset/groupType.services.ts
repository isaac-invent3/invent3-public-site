import { baseApi } from '~/lib/redux/services/baseApi.services';

import { generateQueryStr } from '~/lib/utils/queryGenerator';

import {
  BaseApiResponse,
  ListResponse,
  QueryParams,
  SearchQuery,
} from '@repo/interfaces';
import {
  AssetGroupTypes,
  GroupTypeContext,
  GroupTypeContextQuery,
} from '~/lib/interfaces/asset/groupType.interfaces';

const getHeaders = () => ({
  'Content-Type': 'application/json',
});
export const assetGroupTypeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllAssetGroupTypes: builder.query<
      BaseApiResponse<ListResponse<AssetGroupTypes>>,
      QueryParams
    >({
      query: (data) => ({
        url: generateQueryStr(`/AssetGroupTypes?`, data),
        method: 'GET',
        headers: getHeaders(),
      }),
      providesTags: ['allAssetGroupTypes'],
    }),
    getAllGroupContextRecordsByTypeId: builder.query<
      BaseApiResponse<ListResponse<GroupTypeContext>>,
      GroupTypeContextQuery
    >({
      query: ({ groupTypeId, ...data }) => ({
        url: generateQueryStr(
          `/AssetGroupTypes/GetGroupTypeContextRecords/${groupTypeId}?`,
          data
        ),
        method: 'GET',
        headers: getHeaders(),
      }),
      providesTags: ['allAssetGroupContextRecords'],
    }),
    searchAssetGroupTypes: builder.mutation<
      BaseApiResponse<ListResponse<AssetGroupTypes>>,
      SearchQuery
    >({
      query: (body) => ({
        url: `/AssetGroupTypes/Search`,
        method: 'POST',
        headers: getHeaders(),
        body,
      }),
    }),
  }),
});

export const {
  useGetAllAssetGroupTypesQuery,
  useGetAllGroupContextRecordsByTypeIdQuery,
  useSearchAssetGroupTypesMutation,
} = assetGroupTypeApi;
