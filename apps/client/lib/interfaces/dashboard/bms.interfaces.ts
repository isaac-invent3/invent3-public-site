import { BaseEntity } from '@repo/interfaces';

interface HighestOccupancyRate {
  facilityId: number;
  occupancyRate: number;
  currentOccupancy: number;
  maxOccupancy: number;
  facilityName: string;
  address: string;
}

interface HighestSystemFailures {
  facilityId: number;
  facilityName: string;
  address: string;
  CriticalFailureCount: number;
  WarningAlerts: number;
}

interface HighestNonCompliantFacility {
  nonCompliances: number;
  facility: string;
  address: string;
}

interface HighestCostFacility {
  energyCost: number;
  waterCost: number;
  facility: string;
  address: string;
}

interface TotalEnergyConsumptionForAllFacilities {
  totalEnergyConsumption: number;
  targetEnergyConsumption: number;
}

interface HighestEnergyConsumptionByFacility {
  totalEnergyConsumption: number;
  facility: string;
  address: string;
}

interface OccupanyRate {
  occupancyRatePercentage: number;
  totalZones: number;
  facilityName: string;
  address: string;
}

interface AverageMaintenanceTime {
  averageMaintenanceTime: number;
  unit: string;
  totalZones: number;
}

interface FacilityDashboardSummary {
  energyConsumption: { key: string; value: number };
  occupancyRatePercentage: number;
  openIssues: number;
  upcomingMaintenance: number;
}

interface HvacOperationalEfficiency {
  operationalEfficiency: number;
  averageTemperature: number;
  temperatureUnit: string;
  humidityLevels: {
    key: string;
    value: number;
  };
  energyConsumptionForMonth: number;
}

interface MostEnergyEfficientFacility {
  facilityName: string;
  address: string;
  rating: string;
}

interface EnergyConsumption {
  totalEnergyConsumption: EnergyUseIntensity;
  peakDemand: EnergyUseIntensity;
  energyUseIntensity: EnergyUseIntensity;
  realTimePowerUsage: EnergyUseIntensity;
}

interface EnergyUseIntensity {
  key: string;
  value: number;
}

interface EnergyTrend {
  month: string;
  monthId: number;
  totalEnergyConsumption: number;
  peakDemand: number;
}

interface EnvironmentalControlOverview {
  currentTemperature: number;
  airQuality: AirQuality;
  coLevel: AirQuality;
}

interface AirQuality {
  key: string;
  value: number;
}

interface SystemStatus {
  hvacSystemStatus: number;
  lastMaintenanceDate: string;
  sensorConnectivity: string;
  filterStatus: number;
  airQualityRating: number;
}

interface ZoneControl {
  temperatureSetPoint: CoLevels;
  humiditySetPoint: CoLevels;
  lightningLevel: number;
  energyConsumption: CoLevels;
  coLevels: CoLevels;
}

interface CoLevels {
  key: string;
  value: number;
}

interface HvacSystemStatus {
  operationalEfficency: number;
  averageTemperature: AverageTemperature;
  energyConsumption: AverageTemperature;
  humiditySetPoint: AverageTemperature;
}

interface AverageTemperature {
  key: string;
  value: number;
}

interface EnvironmentControlSummary {
  temperature: CoLevels;
  humiditySetPoint: CoLevels;
  coLevels: CoLevels;
}

interface OccupancyManagement {
  totalZones: number;
  currentOccupancy1: number;
  currentOccupancy2: number;
  maxOccupancy1: number;
  maxOccupancy2: number;
  firstDept: number;
  SecondDept: number;
  floorRoomAvailaible: number;
  totalFloorRooms: number;
  room1Name: string;
  room2Name: string;
}

interface OccupancyTrend {
  month: string;
  monthId: number;
  occupancy: number;
}

interface AllowedCapacity {
  safe: Caution;
  caution: Caution;
  highAlert: Caution;
}

interface Caution {
  key: number;
  value: number;
}

interface DensityMetrics {
  metric: Metric;
}

interface Metric {
  key: string;
  value: number;
}

interface PredictiveMaintenanceOverview {
  totalMaintenance: number;
  scheduledMaintenance: number;
  peakDemand: number;
  realTimePowerUsage: number;
}

interface AssetHealthStatus {
  healthy: number;
  warning: number;
  critical: number;
}

interface ConditionReadings {
  month: string;
  monthId: number;
  good: number;
  warning: number;
  bad: number;
}

interface FinancialInsightsOverview {
  energyCostSavingsByQuarter: number;
  operationalConst: number;
  maintenanceCost: number;
  projectedAnnualSavings: number;
}

interface CostBreakdownBySystems {
  hvac: number;
  lighting: number;
  printers: number;
  pumps: number;
  officeEquipments: number;
  elevators: number;
  doors: number;
}

interface MaintenancePriorityList {
  asset: string;
  assetId: number;
  zone: string;
  status: string;
  displayColorCode: string;
}

interface EnergyCostTrend {
  month: string;
  monthId: number;
  totalEnergyCost: number;
}

interface SustainabilityMetrics {
  energyConsumption: EnergyConsumptionType;
  carbonFootprint: CarbonFootprint;
  waterUsage: CarbonFootprint;
  wasteGenerated: CarbonFootprint;
  recycledWastePercentage: number;
  energyEfficiencyRating: string;
}

interface CarbonFootprint {
  key: string;
  value: number;
}

interface EnergyConsumptionType {
  key: string;
  value: string;
}

interface PredictiveRecommendation {
  recommendation: string;
  systemContextType: string;
  contextId: string;
  contextName: string;
}

interface BudgetActualExpenditure {
  year: number;
  monthId: number;
  month: number;
  budget: number;
  actualConsumption: number;
}

interface FinancialTrend {
  month: number;
  monthName: string;
  totalEnergyCost: number;
}

interface MonthlyCostSpend {
  totalMonthlyEnergySpend: number;
  percentageChange: number;
  costPerKWh: number;
}

interface OccupancyDistribution {
  zone: string;
  currentOccupancy: number;
  maxCapacity: number;
}

interface BmsReadingSubCategory extends BaseEntity {
  subCategoryId: number;
  categoryId: number;
  subCategoryName: string;
}

interface AssetBMSReading {
  day: string;
  averageReadingValue: number;
}

export type {
  HighestOccupancyRate,
  HighestSystemFailures,
  HighestNonCompliantFacility,
  HighestCostFacility,
  TotalEnergyConsumptionForAllFacilities,
  HighestEnergyConsumptionByFacility,
  OccupanyRate,
  AverageMaintenanceTime,
  FacilityDashboardSummary,
  HvacOperationalEfficiency,
  MostEnergyEfficientFacility,
  EnergyConsumption,
  EnergyTrend,
  EnvironmentalControlOverview,
  SystemStatus,
  ZoneControl,
  HvacSystemStatus,
  EnvironmentControlSummary,
  OccupancyManagement,
  OccupancyTrend,
  AllowedCapacity,
  DensityMetrics,
  PredictiveMaintenanceOverview,
  AssetHealthStatus,
  ConditionReadings,
  FinancialInsightsOverview,
  CostBreakdownBySystems,
  MaintenancePriorityList,
  EnergyCostTrend,
  SustainabilityMetrics,
  PredictiveRecommendation,
  BudgetActualExpenditure,
  FinancialTrend,
  MonthlyCostSpend,
  OccupancyDistribution,
  BmsReadingSubCategory,
  AssetBMSReading,
};
