import { useEffect, useState } from 'react';
import FilterDropDown from '~/lib/components/UI/FilterDropDown';
import { Option } from '~/lib/interfaces/general.interfaces';
import { useGetStatesByCountryIdQuery } from '~/lib/redux/services/asset/location.services';
import { generateOptions } from '~/lib/utils/helperFunctions';

interface BranchFilterProps {
  selectedOptions: (string | number)[];
  // eslint-disable-next-line no-unused-vars
  handleSelectedOption: (value: string | number) => void;
}
const BranchFilter = (props: BranchFilterProps) => {
  const { selectedOptions, handleSelectedOption } = props;
  const [pageNumber, setPageNumber] = useState(1);
  const [options, setOptions] = useState<Option[]>([]);
  const { data, isLoading } = useGetStatesByCountryIdQuery({
    id: 1,
    pageNumber: pageNumber,
    pageSize: 37,
  });

  useEffect(() => {
    if (data?.data?.items) {
      const newStates = generateOptions(
        data?.data?.items,
        'stateName',
        'stateId'
      );
      setOptions((prev) => [...prev, ...newStates]);
    }
  }, [data]);

  return (
    <FilterDropDown
      label="Location (Branch):"
      options={options}
      selectedOptions={selectedOptions}
      handleClick={(value) => handleSelectedOption(value)}
      hasMoreOptions={data?.data?.hasNextPage}
      loadMoreOptions={() => {
        !isLoading && setPageNumber((prev) => prev + 1);
      }}
      isLoading={isLoading}
    />
  );
};

export default BranchFilter;
