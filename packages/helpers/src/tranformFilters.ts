import { FilterInput } from './interfaces/common.interface';

const transformFilters = (filters: FilterInput) => {
  return Object.fromEntries(
    Object.entries(filters).map(([key, items]) => [
      key,
      items.map((item) => item.value),
    ])
  );
};

export default transformFilters;
