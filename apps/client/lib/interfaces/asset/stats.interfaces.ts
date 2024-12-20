interface AssetStats {
  activeAssets: number;
  inActiveAssets: number;
  assetsUnderMaintenance: number;
  decommissionedAssets: number;
  assetsPendingDisposal: number;
  assetsInStorage: number;
  operationalAssets: number;
  assetsScheduledForMaintenance: number;
  assetsOutOfService: number;
  assetsNotInUse: number;
  totalAssets: number;
  totalAssetValue: number;
  assetsNotInUseTotalValue: number;
  activeAssetsTotalValue: number;
}

interface AssetStatsState extends AssetStats {
  stateId: number;
  stateName: string;
  countryId: number;
}

interface AssetStatsLGA extends AssetStats {
  lgaId: number;
  lgaName: string;
  stateId: number;
}

interface AssetStatsCummalative extends AssetStats {
  stateName: string;
  stateId: number;
  newAssets: number;
  percentageChange: number;
}

interface AssetMapStats extends AssetStats {
  stateId?: number;
  stateName?: string;
  lgaId?: number;
  lgaName?: string;
}

export type {
  AssetStats,
  AssetMapStats,
  AssetStatsState,
  AssetStatsLGA,
  AssetStatsCummalative,
};
