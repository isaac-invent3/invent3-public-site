import { createApi } from '@reduxjs/toolkit/query/react';
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
    getallAsset: builder.query({
      query: (data: any) => ({
        url: generateQueryStr(`/Assets?`, data),
        method: 'GET',
        headers: getHeaders(),
      }),
      providesTags: ['allAsset'],
    }),
    getAssetById: builder.query({
      query: (id: any) => ({
        url: `/Assets/${id}`,
        method: 'GET',
        headers: getHeaders(),
      }),
      providesTags: ['singleAsset'],
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
          `/VendorContractDocuments/GetAssetContractDocuments/${id}?`,
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
        method: 'POST',
        headers: getHeaders(),
        body,
      }),
      invalidatesTags: ['allAsset'],
    }),
    getAllStatus: builder.query({
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
    getAllAssetTypes: builder.query({
      query: (data: any) => ({
        url: generateQueryStr(`/AssetTypes?`, data),
        method: 'GET',
        headers: getHeaders(),
      }),
      providesTags: ['allAssetTypes'],
    }),
    searchAssetTypes: builder.mutation({
      query: (body: any) => ({
        url: `/AssetStatus/Search`,
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
  useGetallAssetQuery,
  useGetAcquisitionInfoByAssetIdQuery,
  useGetAssetComponentInfoByAssetGuidQuery,
  useGetImagesByAssetIdQuery,
  useGetMaintenanceHistoryByAssetIdQuery,
  useGetPlannedMaintenanceByAssetIdQuery,
  useGetDocumentsByAssetIdQuery,
  useGetAllAssetTypesQuery,
  useGetAllStatusQuery,
  useSearchAssetTypesMutation,
  useSearchStatusMutation,
} = assetApi;
