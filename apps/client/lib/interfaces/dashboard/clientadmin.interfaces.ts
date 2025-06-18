interface MaintenanceDowntime {
  maintenancePercentage: number;
  downTimePercentage: number;
  percentageChange: number;
  monthId: number;
}

interface DashboardStats {
  totalAssets: number;
  totalAssetsPercentageChange: number;
  assetsNotInUse: number;
  openTickets: number;
  openTicketsPercentageChange: number;
  pendingTasks: number;
  highPriorityPendingTasks: number;
  mediumPriorityPendingTasks: number;
  lowPriorityPendingTasks: number;
  totalNoOfVendors: number;
  totalNoOfVendorsPercentageChange: number;
  noOfOpenApprovals: number;
  noOfOpenApprovalsPercentageChange: number;
}

interface TaskCompletedData {
  taskCompletionRates: TaskCompletionRate[];
}

interface TaskCompletionRate {
  overdue: number;
  completed: number;
  monthId: number;
  year: number;
}

interface AssetTrendData {
  assetTrends: AssetTrend[];
  percentageChange: number;
}

interface AssetTrend {
  noOfAddedAssets: number;
  noOfDisposedAssets: number;
  monthId: number;
  year: null;
}

interface UserActivity {
  statusName: string;
  auditRecordId: number;
  userId: number;
  systemModuleContextTypeId: number;
  requestActionTypeId: number;
  requestStatusId: number;
  isFlaggedForReview: boolean;
  contextIds: string;
  dateCreated: Date;
  actionPerformedViaId: number;
  createdBy: string;
  requestActionTypeName: string;
  username: string;
  email: string;
  systemContextTypeName: string;
  systemContextTypeId: number;
  isDeleted: boolean;
  firstName: string;
  lastName: string;
  entityAffected: string;
  message: string;
  companyId: number;
  displayColorCode: string;
  companyName: string;
  userRoles: string;
}

export type {
  MaintenanceDowntime,
  DashboardStats,
  TaskCompletedData,
  AssetTrendData,
  UserActivity,
  AssetTrend,
  TaskCompletionRate,
};
