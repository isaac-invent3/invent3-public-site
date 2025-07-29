import React, { useState } from 'react';
import { CSSObjectWithLabel } from 'react-select';
import GenericAsyncSelect from '~/lib/components/UI/GenericAsyncSelect';
import { Option, SearchCriterion } from '~/lib/interfaces/general.interfaces';
import { useAppSelector } from '~/lib/redux/hooks';
import {
  useGetAllFloorsQuery,
  useGetFloorsByBuildingIdQuery,
  useSearchFloorsMutation,
} from '~/lib/redux/services/location/floor.services';
import { DEFAULT_PAGE_SIZE, OPERATORS } from '~/lib/utils/constants';

interface FloorSelectProps {
  // eslint-disable-next-line no-unused-vars
  handleSelect?: (options: Option) => void;
  type: 'general' | 'specificById';
  buildingId?: number | null;
  selectStyles?: CSSObjectWithLabel;
  selectName?: string;
}

const FloorSelect = (props: FloorSelectProps) => {
  const { handleSelect, type, buildingId, selectStyles, selectName } = props;
  const { floorName } = useAppSelector((state) => state.asset.assetForm);
  const [searchFloors] = useSearchFloorsMutation({});

  const [pageNumber, setPageNumber] = useState(1);
  const { data, isLoading, isFetching } = useGetAllFloorsQuery(
    {
      pageSize: DEFAULT_PAGE_SIZE,
      pageNumber,
    },
    { skip: type === 'specificById' }
  );
  const {
    data: floorsByBuildingIdData,
    isLoading: isLoadingFloorsByBuildingIdData,
    isFetching: isFetchingFloorsByBuildingIdData,
  } = useGetFloorsByBuildingIdQuery(
    {
      id: buildingId ?? undefined,
      pageSize: DEFAULT_PAGE_SIZE,
      pageNumber,
    },
    { skip: !buildingId }
  );

  const floorsByBuildingIdCriterion = (
    searchValue: string
  ): SearchCriterion[] => {
    const criterion = [
      {
        columnName: 'buildingId',
        columnValue: buildingId?.toString() as string,
        operation: OPERATORS.Equals,
      },
      {
        columnName: 'floorName',
        columnValue: searchValue,
        operation: OPERATORS.Contains,
      },
    ];
    return criterion;
  };

  return (
    <GenericAsyncSelect
      selectName={selectName ?? 'floorId'}
      selectTitle="Floor"
      data={
        type === 'general' ? data : buildingId ? floorsByBuildingIdData : []
      }
      labelKey="floorName"
      valueKey="floorId"
      defaultInputValue={floorName}
      mutationFn={searchFloors}
      isLoading={
        isLoading ||
        isLoadingFloorsByBuildingIdData ||
        isFetching ||
        isFetchingFloorsByBuildingIdData
      }
      pageNumber={pageNumber}
      setPageNumber={setPageNumber}
      handleSelect={handleSelect}
      fetchKey={buildingId}
      specialSearch={
        type === 'specificById' ? floorsByBuildingIdCriterion : undefined
      }
      selectStyles={selectStyles}
    />
  );
};

export default FloorSelect;
