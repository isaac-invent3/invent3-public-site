import { FilterInput } from '@repo/interfaces';

const transformFilters = (filters: FilterInput) => {
  return Object.fromEntries(
    Object.entries(filters).map(([key, items]) => [
      key,
      items.map((item) => item.value),
    ])
  );
};

export default transformFilters;
