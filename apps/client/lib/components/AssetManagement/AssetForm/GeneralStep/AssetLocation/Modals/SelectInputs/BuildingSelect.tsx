import React, { useState } from 'react';
import GenericAsyncSelect from '~/lib/components/UI/GenericAsyncSelect';
import { Option, SearchCriterion } from '~/lib/interfaces/general.interfaces';
import { useAppSelector } from '~/lib/redux/hooks';
import {
  useGetAllBuildingsQuery,
  useGetBuildingsByFacilityIdQuery,
  useSearchBuildingMutation,
} from '~/lib/redux/services/location/building.services';
import { DEFAULT_PAGE_SIZE, OPERATORS } from '~/lib/utils/constants';

interface BuildingSelectProps {
  // eslint-disable-next-line no-unused-vars
  handleSelect?: (options: Option) => void;
  type: 'general' | 'specificById';
  facilityId?: number | null;
}

const BuildingSelect = (props: BuildingSelectProps) => {
  const { handleSelect, type, facilityId } = props;
  const { buildingName } = useAppSelector((state) => state.asset.assetForm);
  const [searchBuilding] = useSearchBuildingMutation({});

  const [pageNumber, setPageNumber] = useState(1);
  const { data, isLoading } = useGetAllBuildingsQuery(
    {
      pageSize: DEFAULT_PAGE_SIZE,
      pageNumber,
    },
    { skip: type === 'specificById' }
  );
  const {
    data: buildingByFacilityIdData,
    isLoading: isLoadingBuildingByFacilityId,
  } = useGetBuildingsByFacilityIdQuery(
    {
      id: facilityId ?? undefined,
      pageSize: DEFAULT_PAGE_SIZE,
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
      defaultInputValue={buildingName}
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
