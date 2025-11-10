import { baseApi } from '~/lib/redux/services/baseApi.services';

import { BaseApiResponse } from '@repo/interfaces';
import { generateQueryStr } from '~/lib/utils/queryGenerator';

const getHeaders = () => ({
  'Content-Type': 'application/json',
});
export const authApi = baseApi.injectEndpoints({
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
