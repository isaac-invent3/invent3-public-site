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
  highPriorityPendingTasksPercentage: number;
  mediumPriorityPendingTasksPercentage: number;
  lowPriorityPendingTasksPercentage: number;
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
  timeStamp: string;
  name: string;
  designation: string;
  action: string;
  details: string;
  ipAddress: string;
}

export type {
  MaintenanceDowntime,
  DashboardStats,
  TaskCompletedData,
  AssetTrendData,
  UserActivity,
};
