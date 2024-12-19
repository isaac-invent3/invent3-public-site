import { BaseEntity } from '@repo/interfaces';

export interface AssetCondition extends BaseEntity {
  conditionId: number;
  conditionName: string;
}
