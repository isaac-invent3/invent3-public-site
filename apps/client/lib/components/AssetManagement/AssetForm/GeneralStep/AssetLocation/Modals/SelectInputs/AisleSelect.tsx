import React, { useState } from 'react';
import GenericAsyncSelect from '~/lib/components/UI/GenericAsyncSelect';
import { Option, SearchCriterion } from '~/lib/interfaces/general.interfaces';
import { useAppSelector } from '~/lib/redux/hooks';
import {
  useGetAislesByRoomIdQuery,
  useGetAllAislesQuery,
  useSearchAisleMutation,
} from '~/lib/redux/services/asset/location.services';
import { DEFAULT_PAGE_SIZE, OPERATORS } from '~/lib/utils/constants';

interface AisleSelectProps {
  // eslint-disable-next-line no-unused-vars
  handleSelect?: (options: Option) => void;
  type: 'general' | 'specificById';
  roomId?: number | null;
}

const AisleSelect = (props: AisleSelectProps) => {
  const { handleSelect, type, roomId } = props;
  const { aisleName } = useAppSelector((state) => state.asset.assetForm);
  const [searchAisle] = useSearchAisleMutation({});

  const [pageNumber, setPageNumber] = useState(1);
  const { data, isLoading } = useGetAllAislesQuery(
    {
      pageSize: DEFAULT_PAGE_SIZE,
      pageNumber,
    },
    { skip: type === 'specificById' }
  );
  const { data: aislesByRoomIdData, isLoading: isLoadingAislesByRoomId } =
    useGetAislesByRoomIdQuery(
      {
        id: roomId,
        pageSize: DEFAULT_PAGE_SIZE,
        pageNumber,
      },
      { skip: !roomId }
    );

  const aisleByRoomIdSearchCriterion = (
    searchValue: string
  ): SearchCriterion[] => {
    const criterion = [
      {
        columnName: 'roomId',
        columnValue: roomId?.toString() as string,
        operation: OPERATORS.Equals,
      },
      {
        columnName: 'aisleName',
        columnValue: searchValue,
        operation: OPERATORS.Contains,
      },
    ];
    return criterion;
  };

  return (
    <GenericAsyncSelect
      selectName="aisleId"
      selectTitle="Aisle"
      data={type === 'general' ? data : roomId ? aislesByRoomIdData : []}
      labelKey="aisleName"
      valueKey="aisleId"
      defaultInputValue={aisleName}
      mutationFn={searchAisle}
      isLoading={isLoading || isLoadingAislesByRoomId}
      pageNumber={pageNumber}
      setPageNumber={setPageNumber}
      handleSelect={handleSelect}
      fetchKey={roomId}
      specialSearch={
        type === 'specificById' ? aisleByRoomIdSearchCriterion : undefined
      }
    />
  );
};

export default AisleSelect;
