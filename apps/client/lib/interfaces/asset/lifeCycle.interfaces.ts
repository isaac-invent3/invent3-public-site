import { BaseEntity } from '@repo/interfaces';

interface AssetLifeCycle {
  lifeCycleId: number;
  lifeCycleStageName: string;
  assetCount: number;
  percentage: number;
  lifeCycleStageChangeDate: string;
  lifeCycleColorCode: string;
  lifeCycleStageDisplayName: string;
  searchColumnValue: number | string;
  searchColumnName: string;
}

interface LifeCycleTrend {
  lifeCycleId: number;
  lifeCycleStageName: string;
  year: number;
  month: number;
  count: number;
}
interface LifeCycleStages extends BaseEntity {
  lifeCycleId: number;
  lifeCycleStageName: string;
}

export type { AssetLifeCycle, LifeCycleTrend, LifeCycleStages };
