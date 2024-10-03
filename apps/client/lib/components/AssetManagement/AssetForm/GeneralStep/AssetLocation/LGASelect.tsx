import React, { useState } from 'react';
import GenericAsyncSelect from '~/lib/components/UI/GenericAsyncSelect';
import { Option, SearchCriterion } from '~/lib/interfaces/general.interfaces';
import {
  useGetLGAByStateIdQuery,
  useSearchLGAMutation,
} from '~/lib/redux/services/asset/location.services';
import { OPERATORS } from '~/lib/utils/constants';

interface LGASelectProps {
  stateId: number | null;
  // eslint-disable-next-line no-unused-vars
  handleSelect?: (options: Option) => void;
}

const LGASelect = (props: LGASelectProps) => {
  const { stateId, handleSelect } = props;
  const [searchLga] = useSearchLGAMutation({});
  const [pageNumber, setPageNumber] = useState(1);
  const { data, isLoading, isFetching } = useGetLGAByStateIdQuery(
    {
      id: stateId,
      pageSize: 45,
      pageNumber,
    },
    { skip: !stateId }
  );

  const lgaSearchCriterion = (searchValue: string): SearchCriterion[] => {
    const criterion = [
      {
        columnName: 'stateId',
        columnValue: stateId?.toString() as string,
        operation: OPERATORS.Equals,
      },
      {
        columnName: 'lgaName',
        columnValue: searchValue,
        operation: OPERATORS.Contains,
      },
    ];
    return criterion;
  };

  return (
    <GenericAsyncSelect
      selectName="lgaId"
      selectTitle="LGA"
      data={isFetching ? [] : data}
      labelKey="lgaName"
      valueKey="lgaId"
      mutationFn={searchLga}
      isLoading={isLoading}
      pageNumber={pageNumber}
      setPageNumber={setPageNumber}
      specialSearch={lgaSearchCriterion}
      fetchKey={stateId}
      handleSelect={handleSelect}
    />
  );
};

export default LGASelect;
