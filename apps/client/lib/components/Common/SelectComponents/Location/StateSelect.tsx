import React, { useState } from 'react';
import { CSSObjectWithLabel } from 'react-select';
import GenericAsyncSelect from '~/lib/components/UI/GenericAsyncSelect';
import { Option, SearchCriterion } from '~/lib/interfaces/general.interfaces';
import {
  useGetStatesByCountryIdQuery,
  useSearchStatesMutation,
} from '~/lib/redux/services/location/state.services';
import { OPERATORS } from '~/lib/utils/constants';

interface StateSelectProps {
  countryId: number | null;
  // eslint-disable-next-line no-unused-vars
  handleSelect?: (options: Option) => void;
  name?: string;
  defaultInputValue?: string;
  selectStyles?: CSSObjectWithLabel;
}

const StateSelect = (props: StateSelectProps) => {
  const { name, countryId, handleSelect, defaultInputValue, selectStyles } =
    props;
  const [searchState] = useSearchStatesMutation({});
  const [pageNumber, setPageNumber] = useState(1);
  const { data, isLoading, isFetching } = useGetStatesByCountryIdQuery(
    {
      id: countryId ?? undefined,
      pageSize: 37,
      pageNumber,
    },
    { skip: !countryId }
  );

  const stateSearchCriterion = (searchValue: string): SearchCriterion[] => {
    const criterion = [
      {
        columnName: 'countryId',
        columnValue: countryId?.toString() as string,
        operation: OPERATORS.Equals,
      },
      {
        columnName: 'stateName',
        columnValue: searchValue,
        operation: OPERATORS.Contains,
      },
    ];
    return criterion;
  };

  return (
    <GenericAsyncSelect
      selectName={name ?? 'stateId'}
      selectTitle="State"
      data={data}
      labelKey="stateName"
      valueKey="stateId"
      defaultInputValue={defaultInputValue}
      mutationFn={searchState}
      isLoading={isLoading || isFetching}
      pageNumber={pageNumber}
      setPageNumber={setPageNumber}
      specialSearch={countryId ? stateSearchCriterion : undefined}
      fetchKey={countryId}
      handleSelect={handleSelect}
      selectStyles={selectStyles}
    />
  );
};

export default StateSelect;
