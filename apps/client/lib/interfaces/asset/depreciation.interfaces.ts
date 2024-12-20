import { BaseEntity } from '@repo/interfaces';

export interface AssetDepreciation extends BaseEntity {
  depreciationId: number;
  assetId: number;
  depreciationDate: string;
  depreciationMethod: string;
  depreciationRate: number;
  initialValue: number;
  accumulatedDepreciation: number;
  currentValue: number;
}
