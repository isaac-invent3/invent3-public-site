import { BaseEntity } from '@repo/interfaces';

interface AssetDepreciation extends BaseEntity {
  depreciationId: number;
  assetId: number;
  depreciationDate: string;
  methodName: string;
  depreciationRate: number;
  initialValue: number;
  accumulatedDepreciation: number;
  intialUsefulLife: number;
  remainingUsefulLife: number;
  currentValue: number;
}

interface AssetDepreciationHistory extends BaseEntity {
  depreciationHistoryId: number;
  depreciationId: number;
  initialValue: number;
  currentValue: number;
  depreciation: number;
  dateCreated: string;
}

interface DepreciationMethod extends BaseEntity {
  depreciationMethodId: number;
  methodName: string;
  depreciationDefaultRate: number;
  displayColorCode: string;
}

export type { AssetDepreciation, AssetDepreciationHistory, DepreciationMethod };
