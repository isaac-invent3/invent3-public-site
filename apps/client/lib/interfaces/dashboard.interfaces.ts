interface AssetStatistics {
  countryName: string;
  stateId: number;
  stateName: string;
  countryId: number;
  activeAssets: number;
  newAssets: number;
  disposedAssets: number;
  assetsScheduledForMaintenance: number;
  assetsNotInUse: number;
  totalAssets: number;
  totalMaintenanceCost: number;
  totalAssetsPercentageChange: number;
}

interface AssetInRegion {
  assetCount: number;
  countryId: number;
  lgaId: number | null;
  lgaName: string | null;
  rowId: number;
  stateId: number;
  stateName: string;
  totalAssetValue: number | null;
}
interface ActualProjectedData {
  projectedCost: number;
  actualCost: number;
  variance: number;
  monthId: number;
  weekId: number | null;
  year: number;
}

interface ProjectedAndActualCostsByArea {
  percentageChange: number;
  projectedAndActualCosts: ActualProjectedData[];
  totalMaintenanceCost: number;
}

type WeekType = 'this' | 'last' | 'next';
export interface FrontdeskDashboardStat {
  data: { [key: string]: number };
  message: string;
  responseId: string;
}

interface FrontendDashboardStats {
  openTickets: number;
  assetsInUseCount: number;
  assetsNotInUseCount: number;
  upcomingMaintenanceByWeek: number;
  upcomingMaintenanceByDay: number;
  totalTasksCount: number;
  completedTask: number;
  incompleteTask: number;
  completeTaskPercentageChange: number;
  assetsInUsePercentageChange: number;
  openTicketsPercentageChange: number;
}

interface FrontendDashboardChartData {
  openedAndResolvedTickets: OpenedAndResolvedTicket[];
  completeAndIncompleteTasks: GenericTaskCompleteData[];
}

interface CompleteAndIncompleteTask {
  complete: number;
  inComplete: number;
  variance: number;
  monthId: number;
  weekId: number;
  year: number;
}

interface OpenedAndResolvedTicket {
  openTickets: number;
  resolvedTickets: number;
  variance: number;
  monthId: number;
  weekId: number;
  year: number;
}

interface MaintenanceSuccessChartData {
  missed: number;
  completed: number;
  percentageMissed: number;
  percentageCompleted: number;
  variance: null;
  monthId: number;
  weekId: number;
  year: number;
}

interface SuperAdminDashboardStats {
  totalCompaniesUnderMgt: number;
  newOnboardedCompaniesByMonth: number;
  activeSubscriptionsByMonth: number;
  totalUsers: number;
  totalInactiveUsersByMonth: number;
  pendingFeedbacks: number;
  newOnboardedCompaniesPercentageChange: number;
  activeSubscriptionsPercentageChange: number;
  pendingFeedbacksPercentageChange: number;
}

interface SubscriptionTrend {
  free: number;
  paid: number;
  variance: number;
  monthId: number;
  weekId: number;
  year: number;
}

interface UserDemographics {
  usersCount: number;
  lgaId: number;
  countryId: number;
  stateId: number;
  lgaName: string;
  stateName: string;
}

interface TrafficCount {
  trafficCount: number;
  monthId: number;
  weekId: number;
  year: number;
}

interface CompanyDistritution {
  companyCount: number;
  lgaId: number;
  countryId: number;
  stateId: number;
  lgaName: string;
  stateName: string;
}

interface GenericTaskCompleteData {
  taskNotCompleted: number;
  tasksCompleted: number;
  variance?: number;
  weekId?: number;
  monthId: number;
  year: number;
}

type DashboardView =
  | 'operation_manager'
  | 'executive'
  | 'front_desk'
  | 'field_engineer'
  | 'third_party'
  | 'client_admin'
  | 'super_admin';

interface GenericFilter {
  datePeriod: number[];
  facilities: number[];
  assetCategories: number[];
  metricsToCompare: number[];
  assetStatus: number[];
  costPeriod: number[];
  costTypes: number[];
  ticketTypes: number[];
  riskThreshold: number[];
}

export type {
  AssetStatistics,
  ActualProjectedData,
  AssetInRegion,
  ProjectedAndActualCostsByArea,
  WeekType,
  FrontendDashboardStats,
  FrontendDashboardChartData,
  MaintenanceSuccessChartData,
  OpenedAndResolvedTicket,
  CompleteAndIncompleteTask,
  SuperAdminDashboardStats,
  SubscriptionTrend,
  UserDemographics,
  TrafficCount,
  CompanyDistritution,
  GenericTaskCompleteData,
  DashboardView,
  GenericFilter,
};
