import { BaseEntity } from '@repo/interfaces';

interface AssetForecast extends BaseEntity {
  forecastId: number;
  assetId: number;
  forcastTypeId: number;
  forcastedLabelName: string;
  forcastedLabelValue: string;
  forecastedLabelStartDate: string;
  forcastedLabelEndDate: string;
  dateForcasted: string;
  confidenceLevel: number;
  confidenceLevelName: string;
  confidenceLevelColor: string;
  forecastDrivers: ForecastInfo[];
  forecastSuggestions: ForecastInfo[];
}

interface ForecastInfo extends BaseEntity {
  forecastDriverId?: number;
  forecastId: number;
  driverFeature?: string;
  description?: string;
  suggestionId?: number;
  suggestion?: string;
}

export type { AssetForecast, ForecastInfo };
