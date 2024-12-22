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
  totalMaintenanceCost:number
}

export type {
  AssetStatistics,
  ActualProjectedData,
  AssetInRegion,
  ProjectedAndActualCostsByArea,
};
