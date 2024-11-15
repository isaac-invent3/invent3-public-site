import { createApi } from '@reduxjs/toolkit/query/react';
import { generateQueryStr } from '~/lib/utils/queryGenerator';
import baseQueryWithReauth from '../../baseQueryWithReauth';
import {
  BaseApiResponse,
  ListResponse,
  QueryParams,
} from '~/lib/interfaces/general.interfaces';
import { AssetStatus } from '~/lib/interfaces/asset.interfaces';

const getHeaders = () => ({
  'Content-Type': 'application/json',
});
export const assetApi = createApi({
  reducerPath: 'assetApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['allAsset', 'singleAsset', 'allStatuses', 'allAssetTypes'],
  endpoints: (builder) => ({
    getallAsset: builder.query({
      query: (data: any) => ({
        url: generateQueryStr(`/Assets?`, data),
        method: 'GET',
        headers: getHeaders(),
      }),
      providesTags: ['allAsset'],
    }),
    searchAssets: builder.mutation({
      query: (body: any) => ({
        url: `/Assets/Search`,
        method: 'POST',
        headers: getHeaders(),
        body,
      }),
    }),
    getAssetById: builder.query({
      query: (id: any) => ({
        url: `/Assets/${id}`,
        method: 'GET',
        headers: getHeaders(),
      }),
      providesTags: ['singleAsset'],
    }),
    getAssetInfoHeaderById: builder.query({
      query: (id: any) => ({
        url: `/Assets/GetAssetInfoHeader/${id}`,
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    getAcquisitionInfoByAssetId: builder.query({
      query: ({ id }) => ({
        url: `/Assets/GetAcquisitionInfo/${id}`,
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    getImagesByAssetId: builder.query({
      query: ({ id }) => ({
        url: `/AssetImages/GetImagesbyAssetId/${id}`,
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    getPlannedMaintenanceByAssetId: builder.query({
      query: ({ id, ...data }) => ({
        url: generateQueryStr(
          `/MaintenanceSchedules/GetAssetPlannedMaintenanceInfo/${id}?`,
          data
        ),
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    getMaintenanceHistoryByAssetId: builder.query({
      query: ({ id, ...data }) => ({
        url: generateQueryStr(
          `/MaintenanceSchedules/GetAssetMaintenanceHistory/${id}?`,
          data
        ),
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    getDocumentsByAssetId: builder.query({
      query: ({ id, ...data }) => ({
        url: generateQueryStr(
          `/AssetDocuments/GetDocumentsByAssetId/${id}?`,
          data
        ),
        method: 'GET',
        headers: getHeaders(),
      }),
    }),

    GetAssetComponentInfoByAssetGuid: builder.query({
      query: ({ id }) => ({
        url: `/GetAssetComponentInfo/${id}`,
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    createAsset: builder.mutation({
      query: (body: any) => ({
        url: `/Invent3Pro/Assets/Create`,
        method: 'POST',
        headers: getHeaders(),
        body,
      }),
      invalidatesTags: ['allAsset'],
    }),
    updateAsset: builder.mutation({
      query: (body: any) => ({
        url: `/Invent3Pro/Assets/Update`,
        method: 'PUT',
        headers: getHeaders(),
        body,
      }),
      invalidatesTags: ['allAsset'],
    }),
    getAllAssetStatus: builder.query<
      BaseApiResponse<ListResponse<AssetStatus>>,
      QueryParams
    >({
      query: (data: any) => ({
        url: generateQueryStr(`/AssetStatus?`, data),
        method: 'GET',
        headers: getHeaders(),
      }),
      providesTags: ['allStatuses'],
    }),
    searchStatus: builder.mutation({
      query: (body: any) => ({
        url: `/AssetStatus/Search`,
        method: 'POST',
        headers: getHeaders(),
        body,
      }),
    }),
    transferAsset: builder.mutation({
      query: (body: any) => ({
        url: `/AssetTransfers`,
        method: 'POST',
        headers: getHeaders(),
        body,
      }),
    }),
  }),
});

export const {
  useCreateAssetMutation,
  useUpdateAssetMutation,
  useGetAssetByIdQuery,
  useGetAssetInfoHeaderByIdQuery,
  useGetallAssetQuery,
  useGetAcquisitionInfoByAssetIdQuery,
  useGetAssetComponentInfoByAssetGuidQuery,
  useGetImagesByAssetIdQuery,
  useGetMaintenanceHistoryByAssetIdQuery,
  useGetPlannedMaintenanceByAssetIdQuery,
  useGetDocumentsByAssetIdQuery,
  useGetAllAssetStatusQuery,
  useSearchStatusMutation,
  useSearchAssetsMutation,
  useTransferAssetMutation,
} = assetApi;
