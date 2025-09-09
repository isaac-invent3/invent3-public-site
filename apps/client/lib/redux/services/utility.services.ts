import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryWithReauth from '../baseQueryWithReauth';
import {
  AppConfig,
  ExportTableName,
} from '~/lib/interfaces/general.interfaces';
import { BaseApiResponse } from '@repo/interfaces';
import {
  ContactPayload,
  Settings,
  UpdateSettingsPayload,
  WaitlistPayload,
} from '~/lib/interfaces/settings.interfaces';
import { generateQueryStr } from '~/lib/utils/queryGenerator';
import { TicketCategory } from '~/lib/interfaces/ticket.interfaces';

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
        showInvent3?: boolean;
        extraData?: {
          taskStatus?: string;
          tabScope?: TicketCategory;
          userId?: number;
          statusCategory?: string;
        };
      }
    >({
      query: ({
        tableName,
        exportType,
        ids,
        requestedBy,
        showInvent3,
        extraData,
      }) => ({
        url: generateQueryStr(
          `/${showInvent3 ? 'Invent3Pro/' : ''}${tableName}/Export?`,
          {
            exportType,
            requestedBy: requestedBy!,
            ...extraData,
          }
        ),
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
    submitWaitlistRequest: builder.mutation<void, WaitlistPayload>({
      query: (body) => ({
        url: `/Invent3Pro/SubmitWaitlistRequest`,
        method: 'POST',
        headers: getHeaders(),
        body,
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
  useSubmitWaitlistRequestMutation,
} = utilityApi;
