import { GeoJsonTypes } from 'geojson';
import { OPERATORS } from '../utils/constants';

interface Option {
  label: string;
  value: string | number;
}

interface SearchResponse {
  items: any[];
  pageNumber: number;
  totalPages: number;
  totalItems: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

interface SearchCriterion {
  columnName: string;
  columnValue: string;
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

interface MapAssetData {
  name: string;
  count: number;
  id: number;
}

export type {
  Option,
  SearchResponse,
  SearchCriterion,
  GeoJSONFeature,
  MapAssetData,
};
