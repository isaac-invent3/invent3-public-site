import { GeoJsonTypes } from 'geojson';
import { OPERATORS } from '../utils/constants';

interface Option {
  label: string;
  value: string | number;
}

interface SearchCriterion {
  columnName: string;
  columnValue: string | number;
  operation: (typeof OPERATORS)[keyof typeof OPERATORS];
}

interface GeoJSONFeature {
  type: string;
  properties: {
    objectid: string;
    statecode: string;
    state: string;
    capcity: string;
    name: string;
    source: string;
    timestamp: string;
    globalid: string;
    shape_area: string;
    shape_len: string;
    geozone: string;
    cartodb_id: number;
    created_at: string;
    updated_at: string;
  };
  geometry: {
    type: GeoJsonTypes;
    coordinates: number[][][]; // Adjust this if the structure of the coordinates differs
  };
}

interface RepeatInterval {
  annually: {
    [name: number]: number[];
  };
  daily: string[];
  weekly: number[];
  monthly: number[];
}

interface RecurrenceInfo {
  interval: number;
  frequency: Option | null;
  startDate: string | null;
  startTime: string | null;
  endDate: string | null;
  endTime: string | null;
  repeatIntervals: RepeatInterval;
}

interface LocationFilter {
  region: Option[];
  area: Option[];
  branch: Option[];
}

interface AppConfig {
  DEFAULT_COMPLETED_TASK_STATUS_ID: string | null;
  DEFAULT_ESTIMATED_TASK_DURATION_IN_HOURS: string | null;
}

export type {
  GeoJSONFeature,
  Option,
  RecurrenceInfo,
  RepeatInterval,
  SearchCriterion,
  LocationFilter,
  AppConfig,
};
