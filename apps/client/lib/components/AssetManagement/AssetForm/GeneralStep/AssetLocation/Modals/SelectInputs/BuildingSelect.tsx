import React, { useState } from 'react';
import { CSSObjectWithLabel } from 'react-select';
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
  selectStyles?: CSSObjectWithLabel;
  selectName?: string;
  selectedOption?: Option | null;
}

const BuildingSelect = (props: BuildingSelectProps) => {
  const {
    handleSelect,
    type,
    facilityId,
    selectStyles,
    selectName,
    selectedOption,
  } = props;
  const { buildingName } = useAppSelector((state) => state.asset.assetForm);
  const [searchBuilding] = useSearchBuildingMutation({});

  const [pageNumber, setPageNumber] = useState(1);
  const { data, isLoading, isFetching } = useGetAllBuildingsQuery(
    {
      pageSize: DEFAULT_PAGE_SIZE,
      pageNumber,
    },
    { skip: type === 'specificById' }
  );
  const {
    data: buildingByFacilityIdData,
    isLoading: isLoadingBuildingByFacilityId,
    isFetching: isFetchingBuildingByFacilityId,
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
      selectName={selectName ?? 'buildingId'}
      selectTitle="Building"
      data={
        type === 'general' ? data : facilityId ? buildingByFacilityIdData : []
      }
      labelKey="buildingName"
      valueKey="buildingId"
      mutationFn={searchBuilding}
      defaultInputValue={buildingName}
      isLoading={
        isLoading ||
        isLoadingBuildingByFacilityId ||
        isFetching ||
        isFetchingBuildingByFacilityId
      }
      pageNumber={pageNumber}
      setPageNumber={setPageNumber}
      handleSelect={handleSelect}
      fetchKey={facilityId}
      specialSearch={
        type === 'specificById' ? buildingByFacilityIdCriterion : undefined
      }
      selectStyles={selectStyles}
      selectedOption={selectedOption ?? undefined}
    />
  );
};

export default BuildingSelect;
