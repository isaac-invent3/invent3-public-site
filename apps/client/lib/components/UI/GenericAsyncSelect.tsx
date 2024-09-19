import React, { useEffect, useState } from 'react';
import SelectInput from '~/lib/components/UI/Select';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import { Option } from '~/lib/interfaces/general.interfaces';
import { OPERATORS } from '~/lib/utils/constants';
import { generateOptions } from '~/lib/utils/helperFunctions';

interface BuildingSelectProps {
  // eslint-disable-next-line no-unused-vars
  handleSelect?: (options: Option) => void;
  data: any;
  isLoading: boolean;
  selectName: string;
  selectTitle: string;
  labelKey: string | string[];
  valueKey: string;
  mutationFn: any;
  pageNumber: number;
  setPageNumber: React.Dispatch<React.SetStateAction<number>>;
}

const GenericAsyncSelect = (props: BuildingSelectProps) => {
  const {
    handleSelect,
    data,
    isLoading,
    selectName,
    selectTitle,
    labelKey,
    valueKey,
    mutationFn,
    pageNumber,
    setPageNumber,
  } = props;
  const { handleSubmit } = useCustomMutation();
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
          columnName: typeof labelKey === 'string' ? labelKey : labelKey[0],
          columnValue: inputValue,
          operation: OPERATORS.Contains,
        },
      ],
      pageNumber: 1,
      pageSize: 25,
    };
    const response = await handleSubmit(mutationFn, searchCriterion, '');
    const formattedOptions = generateOptions(
      response?.data?.data.items,
      labelKey,
      valueKey
    );
    return formattedOptions;
  };

  useEffect(() => {
    if (data?.data) {
      const formattedOptions = generateOptions(
        data?.data?.items,
        labelKey,
        valueKey
      );
      setOptions((prev) => [...prev, ...formattedOptions]);
    }
  }, [data]);

  return (
    <SelectInput
      name={selectName}
      title={selectTitle}
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

export default GenericAsyncSelect;
