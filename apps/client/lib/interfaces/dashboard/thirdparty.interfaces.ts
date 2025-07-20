interface DashboardSummary {
  totalCompanies: number;
  activeCompanies: number;
  inactiveCompanies: number;
  totalManagedAssets: number;
  totalManagedAssetsNotInUse: number;
  totalUpcomingMaintenanceByWeek: number;
  totalUpcomingMaintenanceByDay: number;
  totalTasksByMonth: number;
  totalCompleteTasksByMonth: number;
}

export type { DashboardSummary };
