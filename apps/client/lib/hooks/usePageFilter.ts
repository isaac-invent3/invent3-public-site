import { useState } from 'react';
import _ from 'lodash';

export function usePageFilter<T extends Record<string, any>>(initialFilter: T) {
  const [filterData, setFilterData] = useState<T>(initialFilter);
  const [appliedFilter, setAppliedFilter] = useState<T>(initialFilter);

  const isFilterEmpty = _.every(appliedFilter, (value) => _.isEmpty(value));

  const applyFilter = () => {
    setAppliedFilter(filterData);
  };

  const clearFilter = () => {
    setFilterData(initialFilter);
    setAppliedFilter(initialFilter);
  };

  return {
    filterData,
    setFilterData,
    appliedFilter,
    isFilterEmpty,
    applyFilter,
    clearFilter,
  };
}
