import { OPERATORS } from '@repo/constants';
import { SearchCriterion, SearchQuery } from '@repo/interfaces';

export const generateSearchCriterion = (
  columnName: string,
  columnValues: (string | number)[],
  operator: (typeof OPERATORS)[keyof typeof OPERATORS]
) => {
  const finalSearchCriterion: SearchCriterion[] = [];
  if (columnValues.length > 0) {
    columnValues.forEach((item) =>
      finalSearchCriterion.push({
        columnName,
        columnValue: item,
        operation: operator,
      })
    );
  }
  return finalSearchCriterion;
};

const createSearchCriterion = ({
  andCriterions,
  orCriterions,
  currentPage,
  pageSize,
  includeDeleted = false,
  useOrLogic = false,
  isLogicalOperatorSpecified = false,
}: {
  andCriterions?: Record<string, (string | number)[]>;
  orCriterions?: Record<string, (string | number)[]>;
  currentPage: number;
  pageSize: number;
  includeDeleted?: boolean;
  useOrLogic?: boolean;
  isLogicalOperatorSpecified?: boolean;
}): SearchQuery => {
  const searchCriteria: SearchQuery = {
    ...(andCriterions && Object.keys(andCriterions).length > 0
      ? {
          criterion: Object.entries(andCriterions).flatMap(([key, items]) =>
            generateSearchCriterion(key, items, OPERATORS.Equals)
          ),
        }
      : {}),
    ...(orCriterions && Object.keys(orCriterions).length > 0
      ? {
          orCriterion: Object.entries(orCriterions)
            .map(([key, items]) => {
              const values = items.map((item) => item);
              return values.length > 0
                ? generateSearchCriterion(key, values, OPERATORS.Equals)
                : null;
            })
            .filter(
              (criterion): criterion is SearchCriterion[] => criterion !== null
            ),
        }
      : {}),
    pageNumber: currentPage,
    pageSize: pageSize,
    includeDeleted,
    useOrLogic,
    isLogicalOperatorSpecified,
  };

  return searchCriteria;
};

export const generateSearchCriteria = (
  search: string,
  filterData: any,
  mapping: Record<
    string,
    { key: string; operator: (typeof OPERATORS)[keyof typeof OPERATORS] }
  >,
  searchColumns: string[]
) => {
  const orCriterion: SearchCriterion[][] = [];

  // Handle search across multiple fields
  if (search) {
    const searchCriteria = searchColumns.map((column) => ({
      columnName: column,
      columnValue: search,
      operation: OPERATORS.Contains,
    }));
    orCriterion.push(searchCriteria);
  }

  // Handle filter data
  Object.entries(mapping).forEach(([filterKey, config]) => {
    const value = filterData[filterKey];
    if (!value || (Array.isArray(value) && value.length === 0)) return;

    const valuesArray = Array.isArray(value) ? value : [value];
    const filterCriteria: SearchCriterion[] = valuesArray.map(
      (val) =>
        ({
          columnName: config.key,
          columnValue: val,
          operation: config.operator,
        }) as unknown as SearchCriterion
    );

    orCriterion.push(filterCriteria);
  });

  return {
    orCriterion,
  };
};

export default createSearchCriterion;
