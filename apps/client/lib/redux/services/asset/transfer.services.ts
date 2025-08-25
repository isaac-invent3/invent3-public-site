import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryWithReauth from '../../baseQueryWithReauth';
import { BaseApiResponse } from '@repo/interfaces';
import {
  AssetTransfer,
  AssetTransferInfoHeader,
  AssetTransferPayload,
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
      AssetTransferPayload
    >({
      query: (body) => ({
        url: `/Invent3Pro/CreateAssetTransferRequest`,
        method: 'POST',
        headers: getHeaders(),
        body,
      }),
    }),
    getAssetTransfer: builder.query<
      BaseApiResponse<AssetTransferInfoHeader>,
      { id: number }
    >({
      query: ({ id }) => ({
        url: `/AssetTransfers/GetAssetTransferInfoHeader/${id}?`,
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
  }),
});

export const { useTransferAssetMutation, useGetAssetTransferQuery } =
  assetTransferApi;
