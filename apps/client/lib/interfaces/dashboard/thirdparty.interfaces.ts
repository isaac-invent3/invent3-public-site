interface DashboardSummary {
  totalManagedCompanies: number;
  totalAssetsBeingManaged: number;
  upcomingMaintenanceThisWekk: number;
  taskOverviewThisMonth: number;
  tasksCompletedThisMonth: number;
  tasksNotCompletedThisMonth: number;
  assetsNotInUse: number;
  totalInactiveCompanies: number;
}

export type { DashboardSummary };
