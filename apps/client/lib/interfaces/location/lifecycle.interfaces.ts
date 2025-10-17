interface LifeCycleSummary {
  totalFacilitiesCompared: number;
  bestPerformingFacilityName: string;
  worstPerformingFacilityName: string;
  meanRul: number;
  costByFacility: CostByFacility[];
}

interface CostByFacility {
  facilityName: string;
  totalLifeCycleCost: number;
}

interface LifecyleComparisionReportRUL {
  key: string;
  value: number;
}

interface LifecycleComparisonReport {
  facilityName: string;
  meanAssetAge: number;
  meanLifeCycleCost: number;
  residualVale: number;
  meanFailure_Year: number;
  meanRiskScore: string;
}

interface LifeCycleFilter {
  datePeriod: number[];
  facilities: number[];
  assetCategories: number[];
  metricsToCompare: number[];
  assetStatus: number[];
}

export type {
  LifeCycleSummary,
  CostByFacility,
  LifecyleComparisionReportRUL,
  LifecycleComparisonReport,
  LifeCycleFilter,
};
