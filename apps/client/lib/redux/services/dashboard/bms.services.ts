import { createApi } from '@reduxjs/toolkit/query/react';
import { BaseApiResponse } from '@repo/interfaces';
import baseQueryWithReauth from '../../baseQueryWithReauth';
import { generateQueryStr } from '~/lib/utils/queryGenerator';
import { string } from 'yup';

const getHeaders = () => ({
  'Content-Type': 'application/json',
});

export const BMSApi = createApi({
  reducerPath: 'BMSApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: [],
  endpoints: (builder) => ({
    getBMSHighestOccupancyRate: builder.query<
      BaseApiResponse<{
        facilityId: number;
        occupancyRate: number;
        currentOccupancy: number;
        maxOccupancy: number;
        facilityName: string;
        address: string;
      }>,
      void
    >({
      query: () => ({
        url: `/Invent3Pro/GetBMSHighestOccupancyRate`,
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    getBMSFacilityWithHighestSystemFailures: builder.query<
      BaseApiResponse<{
        facilityId: number;
        facilityName: string;
        address: string;
        CriticalFailureCount: number;
        WarningAlerts: number;
      }>,
      void
    >({
      query: () => ({
        url: `/Invent3Pro/GetBMSFacilityWithHighestSystemFailures`,
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    getBMSHighestNonCompliantFacility: builder.query<
      BaseApiResponse<{
        nonCompliances: number;
        facility: string;
        address: string;
      }>,
      void
    >({
      query: () => ({
        url: `/Invent3Pro/GetBMSHighestNonCompliantFacility`,
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    getBMSHighestCostFacility: builder.query<
      BaseApiResponse<{
        energyCost: number;
        waterCost: number;
        facility: string;
        address: string;
      }>,
      void
    >({
      query: () => ({
        url: `/Invent3Pro/GetBMSHighestCostFacility`,
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    getBMSTotalEnergyConsumptionForAllFacilities: builder.query<
      BaseApiResponse<{
        totalEnergyConsumption: number;
        targetEnergyConsumption: number;
      }>,
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
      BaseApiResponse<
        {
          totalEnergyConsumption: number;
          facility: string;
          address: string;
        }[]
      >,
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
      BaseApiResponse<{
        occupancyRatePercentage: number;
        totalZones: number;
        facilityName: string;
        address: string;
      }>,
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
      BaseApiResponse<{
        averageMaintenanceTime: number;
        unit: string;
        totalZones: number;
      }>,
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
      BaseApiResponse<{
        energyConsumption: number;
        occupancyRatePercentage: number;
        openIssues: number;
        upcomingMaintenance: number;
      }>,
      { facilityId: number }
    >({
      query: ({ facilityId }) => ({
        url: `/Invent3Pro/GetBMSFacilityDashboardSummary/${facilityId}`,
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    getBMSHvacOperationalEfficiency: builder.query<
      BaseApiResponse<{
        operationalEfficiency: number;
        averageTemperature: number;
        temperatureUnit: string;
        humidityLevels: number;
        energyConsumptionForMonth: number;
      }>,
      { facilityId: number }
    >({
      query: ({ facilityId }) => ({
        url: `/Invent3Pro/GetBMSHvacOperationalEfficiency/${facilityId}`,
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    GetBMSMostEnergyEfficientFacility: builder.query<
      BaseApiResponse<{
        facilityName: string;
        address: string;
        rating: string;
      }>,
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
} = BMSApi;
