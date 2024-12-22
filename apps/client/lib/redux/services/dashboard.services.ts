import { createApi } from '@reduxjs/toolkit/query/react';
import { BaseApiResponse, ListResponse, QueryParams } from '@repo/interfaces';
import { Asset } from '~/lib/interfaces/asset/general.interface';
import {
  AssetInRegion,
  AssetStatistics,
  ProjectedAndActualCostsByArea,
} from '~/lib/interfaces/dashboard.interfaces';
import { generateQueryStr } from '~/lib/utils/queryGenerator';
import baseQueryWithReauth from '../baseQueryWithReauth';
import { MaintenanceSchedule } from '~/lib/interfaces/maintenance.interfaces';

const getHeaders = () => ({
  'Content-Type': 'application/json',
});

type ID = string | number | undefined;
export const dashboardApi = createApi({
  reducerPath: 'dashboardApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: [],
  endpoints: (builder) => ({
    getRecentAssets: builder.query<
      BaseApiResponse<ListResponse<Asset>>,
      { id: ID; datePeriod: ID } & QueryParams
    >({
      query: ({ id, ...data }) => ({
        url: generateQueryStr(
          `/Invent3Pro/GetRecentAssetsDashBoardComponent/${id}?`,
          data
        ),
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    getUpcomingMaintenance: builder.query<
      BaseApiResponse<ListResponse<MaintenanceSchedule>>,
      { id: ID; datePeriod: number } & QueryParams
    >({
      query: ({ id, ...data }) => ({
        url: generateQueryStr(
          `/Invent3Pro/GetUpcomingMaintenanceDashBoardComponent/${id}?`,
          data
        ),
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    getAssetsInRegion: builder.query<
      BaseApiResponse<ListResponse<AssetInRegion>>,
      { id: ID } & QueryParams
    >({
      query: ({ id, ...data }) => ({
        url: generateQueryStr(
          `/Invent3Pro/GetAssetsInRegionDashBoardComponent/${id}?`,
          data
        ),
        method: 'GET',
        headers: getHeaders(),
      }),
      keepUnusedDataFor: 0,
    }),
    getDashboardStats: builder.query<
      BaseApiResponse<AssetStatistics>,
      { id: ID } & QueryParams
    >({
      query: ({ id, ...data }) => ({
        url: generateQueryStr(
          `/Invent3Pro/GetCountRelatedDashBoardComponents/${id}?`,
          data
        ),
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    getMaintenanceCostStats: builder.query<
      BaseApiResponse<ProjectedAndActualCostsByArea>,
      {
        id: ID;
        areaType: number;
        year: ID;
        useYearToDateLogic: boolean;
        monthNo?: ID;
      } & QueryParams
    >({
      query: ({ id, ...data }) => ({
        url: generateQueryStr(
          `/MaintenanceSchedules/GetProjectedAndActualCostsByArea/${id}?`,
          data
        ),
        method: 'GET',
        headers: getHeaders(),
        keepUnusedDataFor: 0,
      }),
    }),
  }),
});

export const {
  useGetAssetsInRegionQuery,
  useGetRecentAssetsQuery,
  useGetUpcomingMaintenanceQuery,
  useGetDashboardStatsQuery,
  useGetMaintenanceCostStatsQuery,
} = dashboardApi;
