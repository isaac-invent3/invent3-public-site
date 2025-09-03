import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryWithReauth from '../baseQueryWithReauth';
import {
  ImportHistory,
  DataUpload,
  FailedUploadItems,
} from '~/lib/interfaces/dataUpload.interfaces';
import { BaseApiResponse, ListResponse, QueryParams } from '@repo/interfaces';
import { generateQueryStr } from '~/lib/utils/queryGenerator';

const getHeaders = () => ({
  'Content-Type': 'application/json',
});
export const dataUploadAPi = createApi({
  reducerPath: 'dataUploadAPi',
  baseQuery: baseQueryWithReauth,
  tagTypes: [],
  endpoints: (builder) => ({
    uploadData: builder.mutation<any, any>({
      query: (body) => ({
        url: `/Invent3Pro/Bulk-upload`,
        method: 'POST',
        body,
      }),
    }),
    getMostRecentUpload: builder.query<BaseApiResponse<DataUpload>, {}>({
      query: () => ({
        url: '/DataUploadHistory/GetMostRecentUpload',
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    getDataUploadFailedItemByUploadId: builder.query<
      BaseApiResponse<ListResponse<FailedUploadItems>>,
      QueryParams & { id: number }
    >({
      query: ({ id, ...data }) => ({
        url: generateQueryStr(
          `/DataUploadFailedItems/GetDataUploadFailedItemByUploadId/${id}?`,
          data
        ),
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    getDataImportHistory: builder.query<
      BaseApiResponse<ListResponse<ImportHistory>>,
      QueryParams
    >({
      query: (data) => ({
        url: generateQueryStr(`/DataUploadHistory/ViewImportHistory?`, data),
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
  }),
});

export const {
  useUploadDataMutation,
  useGetMostRecentUploadQuery,
  useGetDataUploadFailedItemByUploadIdQuery,
  useGetDataImportHistoryQuery,
} = dataUploadAPi;
