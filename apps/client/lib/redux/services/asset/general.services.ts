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
  AcquisitionInfo,
  Asset,
  AssetStatus,
} from '~/lib/interfaces/asset/general.interface';
import { MaintenanceSchedule } from '~/lib/interfaces/maintenance.interfaces';
import {
  AssetTransfer,
  AssetTransferQuery,
} from '~/lib/interfaces/asset/transfer.interfaces';
import {
  AssetImage,
  AssetImageQuery,
} from '~/lib/interfaces/asset/image.interfaces';

const getHeaders = () => ({
  'Content-Type': 'application/json',
});
export const assetApi = createApi({
  reducerPath: 'assetApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['allAsset', 'singleAsset', 'allStatuses', 'allAssetTypes'],
  endpoints: (builder) => ({
    getAllAsset: builder.query<
      BaseApiResponse<ListResponse<Asset>>,
      QueryParams
    >({
      query: (data) => ({
        url: generateQueryStr(`/Assets?`, data),
        method: 'GET',
        headers: getHeaders(),
      }),
      providesTags: ['allAsset'],
    }),
    searchAssets: builder.mutation<
      BaseApiResponse<ListResponse<Asset>>,
      SearchQuery
    >({
      query: (body) => ({
        url: `/Assets/Search`,
        method: 'POST',
        headers: getHeaders(),
        body,
      }),
    }),
    getAssetById: builder.query<
      BaseApiResponse<Asset>,
      { id: number | undefined }
    >({
      query: (id) => ({
        url: `/Assets/${id}`,
        method: 'GET',
        headers: getHeaders(),
      }),
      providesTags: ['singleAsset'],
    }),
    getAssetInfoHeaderById: builder.query<
      BaseApiResponse<Asset>,
      { id: number | undefined }
    >({
      query: ({ id }) => ({
        url: `/Assets/GetAssetInfoHeader/${id}`,
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    getAcquisitionInfoByAssetId: builder.query<
      BaseApiResponse<AcquisitionInfo>,
      { id: number | undefined }
    >({
      query: ({ id }) => ({
        url: `/Assets/GetAcquisitionInfo/${id}`,
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    getImagesByAssetId: builder.query<
      BaseApiResponse<ListResponse<AssetImage>>,
      AssetImageQuery
    >({
      query: ({ assetId, ...data }) => ({
        url: generateQueryStr(
          `/AssetImages/GetImagesbyAssetId/${assetId}?`,
          data
        ),
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    getPlannedMaintenanceByAssetId: builder.query<
      BaseApiResponse<ListResponse<MaintenanceSchedule>>,
      { id: number | undefined }
    >({
      query: ({ id, ...data }) => ({
        url: generateQueryStr(
          `/MaintenanceSchedules/GetAssetPlannedMaintenanceInfo/${id}?`,
          data
        ),
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    getMaintenanceHistoryByAssetId: builder.query<
      BaseApiResponse<ListResponse<MaintenanceSchedule>>,
      {
        id: number | undefined;
        pageSize?: number;
        pageNumber?: number;
        includeDeleted?: boolean;
      }
    >({
      query: ({ id, ...data }) => ({
        url: generateQueryStr(
          `/MaintenanceSchedules/GetAssetMaintenanceHistory/${id}?`,
          data
        ),
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    GetAssetComponentInfoByAssetGuid: builder.query<
      BaseApiResponse<{
        parent?: Asset;
        asset: Asset;
        childComponents?: Asset[];
      }>,
      { assetGuid: string | undefined }
    >({
      query: ({ assetGuid }) => ({
        url: `/GetAssetComponentInfo/${assetGuid}`,
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    createAsset: builder.mutation({
      query: (body) => ({
        url: `/Invent3Pro/Assets/Create`,
        method: 'POST',
        headers: getHeaders(),
        body,
      }),
      invalidatesTags: ['allAsset'],
    }),
    updateAsset: builder.mutation({
      query: (body) => ({
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
      query: (data) => ({
        url: generateQueryStr(`/AssetStatus?`, data),
        method: 'GET',
        headers: getHeaders(),
      }),
      providesTags: ['allStatuses'],
    }),
    searchStatus: builder.mutation<
      BaseApiResponse<ListResponse<AssetStatus>>,
      SearchQuery
    >({
      query: (body) => ({
        url: `/AssetStatus/Search`,
        method: 'POST',
        headers: getHeaders(),
        body,
      }),
    }),
    updateAssetStatus: builder.mutation<
      void,
      {
        assetIds: number[];
        statusId: number | undefined;
        lastModifiedBy: string | undefined;
      }
    >({
      query: (body) => ({
        url: `/Assets/UpdateAssetsStatuses`,
        method: 'PUT',
        headers: getHeaders(),
        body,
      }),
      invalidatesTags: ['allAsset'],
    }),
    transferAsset: builder.mutation<
      BaseApiResponse<AssetTransfer>,
      AssetTransferQuery
    >({
      query: (body) => ({
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
  useGetAllAssetQuery,
  useGetAcquisitionInfoByAssetIdQuery,
  useGetAssetComponentInfoByAssetGuidQuery,
  useGetImagesByAssetIdQuery,
  useGetMaintenanceHistoryByAssetIdQuery,
  useGetPlannedMaintenanceByAssetIdQuery,
  useGetAllAssetStatusQuery,
  useSearchStatusMutation,
  useSearchAssetsMutation,
  useTransferAssetMutation,
  useUpdateAssetStatusMutation,
} = assetApi;
