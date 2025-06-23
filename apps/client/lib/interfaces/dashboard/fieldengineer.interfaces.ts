interface TicketOverView {
  assignedTickets: number;
  inProgress: number;
  completed: number;
}

interface TaskCompletion {
  taskNotCompleted: number;
  tasksCompleted: number;
  variance: number;
  monthId: number;
  year: number;
}

interface AssetOverview {
  totalAssets: number;
  activeAssets: number;
  nonActiveAssets: number;
  decommissionedAssets: number;
  disposedAssets: number;
  transferredAssets: number;
  assetTransferedPercentageRange: number;
  assetDisposed: number;
  assetDeleted: number;
}

interface MaintenanceSuccessChartData {
  missed: number;
  completed: number;
  variance: number;
  monthId: number;
  year: number;
}

export type {
  TicketOverView,
  TaskCompletion,
  AssetOverview,
  MaintenanceSuccessChartData,
};
