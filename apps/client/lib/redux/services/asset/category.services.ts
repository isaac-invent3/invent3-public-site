import { createApi } from '@reduxjs/toolkit/query/react';
import { generateQueryStr } from '~/lib/utils/queryGenerator';
import baseQueryWithReauth from '../../baseQueryWithReauth';
import {
  BaseApiResponse,
  ListResponse,
  QueryParams,
  SearchQuery,
} from '@repo/interfaces';
import {
  Category,
  GetAssetSubCatgoriesByCategoryIdQuery,
  SubCategory,
} from '~/lib/interfaces/asset/category.interfaces';

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
      query: (data) => ({
        url: generateQueryStr(`/AssetCategories?`, data),
        method: 'GET',
        headers: getHeaders(),
      }),
      providesTags: ['allAssetCategory'],
    }),
    createCategory: builder.mutation<
      BaseApiResponse<Category>,
      { categoryName: string; createdBy: string }
    >({
      query: (body) => ({
        url: `/AssetCategories`,
        method: 'POST',
        headers: getHeaders(),
        body,
      }),
      invalidatesTags: ['allAssetCategory'],
    }),
    searchCategories: builder.mutation<
      BaseApiResponse<ListResponse<Category>>,
      SearchQuery
    >({
      query: (body) => ({
        url: `/AssetCategories/Search`,
        method: 'POST',
        headers: getHeaders(),
        body,
      }),
    }),
    getAllAssetSubCategory: builder.query<
      BaseApiResponse<ListResponse<SubCategory>>,
      QueryParams
    >({
      query: (data) => ({
        url: generateQueryStr(`/AssetSubCategories`, data),
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    getAssetSubCatgoriesByCategoryId: builder.query<
      BaseApiResponse<ListResponse<SubCategory>>,
      GetAssetSubCatgoriesByCategoryIdQuery
    >({
      query: ({ categoryId, ...data }) => ({
        url: generateQueryStr(
          `/AssetSubCategories/GetSubCategoryByCategoryId/${categoryId}?`,
          data
        ),
        method: 'GET',
        headers: getHeaders(),
      }),
      providesTags: ['assetSubCategoriesById'],
    }),
    createSubCategory: builder.mutation<
      BaseApiResponse<SubCategory>,
      { subCategoryName: string; createdBy: string; categoryId: number }
    >({
      query: (body) => ({
        url: `/AssetSubCategories`,
        method: 'POST',
        headers: getHeaders(),
        body,
      }),
      invalidatesTags: ['assetSubCategoriesById'],
    }),
    searchSubCategory: builder.mutation<
      BaseApiResponse<ListResponse<SubCategory>>,
      SearchQuery
    >({
      query: (body) => ({
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
