import { createApi } from '@reduxjs/toolkit/query/react';
import {
  BaseApiResponse,
  ListResponse,
  QueryParams,
  SearchQuery,
} from '@repo/interfaces';
import {
  AcquisitionInfo,
  Asset,
  AssetCountByColumnName,
  AssetStatus,
  CreateAssetPayload,
  MeanTimeComputation,
  UpdateAssetPayload,
  ValidColumnNames,
} from '~/lib/interfaces/asset/general.interface';
import {
  AssetImage,
  AssetImageQuery,
} from '~/lib/interfaces/asset/image.interfaces';
import {
  AssetTransfer,
  AssetTransferQuery,
} from '~/lib/interfaces/asset/transfer.interfaces';
import { MaintenanceSchedule } from '~/lib/interfaces/maintenance.interfaces';
import { generateQueryStr } from '~/lib/utils/queryGenerator';
import baseQueryWithReauth from '../../baseQueryWithReauth';

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
    getAssetsByListOfIds: builder.query<
      BaseApiResponse<ListResponse<Asset>>,
      QueryParams & { assetIds: number[] }
    >({
      query: (data) => ({
        url: generateQueryStr(`/Assets/GetAssetsByListOfIds?`, data),
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
    getAssetInfoHeaderById: builder.query<
      BaseApiResponse<Asset>,
      { id: number }
    >({
      query: ({ id }) => ({
        url: `/Assets/GetAssetInfoHeader/${id}`,
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    getAcquisitionInfoByAssetId: builder.query<
      BaseApiResponse<AcquisitionInfo>,
      { id: number }
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
      { id: number }
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
        id: number;
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
      { assetGuid: string }
    >({
      query: ({ assetGuid }) => ({
        url: `/GetAssetComponentInfo/${assetGuid}`,
        method: 'GET',
        headers: getHeaders(),
      }),
    }),

    getAssetCountByColumnName: builder.query<
      BaseApiResponse<AssetCountByColumnName[]>,
      ValidColumnNames
    >({
      query: (columnName) => ({
        url: generateQueryStr(`/Assets/GetAssetCountByColumnName?`, {
          columnName,
        }),
        method: 'GET',
        headers: getHeaders(),
      }),
    }),

    getAssetsByColumnId: builder.query<
      BaseApiResponse<ListResponse<Asset>>,
      { columnId: number; columnName: ValidColumnNames } & QueryParams
    >({
      query: ({ columnId, ...data }) => ({
        url: generateQueryStr(`/Assets/GetAssetsByColumnId/${columnId}?`, data),
        method: 'GET',
        headers: getHeaders(),
      }),
    }),

    createAsset: builder.mutation<BaseApiResponse<Asset>, CreateAssetPayload>({
      query: (body) => ({
        url: `/Invent3Pro/Assets/Create`,
        method: 'POST',
        headers: getHeaders(),
        body,
      }),
      invalidatesTags: ['allAsset'],
    }),
    updateAsset: builder.mutation<void, UpdateAssetPayload>({
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
        statusId: number;
        lastModifiedBy: string;
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
    exportAsset: builder.mutation<
      BaseApiResponse<string>,
      { exportType: number; assetIds: number[] }
    >({
      query: ({ exportType, assetIds }) => ({
        url: `/Assets/Export?exportType=${exportType}`,
        method: 'POST',
        headers: getHeaders(),
        body: assetIds,
      }),
    }),
    downloadAsset: builder.query<string, { filePath: string }>({
      query: (data) => ({
        url: generateQueryStr(`/Assets/Download?`, data),
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    assetMeanTimeComputation: builder.query<
      BaseApiResponse<MeanTimeComputation>,
      { monthId: number }
    >({
      query: (data) => ({
        url: generateQueryStr(`/Assets/Assets/MeantimeComputations?`, data),
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
  }),
});

export const {
  useCreateAssetMutation,
  useUpdateAssetMutation,
  useGetAssetInfoHeaderByIdQuery,
  useGetAllAssetQuery,
  useGetAssetsByListOfIdsQuery,
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
  useExportAssetMutation,
  useDownloadAssetQuery,
  useAssetMeanTimeComputationQuery,
  useGetAssetCountByColumnNameQuery,
  useGetAssetsByColumnIdQuery,
} = assetApi;
