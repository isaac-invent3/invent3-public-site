import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryWithReauth from '../../baseQueryWithReauth';
import { BaseApiResponse, ListResponse, QueryParams } from '@repo/interfaces';
import { generateQueryStr } from '~/lib/utils/queryGenerator';
import {
  AssetBMSReading,
  BmsReadingSubCategory,
} from '~/lib/interfaces/dashboard/bms.interfaces';

const getHeaders = () => ({
  'Content-Type': 'application/json',
});
export const bmsReadingApi = createApi({
  reducerPath: 'bmsReadingApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: [],
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
