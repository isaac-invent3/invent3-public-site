import { createApi } from '@reduxjs/toolkit/query/react';
import { generateQueryStr } from '~/lib/utils/queryGenerator';
import baseQueryWithReauth from '../../baseQueryWithReauth';
import {
  BaseApiResponse,
  ListResponse,
  SearchQuery,
} from '~/lib/interfaces/general.interfaces';
import { AssetDocument } from '~/lib/interfaces/asset.interfaces';

const getHeaders = () => ({
  'Content-Type': 'application/json',
});
export const assetDocumentApi = createApi({
  reducerPath: 'assetDocumentApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['allAssetDocuments'],
  endpoints: (builder) => ({
    getAllAssetDocuments: builder.query<
      BaseApiResponse<ListResponse<AssetDocument>>,
      { pageSize: number; pageNumber?: number }
    >({
      query: (data: any) => ({
        url: generateQueryStr(`/AssetDocuments?`, data),
        method: 'GET',
        headers: getHeaders(),
      }),
      providesTags: ['allAssetDocuments'],
    }),
    getAssetDocumentsByAssetId: builder.query<
      BaseApiResponse<ListResponse<AssetDocument>>,
      {
        pageSize: number;
        pageNumber?: number;
        id: number | string | null;
        includeDeleted?: boolean;
      }
    >({
      query: ({ id, ...data }) => ({
        url: generateQueryStr(
          `/AssetDocuments/GetDocumentsByAssetId/${id}?`,
          data
        ),
        method: 'GET',
        headers: getHeaders(),
      }),
    }),

    searchAssetDocuments: builder.mutation<
      BaseApiResponse<ListResponse<AssetDocument>>,
      SearchQuery
    >({
      query: (body) => ({
        url: `/AssetDocuments/Search`,
        method: 'POST',
        headers: getHeaders(),
        body,
      }),
    }),
  }),
});

export const {
  useGetAllAssetDocumentsQuery,
  useGetAssetDocumentsByAssetIdQuery,
  useSearchAssetDocumentsMutation,
} = assetDocumentApi;
