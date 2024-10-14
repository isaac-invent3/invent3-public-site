import React, { useState } from 'react';
import GenericAsyncSelect from '~/lib/components/UI/GenericAsyncSelect';
import { Option, SearchCriterion } from '~/lib/interfaces/general.interfaces';
import { useAppSelector } from '~/lib/redux/hooks';
import {
  useGetStatesByCountryIdQuery,
  useSearchStatesMutation,
} from '~/lib/redux/services/asset/location.services';
import { OPERATORS } from '~/lib/utils/constants';

interface StateSelectProps {
  countryId: number | null;
  // eslint-disable-next-line no-unused-vars
  handleSelect?: (options: Option) => void;
}

const StateSelect = (props: StateSelectProps) => {
  const { countryId, handleSelect } = props;
  const { stateName } = useAppSelector((state) => state.asset.assetForm);
  const [searchState] = useSearchStatesMutation({});
  const [pageNumber, setPageNumber] = useState(1);
  const { data, isLoading } = useGetStatesByCountryIdQuery(
    {
      id: countryId,
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
      selectName="stateId"
      selectTitle="State"
      data={data}
      labelKey="stateName"
      valueKey="stateId"
      defaultInputValue={stateName}
      mutationFn={searchState}
      isLoading={isLoading}
      pageNumber={pageNumber}
      setPageNumber={setPageNumber}
      specialSearch={stateSearchCriterion}
      fetchKey={countryId}
      handleSelect={handleSelect}
    />
  );
};

export default StateSelect;
