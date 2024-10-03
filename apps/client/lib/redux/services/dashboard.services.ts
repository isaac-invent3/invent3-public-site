import { createApi } from '@reduxjs/toolkit/query/react';
import { generateQueryStr } from '~/lib/utils/queryGenerator';
import baseQueryWithReauth from '../baseQueryWithReauth';

const getHeaders = () => ({
  'Content-Type': 'application/json',
});
export const dashboardApi = createApi({
  reducerPath: 'dashboardApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: [],
  endpoints: (builder) => ({
    getRecentAssets: builder.query({
      query: ({ id, ...data }) => ({
        url: generateQueryStr(
          `/Invent3Pro/GetRecentAssetsDashBoardComponent/${id}?`,
          data
        ),
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    getUpcomingMaintenance: builder.query({
      query: ({ id, ...data }) => ({
        url: generateQueryStr(
          `/Invent3Pro/GetUpcomingMaintenanceDashBoardComponent/${id}?`,
          data
        ),
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    getAssetsInRegion: builder.query({
      query: ({ id, ...data }) => ({
        url: generateQueryStr(
          `/Invent3Pro/GetAssetsInRegionDashBoardComponent/${id}?`,
          data
        ),
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    getDashboardStats: builder.query({
      query: ({ id, ...data }) => ({
        url: generateQueryStr(
          `/Invent3Pro/GetCountRelatedDashBoardComponents/${id}?`,
          data
        ),
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
  }),
});

export const {
  useGetAssetsInRegionQuery,
  useGetRecentAssetsQuery,
  useGetUpcomingMaintenanceQuery,
  useGetDashboardStatsQuery,
} = dashboardApi;
