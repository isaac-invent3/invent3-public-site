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

interface PredictiveSlaDashboardSummary {
  totalPredictiveTickets: number;
  onTimeCompliance: number;
  breachedSla: number;
  avgResponseTime: number;
}

interface SLATrends {
  day: string;
  onTime: number;
  breached: number;
  atRisk: number;
}

interface PredictiveSlaTicketBreakdown {
  ticketId: number;
  assetName: string;
  riskLevel: string;
  riskLevelColor: string;
  slaDeadline: Date;
  actualCompletion: Date;
  slaStatus: string;
  slaStatusColor: string;
  deviation: number;
  deviationColor: string;
}

export type {
  Prediction,
  PredictiveSlaDashboardSummary,
  PredictiveSlaTicketBreakdown,
  SLATrends,
};
