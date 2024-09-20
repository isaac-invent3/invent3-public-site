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

export type { Option, SearchResponse, SearchCriterion };
