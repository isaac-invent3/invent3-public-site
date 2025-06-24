import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryWithReauth from '../../baseQueryWithReauth';
import { BaseApiResponse } from '@repo/interfaces';
import {
  AssetTransfer,
  AssetTransferQuery,
} from '~/lib/interfaces/asset/transfer.interfaces';

const getHeaders = () => ({
  'Content-Type': 'application/json',
});
export const assetTransferApi = createApi({
  reducerPath: 'assetTransferApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: [],
  endpoints: (builder) => ({
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
    getAssetTransfer: builder.query<
      BaseApiResponse<AssetTransfer>,
      { id: number }
    >({
      query: ({ id }) => ({
        url: `/AssetTransfers/${id}?`,
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
  }),
});

export const { useTransferAssetMutation, useGetAssetTransferQuery } =
  assetTransferApi;
