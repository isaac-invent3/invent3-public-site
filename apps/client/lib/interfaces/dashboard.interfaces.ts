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

interface ActualProjectedData {
  projectedCost: number;
  actualCost: number;
  variance: number;
  monthId: number;
  weekId: number | null;
  year: number;
}

export type { AssetStatistics, ActualProjectedData };
