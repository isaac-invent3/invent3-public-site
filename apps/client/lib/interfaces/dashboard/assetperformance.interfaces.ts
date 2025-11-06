interface PerformanceSummary {
  totalAssets: number;
  averageUptime: number;
  assetsInDowntime: number;
  averageHealthScore: number;
}

interface DistributionByCategory {
  totalAssets: number;
  good: number;
  fair: number;
  poor: number;
}

interface ReliabilityMetrics {
  assetCategory: string;
  mbtf: number;
  mttr: number;
}

interface PredictiveRiskLevel {
  facility: string;
  riskScore: number;
  conditionIndex: number;
  assetCostValue: number;
  facilityType: string;
}

interface DashboardByCateogry {
  assetCategory: string;
  assetCount: number;
  avgUptime: number;
  avgHealthScore: number;
  mbtf: number;
  mttr: number;
  riskLevel: string;
  displayColorCode: string;
}

interface PerformanceTrend {
  assetName: string;
  trends: Trend[];
}

interface Trend {
  day: Date;
  value: number;
}

export type {
  PerformanceSummary,
  DistributionByCategory,
  ReliabilityMetrics,
  PredictiveRiskLevel,
  DashboardByCateogry,
  PerformanceTrend,
};
