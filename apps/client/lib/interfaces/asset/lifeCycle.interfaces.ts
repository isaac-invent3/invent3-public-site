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
  scheduleType: number | null;
  initialDepreciationRate: number | null;
  adjustmentCurve: number | null;
  stepInterval: number | null;
  annualCostBreakDown: AnnualCostBreakDownItem[];
}

interface AnnualCostBreakDownItem {
  year: number;
  depreciationRate: number;
}

interface MaintenanceDepreciationFormValues {
  maintenanceFrequency: number | null;
  maintenanceCost: number | null;
  depreciationModel: number | null;
  residualValue: number | null;
  autoAdjust: boolean;
  scheduleType: number | null;
  initialDepreciationRate: number | null;
  adjustmentCurve: number | null;
  stepInterval: number | null;
  annualCostBreakDown: AnnualCostBreakDownItem[];
}

interface LifeCycleSimulationResponse {
  simulatedScenarions: SimulatedScenarion[];
  lifeCycleCostCurve: LifeCycleCostCurve;
  riskOverTime: RiskOverTime;
  estimatedReplacementYear: number;
  projectLifeCycleCost: number;
  residualValue: number;
  annualCostBreakdowns: AnnualCostBreakdown[];
}

export interface AnnualCostBreakdown {
  year: number;
  depreciationRate: number;
  maintenanceCost: number;
  depreciationLoss: number;
  residualValue: number;
  risk: string;
}

export interface LifeCycleCostCurve {
  NormalPlan: LifeCycleCostCurveNormalPlan[];
}

export interface LifeCycleCostCurveNormalPlan {
  year: number;
  totalCost: number;
}

export interface RiskOverTime {
  NormalPlan: RiskOverTimeNormalPlan[];
}

export interface RiskOverTimeNormalPlan {
  year: number;
  riskIndex: number;
}

export interface SimulatedScenarion {
  scenario: number;
  depreciationRate: number;
  maintenanceCost: number;
  depreciationLoss: number;
  residualValue: number;
  riskScore: number;
}

interface SimulationPayload {
  assetParameters: {
    assetName: string;
    assetCategoryId: string;
    acquisitionDate: string;
    acquisitionCost: number;
    expectedUsefulLife: number;
    currentAge: number;
    currentCondition: number;
  };

  depreciationParameters: {
    depreciationMethod: number | null;
    residualValue: number;
    maintenanceCost: number;
    scheduleType: number;
    initialDepreciationRate: number;
    adjustmentCurve: number;
    stepInterval: number;
    annualCostBreakdown: {
      year: number;
      depreciationRate: number;
    }[];
  };

  maintenanceFrequency: number;
}

interface AssetLifeCycleTransitionRulePayload {
  toTransitionStage: number;
  isActive: boolean;
  description: string;
  requiresApproval: boolean;
  condition: Condition[];
}

interface Condition {
  columnName: string;
  columnValue: string;
  operation: number;
  join: number;
}

interface CreateAssetLifeCycleTransitionRulePayload
  extends AssetLifeCycleTransitionRulePayload {
  createdBy: string;
}

interface AssetLifeCycleTransitionRule extends BaseEntity {
  ruleId: number;
  fromTransitionStage: number;
  toTransitionStage: number;
  description: string;
  conditionExpression: string;
  isActive: boolean;
  requiresApproval: boolean;
}

interface AssetLifeCycleTransitionRuleList {
  ruleId: number;
  toTransitionStage: number;
  isActive: boolean;
  description: string;
  requiresApproval: boolean;
  conditions: Condition[];
}

interface UpdateAssetLifeCycleTransitionRulePayload
  extends AssetLifeCycleTransitionRulePayload {
  ruleId: number;
  lastModifiedBy: string;
}

export type {
  AssetLifeCycle,
  LifeCycleTrend,
  LifeCycleStages,
  AssetLifeCycleSimulation,
  MaintenanceDepreciationFormValues,
  AnnualCostBreakDownItem,
  LifeCycleSimulationResponse,
  SimulationPayload,
  AssetLifeCycleTransitionRulePayload,
  AssetLifeCycleTransitionRule,
  CreateAssetLifeCycleTransitionRulePayload,
  UpdateAssetLifeCycleTransitionRulePayload,
  AssetLifeCycleTransitionRuleList,
};
