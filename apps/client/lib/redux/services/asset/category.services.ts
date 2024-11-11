import { createApi } from '@reduxjs/toolkit/query/react';
import { generateQueryStr } from '~/lib/utils/queryGenerator';
import baseQueryWithReauth from '../../baseQueryWithReauth';
import {
  BaseApiResponse,
  ListResponse,
  QueryParams,
} from '~/lib/interfaces/general.interfaces';
import { Category } from '~/lib/interfaces/category.interfaces';

const getHeaders = () => ({
  'Content-Type': 'application/json',
});
export const categoryApi = createApi({
  reducerPath: 'categoryApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['allAssetCategory', 'assetSubCategoriesById'],
  endpoints: (builder) => ({
    getAllAssetCategory: builder.query<
      BaseApiResponse<ListResponse<Category>>,
      QueryParams
    >({
      query: (data: any) => ({
        url: generateQueryStr(`/AssetCategories?`, data),
        method: 'GET',
        headers: getHeaders(),
      }),
      providesTags: ['allAssetCategory'],
    }),
    createCategory: builder.mutation({
      query: (body: any) => ({
        url: `/AssetCategories`,
        method: 'POST',
        headers: getHeaders(),
        body,
      }),
      invalidatesTags: ['allAssetCategory'],
    }),
    searchCategories: builder.mutation({
      query: (body: any) => ({
        url: `/AssetCategories/Search`,
        method: 'POST',
        headers: getHeaders(),
        body,
      }),
    }),
    getAllAssetSubCategory: builder.query({
      query: (data: any) => ({
        url: generateQueryStr(`/AssetSubCategories`, data),
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    getAssetSubCatgoriesByCategoryId: builder.query({
      query: ({ id, ...data }) => ({
        url: generateQueryStr(
          `/AssetSubCategories/GetSubCategoryByCategoryId/${id}?`,
          data
        ),
        method: 'GET',
        headers: getHeaders(),
      }),
      providesTags: ['assetSubCategoriesById'],
    }),
    createSubCategory: builder.mutation({
      query: (body: any) => ({
        url: `/AssetSubCategories`,
        method: 'POST',
        headers: getHeaders(),
        body,
      }),
      invalidatesTags: ['assetSubCategoriesById'],
    }),
    searchSubCategory: builder.mutation({
      query: (body: any) => ({
        url: `/AssetSubCategories/Search`,
        method: 'POST',
        headers: getHeaders(),
        body,
      }),
    }),
  }),
});

export const {
  useGetAllAssetCategoryQuery,
  useCreateCategoryMutation,
  useCreateSubCategoryMutation,
  useGetAssetSubCatgoriesByCategoryIdQuery,
  useGetAllAssetSubCategoryQuery,
  useSearchCategoriesMutation,
  useSearchSubCategoryMutation,
} = categoryApi;
