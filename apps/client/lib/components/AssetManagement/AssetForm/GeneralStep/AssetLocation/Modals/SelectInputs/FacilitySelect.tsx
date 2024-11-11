import React, { useState } from 'react';
import GenericAsyncSelect from '~/lib/components/UI/GenericAsyncSelect';
import { Option } from '~/lib/interfaces/general.interfaces';
import { useAppSelector } from '~/lib/redux/hooks';
import {
  useGetAllFacilitiesQuery,
  useSearchFacilitiesMutation,
} from '~/lib/redux/services/asset/location.services';
import { DEFAULT_PAGE_SIZE } from '~/lib/utils/constants';

interface FacilitySelectProps {
  // eslint-disable-next-line no-unused-vars
  handleSelect?: (options: Option) => void;
}

const FacilitySelect = (props: FacilitySelectProps) => {
  const { handleSelect } = props;
  const { facilityName } = useAppSelector((state) => state.asset.assetForm);
  const [searchFacility] = useSearchFacilitiesMutation({});

  const [pageNumber, setPageNumber] = useState(1);
  const { data, isLoading } = useGetAllFacilitiesQuery({
    pageSize: DEFAULT_PAGE_SIZE,
    pageNumber,
  });
  return (
    <GenericAsyncSelect
      selectName="facilityId"
      selectTitle="Facility"
      data={data}
      labelKey="facilityName"
      valueKey="facilityId"
      defaultInputValue={facilityName}
      mutationFn={searchFacility}
      isLoading={isLoading}
      pageNumber={pageNumber}
      setPageNumber={setPageNumber}
      handleSelect={handleSelect}
    />
  );
};

export default FacilitySelect;
