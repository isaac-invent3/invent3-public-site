import { HStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { CheckBox, FilterDropDown } from '@repo/ui/components';
import GenericStatusBox from '~/lib/components/UI/GenericStatusBox';
import { Option } from '~/lib/interfaces/general.interfaces';
import { useGetAllAssetStatusQuery } from '~/lib/redux/services/asset/general.services';
import { DEFAULT_PAGE_SIZE } from '~/lib/utils/constants';

interface StatusFilterProps {
  selectedOptions: Option[];
  // eslint-disable-next-line no-unused-vars
  handleSelectedOption: (option: Option) => void;
}

interface DisplayCode {
  displayColorCode: string;
}

interface StatusOption extends Option, DisplayCode {}
const StatusFilter = (props: StatusFilterProps) => {
  const { selectedOptions, handleSelectedOption } = props;
  const [pageNumber, setPageNumber] = useState(1);
  const [options, setOptions] = useState<StatusOption[]>([]);
  const { data, isLoading, isFetching } = useGetAllAssetStatusQuery({
    pageNumber: pageNumber,
    pageSize: DEFAULT_PAGE_SIZE,
  });

  useEffect(() => {
    const allStatuses: StatusOption[] = [];
    if (data?.data?.items) {
      data?.data?.items.forEach((item) =>
        allStatuses.push({
          label: item.statusName,
          value: item.statusId,
          displayColorCode: item.displayColorCode,
        })
      );
      setOptions((prev) => [...prev, ...allStatuses]);
    }
  }, [data]);

  return (
    <FilterDropDown
      label="Status:"
      options={options}
      selectedOptions={selectedOptions}
      handleClick={(value) => handleSelectedOption(value)}
      hasMoreOptions={data?.data?.hasNextPage}
      loadMoreOptions={() => setPageNumber((prev) => prev + 1)}
      isLoading={isLoading || isFetching}
    >
      {options.map((item, index) => (
        <HStack spacing="8px" key={index}>
          <CheckBox
            isChecked={
              selectedOptions.find((option) => option.value === item.value) !==
              undefined
            }
            handleChange={() => handleSelectedOption(item)}
          />
          <GenericStatusBox
            text={item.label}
            colorCode={item.displayColorCode}
          />
        </HStack>
      ))}
    </FilterDropDown>
  );
};

export default StatusFilter;
