import React, { useState } from 'react';
import GenericAsyncSelect from '~/lib/components/UI/GenericAsyncSelect';
import { Option, SearchCriterion } from '~/lib/interfaces/general.interfaces';
import { useAppSelector } from '~/lib/redux/hooks';
import {
  useGetAllFacilitiesQuery,
  useGetFacilitiesByLGAIdQuery,
  useSearchFacilitiesMutation,
} from '~/lib/redux/services/asset/location.services';
import { DEFAULT_PAGE_SIZE, OPERATORS } from '~/lib/utils/constants';

interface FacilitySelectProps {
  // eslint-disable-next-line no-unused-vars
  handleSelect?: (options: Option) => void;
  type: 'general' | 'specificById';
  lgaId?: number | null;
}

const FacilitySelect = (props: FacilitySelectProps) => {
  const { handleSelect, type, lgaId } = props;
  const { facilityName } = useAppSelector((state) => state.asset.assetForm);
  const [searchFacility] = useSearchFacilitiesMutation({});

  const [pageNumber, setPageNumber] = useState(1);
  const { data, isLoading } = useGetAllFacilitiesQuery(
    {
      pageSize: DEFAULT_PAGE_SIZE,
      pageNumber,
    },
    { skip: type === 'specificById' }
  );
  const { data: facilitiesByLGAIDData, isLoading: isLoadingFacilitiesByLGAId } =
    useGetFacilitiesByLGAIdQuery(
      {
        id: lgaId,
        pageSize: DEFAULT_PAGE_SIZE,
        pageNumber,
      },
      { skip: !lgaId }
    );

  const facilitiesByLGAIdCriterion = (
    searchValue: string
  ): SearchCriterion[] => {
    const criterion = [
      {
        columnName: 'lgaId',
        columnValue: lgaId?.toString() as string,
        operation: OPERATORS.Equals,
      },
      {
        columnName: 'facilityName',
        columnValue: searchValue,
        operation: OPERATORS.Contains,
      },
    ];
    return criterion;
  };

  return (
    <GenericAsyncSelect
      selectName="facilityId"
      selectTitle="Facility"
      data={type === 'general' ? data : lgaId ? facilitiesByLGAIDData : []}
      labelKey="facilityName"
      valueKey="facilityId"
      defaultInputValue={facilityName}
      mutationFn={searchFacility}
      isLoading={isLoading || isLoadingFacilitiesByLGAId}
      pageNumber={pageNumber}
      setPageNumber={setPageNumber}
      handleSelect={handleSelect}
      fetchKey={lgaId}
      specialSearch={
        type === 'specificById' ? facilitiesByLGAIdCriterion : undefined
      }
    />
  );
};

export default FacilitySelect;
