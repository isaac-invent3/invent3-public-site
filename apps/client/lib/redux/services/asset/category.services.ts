import { createApi } from '@reduxjs/toolkit/query/react';
import { generateQueryStr } from '~/lib/utils/queryGenerator';
import baseQueryWithReauth from '../../baseQueryWithReauth';

const getHeaders = () => ({
  'Content-Type': 'application/json',
});
export const categoryApi = createApi({
  reducerPath: 'categoryApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['allAssetCategory'],
  endpoints: (builder) => ({
    getAllAssetCategory: builder.query({
      query: (data: any) => ({
        url: generateQueryStr(`/AssetCategories?`, data),
        method: 'GET',
        headers: getHeaders(),
      }),
      providesTags: ['allAssetCategory'],
    }),
    getAllAssetSubCategoryById: builder.query({
      query: ({ id, ...data }: any) => ({
        url: generateQueryStr(`/AssetSubCategories${id}?`, data),
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
  }),
});

export const {
  useGetAllAssetCategoryQuery,
  useGetAllAssetSubCategoryByIdQuery,
} = categoryApi;
