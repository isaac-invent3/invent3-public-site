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

interface AssetLifeCycleSimulation {
  assetName: string | null;
  categoryName: string | null;
  acquisitionDate: string | null;
  purchaseCost: number | null;
  expectedUsefulLife: number | null;
  currentAge: number | null;
  location: string | null;
  currentCondition: number | null;
  maintenanceFrequency: number | null;
  manintenanceCost: number | null;
  depreciationModel: number | null;
  residualValue: number | null;
  autoAdjust: boolean | null;
}

export type {
  AssetLifeCycle,
  LifeCycleTrend,
  LifeCycleStages,
  AssetLifeCycleSimulation,
};
