import { createApi } from '@reduxjs/toolkit/query/react';
import { BaseApiResponse } from '@repo/interfaces';
import baseQueryWithReauth from '../../baseQueryWithReauth';
import { DashboardStats } from '~/lib/interfaces/dashboard/clientadmin.interfaces';
import { generateQueryStr } from '~/lib/utils/queryGenerator';

const getHeaders = () => ({
  'Content-Type': 'application/json',
});

export const BMSApi = createApi({
  reducerPath: 'BMSApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: [],
  endpoints: (builder) => ({
    getDashboardStat: builder.query<
      BaseApiResponse<DashboardStats>,
      { countryId: number; regionId?: number }
    >({
      query: ({ countryId, ...data }) => ({
        url: generateQueryStr(
          `/Invent3Pro/GetCountRelatedClientAdminDashBoardComponents/${countryId}?`,
          data
        ),
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
  }),
});

export const {} = BMSApi;
