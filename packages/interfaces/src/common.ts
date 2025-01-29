import { OPERATORS } from '@repo/constants';

interface SearchCriterion {
  columnName: string;
  columnValue: string | number;
  operation: (typeof OPERATORS)[keyof typeof OPERATORS];
}

interface Option {
  label: string;
  value: string | number;
}

interface FilterInput {
  [name: string]: Option[];
}

interface SearchQuery {
  criterion?: SearchCriterion[];
  orCriterion?: SearchCriterion[][];
  orderByCriteria?: {
    columnName: string;
    operation: number;
  };
  datePeriodCriteria?: {
    columnName: string;
    operation: number;
    useFutureLogic?: boolean;
  };
  pageNumber: number;
  pageSize: number;
  includeDeleted?: boolean;
  useOrLogic?: boolean;
  isLogicalOperatorSpecified?: boolean;
}



export type { SearchCriterion, Option, FilterInput, SearchQuery };
