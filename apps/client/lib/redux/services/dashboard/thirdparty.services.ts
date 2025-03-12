import { createApi } from '@reduxjs/toolkit/query/react';
import { BaseApiResponse } from '@repo/interfaces';
import baseQueryWithReauth from '../../baseQueryWithReauth';
import { UserActivity } from '~/lib/interfaces/dashboard/clientadmin.interfaces';
import { DashboardSummary } from '~/lib/interfaces/dashboard/thirdparty.interfaces';
import { Company } from '~/lib/interfaces/company.interfaces';

const getHeaders = () => ({
  'Content-Type': 'application/json',
});

export const thirdPartyApi = createApi({
  reducerPath: 'thirdPartyApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: [],
  endpoints: (builder) => ({
    getDashboardStat: builder.query<BaseApiResponse<DashboardSummary>, void>({
      query: () => ({
        url: `/Invent3Pro/GetThirdPartyDashboardSummary`,
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    getThirdPartCompanies: builder.query<BaseApiResponse<Company[]>, void>({
      query: () => ({
        url: `/Invent3Pro/GetThirdPartyCompanies`,
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    getUserActivityData: builder.query<BaseApiResponse<UserActivity[]>, void>({
      query: () => ({
        url: `/Invent3Pro/GetThirdPartyActivityLog`,
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
  }),
});

export const {
  useGetDashboardStatQuery,
  useGetThirdPartCompaniesQuery,
  useGetUserActivityDataQuery,
} = thirdPartyApi;
