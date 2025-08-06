import React, { useEffect, useState } from 'react';
import { FilterDropDown } from '@repo/ui/components';
import { Option } from '~/lib/interfaces/general.interfaces';
import { DEFAULT_PAGE_SIZE } from '~/lib/utils/constants';
import { generateOptions } from '~/lib/utils/helperFunctions';
import { useGetAllSystemContextTypeQuery } from '~/lib/redux/services/systemcontexttypes.services';

interface ContextTypeFilterProps {
  selected: number[];
  onChange: (option: Option) => void;
}
const ContextTypeFilter = (props: ContextTypeFilterProps) => {
  const { selected, onChange } = props;
  const [pageNumber, setPageNumber] = useState(1);
  const [options, setOptions] = useState<Option[]>([]);
  const { data, isLoading, isFetching } = useGetAllSystemContextTypeQuery({
    pageNumber: pageNumber,
    pageSize: DEFAULT_PAGE_SIZE,
    isOnlyTemplateAllowed: true,
  });

  useEffect(() => {
    if (data?.data?.items) {
      const newCategories = generateOptions(
        data?.data?.items,
        'displayName',
        'systemContextTypeId'
      );
      setOptions((prev) => [...prev, ...newCategories]);
    }
  }, [data]);

  return (
    <FilterDropDown
      showBorder
      label="Context Type:"
      options={options}
      selectedOptions={selected.map((item) => ({
        value: item,
        label: item.toString(),
      }))}
      handleClick={(option) => onChange(option)}
      hasMoreOptions={data?.data?.hasNextPage}
      loadMoreOptions={() => setPageNumber((prev) => prev + 1)}
      isLoading={isLoading || isFetching}
    />
  );
};

export default ContextTypeFilter;
