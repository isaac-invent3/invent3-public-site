import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryWithReauth from '../baseQueryWithReauth';
import {
  AppConfig,
  DataUpload,
  ExportTableName,
  FailedUploadItems,
} from '~/lib/interfaces/general.interfaces';
import { BaseApiResponse, ListResponse, QueryParams } from '@repo/interfaces';
import {
  ContactPayload,
  Settings,
  UpdateSettingsPayload,
} from '~/lib/interfaces/settings.interfaces';
import { generateQueryStr } from '~/lib/utils/queryGenerator';

const getHeaders = () => ({
  'Content-Type': 'application/json',
});
export const utilityApi = createApi({
  reducerPath: 'utilityApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: [],
  endpoints: (builder) => ({
    getAppConfigValues: builder.query<BaseApiResponse<AppConfig>, {}>({
      query: () => ({
        url: '/Invent3Pro/GetDefaultAppConfigValues',
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    getSettings: builder.query<
      BaseApiResponse<Settings>,
      { companyId: number }
    >({
      query: ({ companyId }) => ({
        url: `/Settings/Company/${companyId}`,
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    updateSettings: builder.mutation<void, UpdateSettingsPayload>({
      query: (body) => ({
        url: `/Settings/${body.companyId}`,
        method: 'PUT',
        headers: getHeaders(),
        body,
      }),
    }),
    exportTable: builder.mutation<
      BaseApiResponse<string>,
      {
        tableName: ExportTableName;
        exportType: number;
        ids?: number[];
        requestedBy?: string;
      }
    >({
      query: ({ tableName, exportType, ids, requestedBy }) => ({
        url: generateQueryStr(`/${tableName}/Export?`, {
          exportType,
          requestedBy: requestedBy!,
        }),
        method: 'POST',
        headers: getHeaders(),
        body: ids,
      }),
    }),
    downloadFile: builder.query<string, { filePath: string }>({
      query: (data) => ({
        url: generateQueryStr(`/Invent3Pro/Download?`, data),
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    submitContactRequest: builder.mutation<void, ContactPayload>({
      query: (body) => ({
        url: `/Invent3Pro/SubmitContactUsRequest`,
        method: 'POST',
        headers: getHeaders(),
        body,
      }),
    }),
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
  }),
});

export const {
  useGetAppConfigValuesQuery,
  useUpdateSettingsMutation,
  useGetSettingsQuery,
  useExportTableMutation,
  useDownloadFileQuery,
  useSubmitContactRequestMutation,
  useUploadDataMutation,
  useGetMostRecentUploadQuery,
  useGetDataUploadFailedItemByUploadIdQuery,
} = utilityApi;
