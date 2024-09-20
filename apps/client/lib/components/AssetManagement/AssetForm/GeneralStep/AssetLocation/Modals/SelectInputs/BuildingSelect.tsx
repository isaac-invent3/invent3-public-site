import React, { useState } from 'react';
import GenericAsyncSelect from '~/lib/components/UI/GenericAsyncSelect';
import { Option, SearchCriterion } from '~/lib/interfaces/general.interfaces';
import {
  useGetAllBuildingsQuery,
  useGetBuildingsByFacilityIdQuery,
  useSearchBuildingMutation,
} from '~/lib/redux/services/asset/location.services';
import { OPERATORS } from '~/lib/utils/constants';

interface BuildingSelectProps {
  // eslint-disable-next-line no-unused-vars
  handleSelect?: (options: Option) => void;
  type: 'general' | 'specificById';
  facilityId?: number;
}

const BuildingSelect = (props: BuildingSelectProps) => {
  const { handleSelect, type, facilityId } = props;
  const [searchBuilding] = useSearchBuildingMutation({});

  const [pageNumber, setPageNumber] = useState(1);
  const { data, isLoading } = useGetAllBuildingsQuery(
    {
      pageSize: 25,
      pageNumber,
    },
    { skip: type === 'specificById' }
  );
  const {
    data: buildingByFacilityIdData,
    isLoading: isLoadingBuildingByFacilityId,
  } = useGetBuildingsByFacilityIdQuery(
    {
      id: facilityId,
      pageSize: 25,
      pageNumber,
    },
    { skip: !facilityId }
  );

  const buildingByFacilityIdCriterion = (
    searchValue: string
  ): SearchCriterion[] => {
    const criterion = [
      {
        columnName: 'facilityId',
        columnValue: facilityId?.toString() as string,
        operation: OPERATORS.Equals,
      },
      {
        columnName: 'buildingName',
        columnValue: searchValue,
        operation: OPERATORS.Contains,
      },
    ];
    return criterion;
  };

  return (
    <GenericAsyncSelect
      selectName="buildingId"
      selectTitle="Building"
      data={
        type === 'general' ? data : facilityId ? buildingByFacilityIdData : []
      }
      labelKey="buildingName"
      valueKey="buildingId"
      mutationFn={searchBuilding}
      isLoading={isLoading || isLoadingBuildingByFacilityId}
      pageNumber={pageNumber}
      setPageNumber={setPageNumber}
      handleSelect={handleSelect}
      fetchKey={facilityId}
      specialSearch={
        type === 'specificById' ? buildingByFacilityIdCriterion : undefined
      }
    />
  );
};

export default BuildingSelect;
