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
}

interface ActualProjectedData {
  projectedCost: number;
  actualCost: number;
  monthNo: number;
  weekNo: number;
  year: number;
}

export type { AssetStatistics, ActualProjectedData };
