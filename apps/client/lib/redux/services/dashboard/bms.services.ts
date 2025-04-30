import { createApi } from '@reduxjs/toolkit/query/react';
import { BaseApiResponse } from '@repo/interfaces';
import baseQueryWithReauth from '../../baseQueryWithReauth';
import { generateQueryStr } from '~/lib/utils/queryGenerator';
import {
  AllowedCapacity,
  AssetHealthStatus,
  AverageMaintenanceTime,
  ConditionReadings,
  CostBreakdownBySystems,
  DensityMetrics,
  EnergyConsumption,
  EnergyCostTrend,
  EnergyTrend,
  EnvironmentalControlOverview,
  EnvironmentControlSummary,
  FacilityDashboardSummary,
  FinancialInsightsOverview,
  HighestCostFacility,
  HighestEnergyConsumptionByFacility,
  HighestNonCompliantFacility,
  HighestOccupancyRate,
  HighestSystemFailures,
  HvacOperationalEfficiency,
  HvacSystemStatus,
  MaintenancePriorityList,
  MostEnergyEfficientFacility,
  OccupancyManagement,
  OccupancyTrend,
  OccupanyRate,
  PredictiveMaintenanceOverview,
  SystemStatus,
  TotalEnergyConsumptionForAllFacilities,
  ZoneControl,
} from '~/lib/interfaces/dashboard/bms.interfaces';

const getHeaders = () => ({
  'Content-Type': 'application/json',
});

export const BMSApi = createApi({
  reducerPath: 'BMSApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: [],
  endpoints: (builder) => ({
    getBMSHighestOccupancyRate: builder.query<
      BaseApiResponse<HighestOccupancyRate>,
      void
    >({
      query: () => ({
        url: `/Invent3Pro/GetBMSHighestOccupancyRate`,
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    getBMSFacilityWithHighestSystemFailures: builder.query<
      BaseApiResponse<HighestSystemFailures>,
      void
    >({
      query: () => ({
        url: `/Invent3Pro/GetBMSFacilityWithHighestSystemFailures`,
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    getBMSHighestNonCompliantFacility: builder.query<
      BaseApiResponse<HighestNonCompliantFacility>,
      void
    >({
      query: () => ({
        url: `/Invent3Pro/GetBMSHighestNonCompliantFacility`,
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    getBMSHighestCostFacility: builder.query<
      BaseApiResponse<HighestCostFacility>,
      void
    >({
      query: () => ({
        url: `/Invent3Pro/GetBMSHighestCostFacility`,
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    getBMSTotalEnergyConsumptionForAllFacilities: builder.query<
      BaseApiResponse<TotalEnergyConsumptionForAllFacilities>,
      { monthId?: number }
    >({
      query: (data) => ({
        url: generateQueryStr(
          `/Invent3Pro/GetBMSTotalEnergyConsumptionForAllFacilities?`,
          data
        ),
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    getBMSHighestEnergyConsumptionByFacility: builder.query<
      BaseApiResponse<HighestEnergyConsumptionByFacility[]>,
      { monthId?: number }
    >({
      query: (data) => ({
        url: generateQueryStr(
          `/Invent3Pro/GetBMSHighestEnergyConsumptionByFacility?`,
          data
        ),
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    getBMSOccupanyRate: builder.query<
      BaseApiResponse<OccupanyRate>,
      { facilityId: number; buildingId?: number; floorId?: number }
    >({
      query: ({ facilityId, ...data }) => ({
        url: generateQueryStr(
          `/Invent3Pro/GetBMSOccupanyRate/${facilityId}?`,
          data
        ),
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    getBMSAverageMaintenanceTime: builder.query<
      BaseApiResponse<AverageMaintenanceTime>,
      { facilityId: number; buildingId?: number; floorId?: number }
    >({
      query: ({ facilityId, ...data }) => ({
        url: generateQueryStr(
          `/Invent3Pro/GetBMSAverageMaintenanceTime/${facilityId}?`,
          data
        ),
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    getBMSTotalFaultsDetected: builder.query<
      BaseApiResponse<{
        totalFaultsDetected: number;
      }>,
      { facilityId: number; buildingId?: number; floorId?: number }
    >({
      query: ({ facilityId, ...data }) => ({
        url: generateQueryStr(
          `/Invent3Pro/GetBMSTotalFaultsDetected/${facilityId}?`,
          data
        ),
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    getBMSScheduledMaintenance: builder.query<
      BaseApiResponse<{
        scheduledMaintenance: number;
      }>,
      { facilityId: number; buildingId?: number; floorId?: number }
    >({
      query: ({ facilityId, ...data }) => ({
        url: generateQueryStr(
          `/Invent3Pro/GetBMSScheduledMaintenance/${facilityId}?`,
          data
        ),
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    getBMSEnergyConsumedByBMSCategory: builder.query<
      BaseApiResponse<
        {
          energyConsumed: number;
          category: string;
        }[]
      >,
      { facilityId: number; buildingId?: number; floorId?: number }
    >({
      query: ({ facilityId, ...data }) => ({
        url: generateQueryStr(
          `/Invent3Pro/GetBMSEnergyConsumedByBMSCategory/${facilityId}?`,
          data
        ),
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    getBMSDailyEnergyConsumption: builder.query<
      BaseApiResponse<
        {
          energyConsumed: number;
          category: string;
        }[]
      >,
      { facilityId: number; buildingId?: number; floorId?: number }
    >({
      query: ({ facilityId, ...data }) => ({
        url: generateQueryStr(
          `/Invent3Pro/GetBMSDailyEnergyConsumption/${facilityId}?`,
          data
        ),
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    getBMSFacilityDashboardSummary: builder.query<
      BaseApiResponse<FacilityDashboardSummary>,
      { facilityId: number }
    >({
      query: ({ facilityId }) => ({
        url: `/Invent3Pro/GetBMSFacilityDashboardSummary/${facilityId}`,
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    getBMSHvacOperationalEfficiency: builder.query<
      BaseApiResponse<HvacOperationalEfficiency>,
      { facilityId: number }
    >({
      query: ({ facilityId }) => ({
        url: `/Invent3Pro/GetBMSHvacOperationalEfficiency/${facilityId}`,
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    GetBMSMostEnergyEfficientFacility: builder.query<
      BaseApiResponse<MostEnergyEfficientFacility>,
      { datePeriod?: number }
    >({
      query: (data) => ({
        url: generateQueryStr(
          `/Invent3Pro/GetBMSMostEnergyEfficientFacility?`,
          data
        ),
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    getBMSEnergyConsumption: builder.query<
      BaseApiResponse<EnergyConsumption>,
      { facilityId: number }
    >({
      query: ({ facilityId }) => ({
        url: `/Invent3Pro/GetBMSEnergyConsumption/${facilityId}`,
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    getBMSEnergyTrends: builder.query<
      BaseApiResponse<EnergyTrend[]>,
      { facilityId: number; room?: number }
    >({
      query: ({ facilityId, ...data }) => ({
        url: generateQueryStr(
          `/Invent3Pro/GetBMSEnergyTrends/${facilityId}`,
          data
        ),
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    getBMSEnvironmentalControlOverview: builder.query<
      BaseApiResponse<EnvironmentalControlOverview>,
      { facilityId: number }
    >({
      query: ({ facilityId }) => ({
        url: `/Invent3Pro/GetBMSEnvironmentalControlOverview/${facilityId}`,
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    getBMSSystemStatus: builder.query<
      BaseApiResponse<SystemStatus>,
      { facilityId: number }
    >({
      query: ({ facilityId }) => ({
        url: `/Invent3Pro/GetBMSSystemStatus/${facilityId}`,
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    getBMSZoneControl: builder.query<
      BaseApiResponse<ZoneControl>,
      { facilityId: number; RoomId?: number }
    >({
      query: ({ facilityId, ...data }) => ({
        url: generateQueryStr(
          `/Invent3Pro/GetBMSZoneControl/${facilityId}`,
          data
        ),
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    getBMSHvacSystemStatus: builder.query<
      BaseApiResponse<HvacSystemStatus>,
      { facilityId: number }
    >({
      query: ({ facilityId }) => ({
        url: `/Invent3Pro/GetBMSHvacSystemStatus/${facilityId}`,
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    getBMSEnvironmentControlSummary: builder.query<
      BaseApiResponse<EnvironmentControlSummary>,
      { facilityId: number; RoomId?: number }
    >({
      query: ({ facilityId, ...data }) => ({
        url: generateQueryStr(
          `/Invent3Pro/GetBMSEnvironmentControlSummary/${facilityId}`,
          data
        ),
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    getBMSOccupancyManagement: builder.query<
      BaseApiResponse<OccupancyManagement>,
      { facilityId: number }
    >({
      query: ({ facilityId }) => ({
        url: `/Invent3Pro/GetBMSOccupancyMgt/${facilityId}`,
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    getBMSOccupancyTrend: builder.query<
      BaseApiResponse<OccupancyTrend[]>,
      { facilityId: number }
    >({
      query: ({ facilityId }) => ({
        url: `/Invent3Pro/GetBMSOccupancyTrend/${facilityId}`,
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    getBMSAllowedCapacity: builder.query<
      BaseApiResponse<AllowedCapacity>,
      { facilityId: number }
    >({
      query: ({ facilityId }) => ({
        url: `/Invent3Pro/GetBMSAllowedCapacity/${facilityId}`,
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    getBMSDensityMetrics: builder.query<
      BaseApiResponse<DensityMetrics>,
      { facilityId: number }
    >({
      query: ({ facilityId }) => ({
        url: `/Invent3Pro/GetBMSDensityMetrics/${facilityId}`,
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    getBMSPredictiveMaintenanceOverview: builder.query<
      BaseApiResponse<PredictiveMaintenanceOverview>,
      { facilityId: number }
    >({
      query: ({ facilityId }) => ({
        url: `/Invent3Pro/GetBMSPredictiveMaintenanceOverview/${facilityId}`,
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    getBMSAssetHealthStatus: builder.query<
      BaseApiResponse<AssetHealthStatus>,
      { facilityId: number; RoomId?: number }
    >({
      query: ({ facilityId, ...data }) => ({
        url: generateQueryStr(
          `/Invent3Pro/GetBMSAssetHealthStatus/${facilityId}`,
          data
        ),
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    getBMSConditionReadings: builder.query<
      BaseApiResponse<ConditionReadings[]>,
      { facilityId: number; Room?: number }
    >({
      query: ({ facilityId, ...data }) => ({
        url: generateQueryStr(
          `/Invent3Pro/GetBMSConditionReadings/${facilityId}`,
          data
        ),
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    getBMSFinancialInsightsOverview: builder.query<
      BaseApiResponse<FinancialInsightsOverview>,
      { facilityId: number }
    >({
      query: ({ facilityId }) => ({
        url: `/Invent3Pro/GetBMSFinancialInsightsOverview/${facilityId}`,
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    getBMSCostBreakdownBySystems: builder.query<
      BaseApiResponse<CostBreakdownBySystems>,
      { facilityId: number; RoomId?: number }
    >({
      query: ({ facilityId, ...data }) => ({
        url: generateQueryStr(
          `/Invent3Pro/GetBMSCostBreakdownBySystems/${facilityId}`,
          data
        ),
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    getBMSMaintenancePriorityList: builder.query<
      BaseApiResponse<MaintenancePriorityList[]>,
      { facilityId: number; datePeriod?: number }
    >({
      query: ({ facilityId, ...data }) => ({
        url: generateQueryStr(
          `/Invent3Pro/GetBMSMaintenancePriorityList${facilityId}`,
          data
        ),
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    getBMSEnergyCostTrend: builder.query<
      BaseApiResponse<EnergyCostTrend[]>,
      { facilityId: number; RoomId?: number }
    >({
      query: ({ facilityId, ...data }) => ({
        url: generateQueryStr(
          `/Invent3Pro/GetBMSEnergyCostTrend/${facilityId}`,
          data
        ),
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
  }),
});

export const {
  useGetBMSFacilityWithHighestSystemFailuresQuery,
  useGetBMSHighestOccupancyRateQuery,
  useGetBMSHighestNonCompliantFacilityQuery,
  useGetBMSHighestCostFacilityQuery,
  useGetBMSTotalEnergyConsumptionForAllFacilitiesQuery,
  useGetBMSAverageMaintenanceTimeQuery,
  useGetBMSHighestEnergyConsumptionByFacilityQuery,
  useGetBMSOccupanyRateQuery,
  useGetBMSTotalFaultsDetectedQuery,
  useGetBMSScheduledMaintenanceQuery,
  useGetBMSEnergyConsumedByBMSCategoryQuery,
  useGetBMSDailyEnergyConsumptionQuery,
  useGetBMSFacilityDashboardSummaryQuery,
  useGetBMSHvacOperationalEfficiencyQuery,
  useGetBMSMostEnergyEfficientFacilityQuery,
  useGetBMSEnergyConsumptionQuery,
  useGetBMSEnergyTrendsQuery,
  useGetBMSEnvironmentalControlOverviewQuery,
  useGetBMSHvacSystemStatusQuery,
  useGetBMSSystemStatusQuery,
  useGetBMSZoneControlQuery,
  useGetBMSEnvironmentControlSummaryQuery,
  useGetBMSOccupancyManagementQuery,
  useGetBMSOccupancyTrendQuery,
  useGetBMSAllowedCapacityQuery,
  useGetBMSDensityMetricsQuery,
  useGetBMSPredictiveMaintenanceOverviewQuery,
  useGetBMSAssetHealthStatusQuery,
  useGetBMSConditionReadingsQuery,
  useGetBMSCostBreakdownBySystemsQuery,
  useGetBMSFinancialInsightsOverviewQuery,
  useGetBMSMaintenancePriorityListQuery,
  useGetBMSEnergyCostTrendQuery,
} = BMSApi;
