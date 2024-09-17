import React, { useEffect, useState } from 'react';
import SelectInput from '~/lib/components/UI/Select';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import { Option } from '~/lib/interfaces/general.interfaces';
import {
  useGetAllFloorsQuery,
  useSearchFloorsMutation,
} from '~/lib/redux/services/asset/location.services';
import { generateOptions } from '~/lib/utils/helperFunctions';
import { Operators } from '~/lib/utils/operators';

interface FloorSelectProps {
  // eslint-disable-next-line no-unused-vars
  handleSelect?: (options: Option) => void;
}

const FloorSelect = (props: FloorSelectProps) => {
  const { handleSelect } = props;
  const [searchFloor] = useSearchFloorsMutation({});
  const { handleSubmit } = useCustomMutation();

  const [pageNumber, setPageNumber] = useState(1);
  const { data, isLoading } = useGetAllFloorsQuery({
    pageSize: 25,
    pageNumber,
  });
  const [options, setOptions] = useState<Option[]>([]);

  const handlePagination = () => {
    if (data?.data && data?.data?.totalPages > pageNumber) {
      setPageNumber((prev) => prev + 1);
    }
  };

  const handleSearch = async (inputValue: string): Promise<Option[]> => {
    const searchCriterion = {
      criterion: [
        {
          columnName: 'floorName',
          columnValue: inputValue,
          operation: Operators.Contains,
        },
      ],
      pageNumber: 1,
      pageSize: 25,
    };
    const response = await handleSubmit(searchFloor, searchCriterion, '');
    const formattedOptions = generateOptions(
      response?.data?.data.items,
      'floorName',
      'floorId'
    );
    return formattedOptions;
  };

  useEffect(() => {
    if (data?.data) {
      const formattedOptions = generateOptions(
        data?.data?.items,
        'floorName',
        'floorId'
      );
      setOptions((prev) => [...prev, ...formattedOptions]);
    }
  }, [data]);

  return (
    <SelectInput
      name="floorId"
      title="Floor"
      options={options}
      handleSelect={(option) => handleSelect && handleSelect(option)}
      isLoading={isLoading}
      callBackFunction={(inputValue: string) => handleSearch(inputValue)}
      isAsync
      handleOnMenuScrollToBottom={handlePagination}
      isSearchable
    />
  );
};

export default FloorSelect;
