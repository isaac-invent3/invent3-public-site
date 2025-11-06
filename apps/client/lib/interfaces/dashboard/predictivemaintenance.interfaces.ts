interface PredictiveMaintenanceDashboardSummary {
  assetsMonitored: number;
  totalAssets: number;
  activeAnomalies: number;
  highRiskAssets: number;
  modelAccuracyRate: number;
}

interface AssetRiskDistribution {
  totalAssets: number;
  highRisk: Risk;
  mediumRisk: Risk;
  lowRisk: Risk;
}

interface Risk {
  count: number;
  percent: number;
}

interface AnomalyTrend {
  date: string;
  predictedFailures: number;
  anomaliesDetected: number;
}

interface PredictedFailures {
  category: string;
  days0to7: number;
  days8to14: number;
  days15to30: number;
}

interface TopPerformingModel {
  model: string;
  accuracy: number;
}

interface ModelAccuracyTrend {
  month: string;
  accuracy: number;
}

interface AssetPredictiveSummary {
  assetName: string;
  category: string;
  facility: string;
  predictedFailure: Date;
  riskScore: string;
  anomalies: number;
  confidence: string;
  lastSync: Date;
  status: string;
}

export type {
  PredictiveMaintenanceDashboardSummary,
  AssetRiskDistribution,
  Risk,
  AnomalyTrend,
  PredictedFailures,
  TopPerformingModel,
  ModelAccuracyTrend,
  AssetPredictiveSummary,
};
