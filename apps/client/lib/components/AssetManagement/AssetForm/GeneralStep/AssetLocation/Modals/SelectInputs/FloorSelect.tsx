import React, { useState } from 'react';
import GenericAsyncSelect from '~/lib/components/UI/GenericAsyncSelect';
import { Option, SearchCriterion } from '~/lib/interfaces/general.interfaces';
import {
  useGetAllFloorsQuery,
  useGetFloorsByBuildingIdQuery,
  useSearchFloorsMutation,
} from '~/lib/redux/services/asset/location.services';
import { OPERATORS } from '~/lib/utils/constants';

interface FloorSelectProps {
  // eslint-disable-next-line no-unused-vars
  handleSelect?: (options: Option) => void;
  type: 'general' | 'specificById';
  buildingId?: number | null;
}

const FloorSelect = (props: FloorSelectProps) => {
  const { handleSelect, type, buildingId } = props;
  const [searchFloors] = useSearchFloorsMutation({});

  const [pageNumber, setPageNumber] = useState(1);
  const { data, isLoading } = useGetAllFloorsQuery(
    {
      pageSize: 25,
      pageNumber,
    },
    { skip: type === 'specificById' }
  );
  const {
    data: floorsByBuildingIdData,
    isLoading: isLoadingFloorsByBuildingIdData,
  } = useGetFloorsByBuildingIdQuery(
    {
      id: buildingId,
      pageSize: 25,
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
      selectName="floorId"
      selectTitle="Floor"
      data={
        type === 'general' ? data : buildingId ? floorsByBuildingIdData : []
      }
      labelKey="floorName"
      valueKey="floorId"
      mutationFn={searchFloors}
      isLoading={isLoading || isLoadingFloorsByBuildingIdData}
      pageNumber={pageNumber}
      setPageNumber={setPageNumber}
      handleSelect={handleSelect}
      fetchKey={buildingId}
      specialSearch={
        type === 'specificById' ? floorsByBuildingIdCriterion : undefined
      }
    />
  );
};

export default FloorSelect;
