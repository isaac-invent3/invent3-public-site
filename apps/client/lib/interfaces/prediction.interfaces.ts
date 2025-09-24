import { ForecastInfo } from './forecast.interfaces';

interface Prediction {
  alertId: number;
  isPredictedAlert: boolean;
  assetId: number;
  alertedDate: string;
  resolvedDate: string;
  datePredicted: string;
  alertTypeId: number;
  actualValue: string;
  threshold: string;
  alertStatusId: number;
  severityId: number;
  isDeleted: boolean;
  predictionId: number;
  predictedLabel: string;
  riskScore: number;
  confidenceLevel: number;
  confidenceLevelName: number;
  statusName: string;
  displayColorCode: string;
  alias: string;
  severityName: string;
  severityDisplayColorCode: string;
  assetCode: string;
  assetName: string;
  drivers: ForecastInfo[];
  suggestions: ForecastInfo[];
}

export type { Prediction };
