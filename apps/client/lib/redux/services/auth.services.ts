import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryWithReauth from '../baseQueryWithReauth';
import { BaseApiResponse } from '@repo/interfaces';
import { generateQueryStr } from '~/lib/utils/queryGenerator';

const getHeaders = () => ({
  'Content-Type': 'application/json',
});
export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: [],
  endpoints: (builder) => ({
    check2FA: builder.query<
      BaseApiResponse<{ twoFactorAuthuenticationEnabled: boolean }>,
      { username: string; companySlug?: string }
    >({
      query: ({ companySlug, ...data }) => ({
        url: generateQueryStr(`/Invent3Pro/Request2FA?`, data),
        method: 'GET',
        headers: {
          ...getHeaders(),
          ...(companySlug ? { 'X-Tenant-ID': companySlug } : {}),
        },
      }),
    }),
  }),
});

export const { useCheck2FAQuery } = authApi;
