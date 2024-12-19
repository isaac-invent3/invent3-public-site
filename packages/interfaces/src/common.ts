import { OPERATORS } from '@repo/constants';

interface Criterion {
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

interface SearchCriterion {
  criterion?: Criterion[];
  orCriterion?: Criterion[][];
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

export type { Criterion, Option, FilterInput, SearchCriterion };
