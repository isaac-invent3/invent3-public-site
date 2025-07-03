import { FormSelect } from '@repo/ui/components';
import React, { useEffect, useState } from 'react';
import { CSSObjectWithLabel } from 'react-select';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import { Option, SearchCriterion } from '~/lib/interfaces/general.interfaces';
import { DEFAULT_PAGE_SIZE, OPERATORS } from '~/lib/utils/constants';
import { generateOptions } from '~/lib/utils/helperFunctions';

interface GenericAsyncSelectProps {
  // eslint-disable-next-line no-unused-vars
  handleSelect?: (options: Option) => void;
  data: any;
  isLoading: boolean;
  selectName: string;
  selectTitle: string;
  labelKey: string | string[];
  valueKey: string;
  mutationFn?: any;
  pageNumber: number;
  defaultInputValue?: string | null;
  setPageNumber: React.Dispatch<React.SetStateAction<number>>;
  // eslint-disable-next-line no-unused-vars
  specialSearch?: (searchValue: string) => SearchCriterion[];
  searchAndCriterion?: boolean;
  specialOrCriterion?: (searchValue: string) => SearchCriterion[][];
  fetchKey?: string | number | null | undefined;
  showTitleAfterSelect?: boolean;
  isInvalid?: boolean;
  isMultiSelect?: boolean;
  customProps?: { [name: string]: any };
  selectStyles?: CSSObjectWithLabel;
}

const GenericAsyncSelect = (props: GenericAsyncSelectProps) => {
  const {
    handleSelect,
    data,
    isLoading,
    selectName,
    selectTitle,
    labelKey,
    valueKey,
    mutationFn,
    defaultInputValue,
    pageNumber,
    setPageNumber,
    specialSearch,
    searchAndCriterion = true,
    specialOrCriterion,
    fetchKey,
    showTitleAfterSelect = true,
    isInvalid,
    isMultiSelect,
    selectStyles,
  } = props;
  const { handleSubmit } = useCustomMutation();
  const [options, setOptions] = useState<Option[]>([]);
  const [prevPageNumber, setPrevPageNumber] = useState(1);
  const [prevFetchKey, setPrevFetchKey] = useState<
    string | number | null | undefined
  >(null);

  const handlePagination = () => {
    if (data?.data && data?.data?.totalPages > pageNumber) {
      setPrevPageNumber(pageNumber);
      setPageNumber((prev) => prev + 1);
    }
  };

  const handleSearch = async (inputValue: string): Promise<Option[]> => {
    const searchCriterion = {
      criterion: !searchAndCriterion
        ? undefined
        : specialSearch
          ? specialSearch(inputValue)
          : [
              {
                columnName:
                  typeof labelKey === 'string' ? labelKey : labelKey[0],
                columnValue: inputValue,
                operation: OPERATORS.Contains,
              },
            ],
      orCriterion: specialOrCriterion
        ? specialOrCriterion(inputValue)
        : undefined,
      pageNumber: 1,
      pageSize: DEFAULT_PAGE_SIZE,
    };
    const response: any = await handleSubmit(mutationFn, searchCriterion, '');
    const formattedOptions = generateOptions(
      response?.data?.data?.items ?? response?.data?.data,
      labelKey,
      valueKey
    );
    return formattedOptions;
  };

  // Reset page number when fetchKey changes
  useEffect(() => {
    if (fetchKey !== prevFetchKey) {
      setOptions([]);
      setPageNumber(1);
      setPrevPageNumber(1);
    }
  }, [fetchKey]);

  useEffect(() => {
    if (data?.data) {
      const formattedOptions = generateOptions(
        data?.data?.items ?? data?.data,
        labelKey,
        valueKey
      );
      // If fetchKey is provided and it has changed, replace the options
      if (fetchKey !== undefined && fetchKey !== prevFetchKey) {
        setOptions(formattedOptions); // Replace options
        setPrevFetchKey(fetchKey); // Update prevFetchKey
        setPrevPageNumber(pageNumber);
        // Data are unsually undefined when fetching so this component is called twice and the condition fixes that
      } else if (fetchKey === prevFetchKey && pageNumber === prevPageNumber) {
        setOptions(formattedOptions);
      } else if (fetchKey === prevFetchKey && pageNumber !== prevPageNumber) {
        setOptions((prev) => [...prev, ...formattedOptions]);
      } else if (!fetchKey) {
        setOptions((prev) => [...prev, ...formattedOptions]);
      }
    }
  }, [data, fetchKey]);

  return (
    <FormSelect
      name={selectName}
      title={selectTitle}
      options={options}
      onSelect={(option) => handleSelect && handleSelect(option as Option)}
      isLoading={isLoading}
      defaultInputValue={defaultInputValue ?? undefined}
      callBackFunction={(inputValue: string) => handleSearch(inputValue)}
      isAsync={mutationFn ? true : false}
      handleOnMenuScrollToBottom={handlePagination}
      showTitleAfterSelect={showTitleAfterSelect}
      isSearchable
      isInvalid={isInvalid}
      isMultiSelect={isMultiSelect}
      selectStyles={selectStyles}
    />
  );
};

export default GenericAsyncSelect;
