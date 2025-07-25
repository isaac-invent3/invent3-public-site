import React, { useState } from 'react';
import GenericAsyncSelect from '~/lib/components/UI/GenericAsyncSelect';
import { Option, SearchCriterion } from '~/lib/interfaces/general.interfaces';
import { useAppSelector } from '~/lib/redux/hooks';
import {
  useGetAllLGASQuery,
  useGetLGAByStateIdQuery,
  useSearchLGAMutation,
} from '~/lib/redux/services/location/lga.services';
import { DEFAULT_PAGE_SIZE, OPERATORS } from '~/lib/utils/constants';

interface LGASelectProps {
  // eslint-disable-next-line no-unused-vars
  handleSelect?: (options: Option) => void;
  type: 'general' | 'specificById';
  stateId?: number | null;
  name?: string;
}

const LGASelect = (props: LGASelectProps) => {
  const { stateId, handleSelect, type, name } = props;
  const { lgaName } = useAppSelector((state) => state.asset.assetForm);
  const [searchLga] = useSearchLGAMutation({});
  const [pageNumber, setPageNumber] = useState(1);
  const { data: allLgasData, isLoading: isLoadingAllLGAS } = useGetAllLGASQuery(
    {
      pageSize: DEFAULT_PAGE_SIZE,
      pageNumber,
    },
    { skip: type === 'specificById' }
  );
  const { data, isLoading } = useGetLGAByStateIdQuery(
    {
      id: stateId ?? undefined,
      pageSize: 47,
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
      selectName={name ?? 'lgaId'}
      selectTitle="LGA"
      data={type === 'general' ? allLgasData : stateId ? data : []}
      labelKey="lgaName"
      valueKey="lgaId"
      defaultInputValue={lgaName}
      mutationFn={searchLga}
      isLoading={isLoading || isLoadingAllLGAS}
      pageNumber={pageNumber}
      setPageNumber={setPageNumber}
      handleSelect={handleSelect}
      fetchKey={stateId}
      specialSearch={
        type === 'specificById' && stateId ? lgaSearchCriterion : undefined
      }
    />
  );
};

export default LGASelect;
