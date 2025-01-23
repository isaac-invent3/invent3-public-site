import { createApi } from '@reduxjs/toolkit/query/react';
import { generateQueryStr } from '~/lib/utils/queryGenerator';
import baseQueryWithReauth from '../../baseQueryWithReauth';
import {
  BaseApiResponse,
  ListResponse,
  QueryParams,
  SearchQuery,
} from '@repo/interfaces';
import { AssetVendor } from '~/lib/interfaces/asset/vendor.interfaces';

const getHeaders = () => ({
  'Content-Type': 'application/json',
});
export const assetVendorsApi = createApi({
  reducerPath: 'assetVendorsApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['allAssetVendors'],
  endpoints: (builder) => ({
    getAllAssetVendors: builder.query<
      BaseApiResponse<ListResponse<AssetVendor>>,
      QueryParams
    >({
      query: (data) => ({
        url: generateQueryStr(`/Vendors?`, data),
        method: 'GET',
        headers: getHeaders(),
      }),
      providesTags: ['allAssetVendors'],
    }),
    searchAssetVendors: builder.mutation<
      BaseApiResponse<ListResponse<AssetVendor>>,
      SearchQuery
    >({
      query: (body) => ({
        url: `/Vendors/Search`,
        method: 'POST',
        headers: getHeaders(),
        body,
      }),
    }),
    getAssetVendorById: builder.query<
      BaseApiResponse<AssetVendor>,
      { id: number | undefined }
    >({
      query: ({ id }) => ({
        url: `/Vendors/${id}?`,
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
  }),
});

export const {
  useGetAllAssetVendorsQuery,
  useSearchAssetVendorsMutation,
  useGetAssetVendorByIdQuery,
} = assetVendorsApi;
