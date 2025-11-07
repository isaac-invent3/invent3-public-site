import { BaseEntity } from '@repo/interfaces';

interface CostAnalyticsDashboardSummary {
  totalMaintenanceCost: number;
  maintenanceCostChangePercent: number;
  maintenanceCostComparedTo: string;
  averageCost: number;
  totalAssets: number;
  predictiveMaintenanceSavings: number;
  predictiveMaintenanceEfficiency: string;
  energyCost: number;
  consumptionCostChangePercent: number;
  consumptionCostComparedTo: string;
}

interface CostAnalyticsDashboardCostBreakdownByType {
  breakdown: {
    preventive: number;
    corrective: number;
    energy: number;
    labor: number;
    replacement_Disposal: number;
  };
}

interface CostAnalyticsROIMetrics {
  roi: number;
  averageCostPerAsset: number;
  trend: number;
  note: string;
}

interface CostAnalyticsMonthlyCostTrend {
  trendData: TrendDatum[];
}

interface TrendDatum {
  month: string;
  maintenance: number;
  energy: number;
  labor: number;
  predictiveSavings: number;
}

interface FacilitiesByCost {
  facility: string;
  cost: number;
}

interface CategoryByCost {
  category: string;
  cost: number;
}

interface CostAnalyticsDetailedCostBreakdown {
  asset: string;
  facility: string;
  category: string;
  maintenance: number;
  energy: number;
  labor: number;
  total: number;
  savings: number;
  roi: string;
  lastMaintenance: Date;
}

interface CostType extends BaseEntity {
  costTypeId: number;
  typeName: string;
  description: string;
}

export type {
  CostAnalyticsDashboardSummary,
  CostAnalyticsDashboardCostBreakdownByType,
  CostAnalyticsROIMetrics,
  TrendDatum,
  CostAnalyticsMonthlyCostTrend,
  FacilitiesByCost,
  CategoryByCost,
  CostAnalyticsDetailedCostBreakdown,
  CostType,
};
