import { baseApi } from '~/lib/redux/services/baseApi.services';

import { BaseApiResponse, ListResponse, QueryParams } from '@repo/interfaces';
import { generateQueryStr } from '~/lib/utils/queryGenerator';
import {
  AssetBMSReading,
  BmsReadingSubCategory,
} from '~/lib/interfaces/dashboard/bms.interfaces';

const getHeaders = () => ({
  'Content-Type': 'application/json',
});
export const bmsReadingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBmsReadingSubCategories: builder.query<
      BaseApiResponse<ListResponse<BmsReadingSubCategory>>,
      QueryParams
    >({
      query: (data) => ({
        url: generateQueryStr(`/BmsReadingSubCategories?`, data),
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    getAssetBmsReadingsBySubcategoryId: builder.query<
      BaseApiResponse<ListResponse<AssetBMSReading>>,
      { assetId: number; subcategoryId: number }
    >({
      query: ({ assetId, ...data }) => ({
        url: generateQueryStr(
          `/AssetBmsReadings/GetAssetBmsReadingsBySubcategoryId/${assetId}?`,
          data
        ),
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
  }),
});

export const {
  useGetBmsReadingSubCategoriesQuery,
  useGetAssetBmsReadingsBySubcategoryIdQuery,
} = bmsReadingApi;
