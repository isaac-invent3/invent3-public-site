interface DashboardStats {
  totalAssetsManaged: number;
  totalAssetValue: number;
  activeMaintenancePlans: number;
  pendingApproval: number;
  ticketResolutionRate: number;
  totalAssetsManagedPercentageChange: number;
  totalAssetValuePercentageChange: number;
  activeMaintenancePlansPercentageChange: number;
  pendingApprovalPercentageChange: number;
  ticketResolutionRatePercentageChange: number;
}

interface AssetDistribution {
  assetCount: number;
  stateId: number;
  stateName: string;
  countryId: number;
}

interface AssetTrends {
  noOfAddedAssets: number;
  noOfDisposedAssets: number;
  monthId: number;
  year: number;
}

interface MaintenanceTrend {
  scheduled: number;
  unplanned: number;
  monthId: number;
  year: number;
}

interface TicketTrends {
  ticketName: string;
  percentage: number;
  datePeriod: number;
}

interface Compliance {
  complianceStandard: string;
  status: string;
  lastAuditDate: Date;
  expiryDate: Date;
}

interface TicketResolution {
  ticketId: number;
  category: string;
  priority: string;
  assignedTo: string;
  status: string;
}

interface FinancialImpact {
  assetName: string;
  category: string;
  initialCost: number;
  currentValue: number;
  depreciationRate: number;
}

interface PendingApproval {
  requestId: number;
  requestType: string;
  submittedBy: string;
  department: string;
  operations: number;
}

interface AssetPerformance {
  assetName: string;
  category: string;
  usageRate: number;
  currentValue: number;
  depreciationRate: number;
  status: string;
}

interface MaintenanceBudget {
  category: string;
  totalAssets: number;
  maintenanceCost: number;
  preventive: number;
  corrective: number;
}

interface AssetTrendsData {
  assetTrends: AssetTrends[];
  percentageChange: -12;
}
interface MaintenanceTrendData {
  taskCompletionRates: MaintenanceTrend[];
}

export type {
  DashboardStats,
  AssetDistribution,
  AssetTrends,
  MaintenanceTrend,
  TicketTrends,
  Compliance,
  TicketResolution,
  FinancialImpact,
  PendingApproval,
  AssetPerformance,
  AssetTrendsData,
  MaintenanceTrendData,
  MaintenanceBudget,
};
