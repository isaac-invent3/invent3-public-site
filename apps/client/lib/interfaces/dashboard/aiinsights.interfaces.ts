interface MLInsightSummaryMetrics {
  totalPredictionsThisWeek: number;
  accuracyRate7dRolling: number;
  activeAIAlerts: number;
  optimizationOpportunities: number;
}

interface MLAnomalousAsset {
  name: string;
  score: number;
}

interface MLAnomalyDistribution {
  mechanical: number;
  electrical: number;
  hvac: number;
  other: number;
}

interface MLAnomalyTimeline {
  hour: string;
  count: number;
}

interface MLInsightTaskVolume {
  day: string;
  tasks: number;
}

interface MLInsightGetRecommendationsSummary {
  highImpact: Impact;
  mediumImpact: Impact;
  quickWin: Impact;
}

interface Impact {
  title: string;
  impact: string;
  estimatedSavings: string;
  description: string;
}

interface AILearningCurve {
  week: number;
  accuracy: number;
}

interface AssetFailureTrend {
  month: string;
  probability: number;
}

interface TopPerformingModel {
  modelName: string;
  accuracy: number;
  datasetSize: string;
}

interface MLInsightSuggestion {
  id: number;
  title: string;
  estimatedSavings: string;
  category: string;
}

interface MLInsightPredictedFailure {
  assetName: string;
  failureDate: Date;
  confidence: string;
  status: string;
}

interface MLInsightFeed {
  title: string;
  description: string;
  confidence: number;
  timestamp: string;
}

interface MLInsightRecommendation {
  asset: string;
  recommendation: string;
  confidence: number;
}

interface MLInsightTrend {
  metric: string;
  direction: string;
  changePercent: number;
}

interface GenerateTicketFromAIInsightPayload {
  title: string;
  description: string;
  confidence: string;
  insightDate: string;
}

export type {
  MLInsightSummaryMetrics,
  MLAnomalousAsset,
  MLAnomalyDistribution,
  MLAnomalyTimeline,
  MLInsightTaskVolume,
  MLInsightGetRecommendationsSummary,
  AILearningCurve,
  AssetFailureTrend,
  TopPerformingModel,
  MLInsightSuggestion,
  MLInsightPredictedFailure,
  MLInsightFeed,
  MLInsightRecommendation,
  MLInsightTrend,
  GenerateTicketFromAIInsightPayload,
};
