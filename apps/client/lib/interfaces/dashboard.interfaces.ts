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

export type { AssetStatistics };
