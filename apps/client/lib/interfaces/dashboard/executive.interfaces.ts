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
  categoryName: string;
  percentage: number;
  totalTicketsResolved: number;
}

interface Compliance {
  complianceStandard: string;
  status: string;
  lastAuditDate: Date;
  expiryDate: Date;
}

interface FinancialImpact {
  depreciationId: number;
  assetName: string;
  brandName: string;
  assetCategory: string;
  initialValue: number;
  currentValue: null;
  depreciationRate: number;
  depreciationDate: Date;
  isDeleted: boolean;
}

interface PendingApproval {
  requestId: number;
  requestType: string;
  submittedBy: string;
  department: string;
  operations: number;
}

interface AssetPerformance {
  depreciationId: number;
  assetName: string;
  brandName: string;
  assetCategory: string;
  initialValue: number;
  currentValue: null;
  depreciationRate: number;
  depreciationDate: Date;
  isDeleted: boolean;
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
  monthId: number;
  monthName: string;
  totalPlannedMaintenanceCount: number;
  totalUnplannedMaintenanceCount: number;
}

export type {
  DashboardStats,
  AssetDistribution,
  AssetTrends,
  MaintenanceTrend,
  TicketTrends,
  Compliance,
  FinancialImpact,
  PendingApproval,
  AssetPerformance,
  AssetTrendsData,
  MaintenanceTrendData,
  MaintenanceBudget,
};
