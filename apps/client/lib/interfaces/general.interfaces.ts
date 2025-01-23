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

interface GenericTableProps {
  isLoading?: boolean;
  isFetching?: boolean;
  emptyText?: string;
  showFooter?: boolean;
  emptyLines?: number;
  pageNumber?: number;
  pageSize?: number;
  totalPages?: number;
  selectedRows?: number[];
  disabledRows?: number[];
  setSelectedRows?: React.Dispatch<React.SetStateAction<number[]>>;
  setPageNumber?: React.Dispatch<React.SetStateAction<number>>;
  setPageSize?: React.Dispatch<React.SetStateAction<number>>;
  isSelectable?: boolean;
  selectMultipleRows?: boolean;
  showPopover?: boolean;
  showEmptyState?: boolean;
}

export type {
  GeoJSONFeature,
  Option,
  RecurrenceInfo,
  RepeatInterval,
  SearchCriterion,
  LocationFilter,
  AppConfig,
  GenericTableProps,
};
