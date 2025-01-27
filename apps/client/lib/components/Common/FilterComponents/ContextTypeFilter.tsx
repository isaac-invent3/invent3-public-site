import React, { useEffect, useState } from 'react';
import { FilterDropDown } from '@repo/ui/components';
import { Option } from '~/lib/interfaces/general.interfaces';
import { DEFAULT_PAGE_SIZE } from '~/lib/utils/constants';
import { generateOptions } from '~/lib/utils/helperFunctions';
import { useGetAllSystemContextTypeQuery } from '~/lib/redux/services/systemcontexttypes.services';

interface ContextTypeFilterProps {
  selectedOptions: Option[];
  // eslint-disable-next-line no-unused-vars
  handleSelectedOption: (option: Option) => void;
}

const ContextTypeFilter = (props: ContextTypeFilterProps) => {
  // eslint-disable-next-line no-unused-vars
  const { selectedOptions, handleSelectedOption } = props;

  const [pageNumber, setPageNumber] = useState(1);
  const [options, setOptions] = useState<Option[]>([]);
  const { data, isLoading } = useGetAllSystemContextTypeQuery({
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
      selectedOptions={selectedOptions}
      handleClick={(option) => handleSelectedOption(option)}
      hasMoreOptions={data?.data?.hasNextPage}
      loadMoreOptions={() => setPageNumber((prev) => prev + 1)}
      isLoading={isLoading}
    />
  );
};

export default ContextTypeFilter;
