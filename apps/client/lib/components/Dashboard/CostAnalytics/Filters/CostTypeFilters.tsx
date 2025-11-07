import React, { useEffect, useState } from 'react';
import { FilterDropDown } from '@repo/ui/components';
import { Option } from '~/lib/interfaces/general.interfaces';
import { DEFAULT_PAGE_SIZE } from '~/lib/utils/constants';
import { generateOptions } from '~/lib/utils/helperFunctions';
import { useGetCostTypesQuery } from '~/lib/redux/services/dashboard/costanalytics.services';

interface CostTypeFiltersProps {
  selectedOptions: Option[];
  // eslint-disable-next-line no-unused-vars
  handleSelectedOption: (option: Option) => void;
  label?: string;
}

const CostTypeFilters = (props: CostTypeFiltersProps) => {
  // eslint-disable-next-line no-unused-vars
  const { selectedOptions, handleSelectedOption, label } = props;

  const [pageNumber, setPageNumber] = useState(1);
  const [options, setOptions] = useState<Option[]>([]);
  const { data, isLoading } = useGetCostTypesQuery({
    pageNumber: pageNumber,
    pageSize: DEFAULT_PAGE_SIZE,
  });

  useEffect(() => {
    if (data?.data?.items) {
      const newTicketTypes = generateOptions(
        data?.data?.items,
        'typeName',
        'costTypeId'
      );
      setOptions((prev) => [...prev, ...newTicketTypes]);
    }
  }, [data]);

  return (
    <FilterDropDown
      showBorder
      label={label ?? 'Cost Types:'}
      options={options}
      selectedOptions={selectedOptions}
      handleClick={(option) => handleSelectedOption(option)}
      hasMoreOptions={data?.data?.hasNextPage}
      loadMoreOptions={() => setPageNumber((prev) => prev + 1)}
      isLoading={isLoading}
    />
  );
};

export default CostTypeFilters;
