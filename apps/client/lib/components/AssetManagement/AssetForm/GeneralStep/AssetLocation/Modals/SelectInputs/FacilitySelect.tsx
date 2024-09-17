import React, { useState } from 'react';
import GenericAsyncSelect from '~/lib/components/UI/GenericAsyncSelect';
import { Option } from '~/lib/interfaces/general.interfaces';
import {
  useGetAllFacilitiesQuery,
  useSearchFacilitiesMutation,
} from '~/lib/redux/services/asset/location.services';

interface FacilitySelectProps {
  // eslint-disable-next-line no-unused-vars
  handleSelect?: (options: Option) => void;
}

const FacilitySelect = (props: FacilitySelectProps) => {
  const { handleSelect } = props;
  const [searchFacility] = useSearchFacilitiesMutation({});

  const [pageNumber, setPageNumber] = useState(1);
  const { data, isLoading } = useGetAllFacilitiesQuery({
    pageSize: 25,
    pageNumber,
  });
  return (
    <GenericAsyncSelect
      selectName="facilityId"
      selectTitle="Facility"
      data={data}
      labelKey="facilityName"
      valueKey="facilityId"
      mutationFn={searchFacility}
      isLoading={isLoading}
      pageNumber={pageNumber}
      setPageNumber={setPageNumber}
      handleSelect={handleSelect}
    />
  );
};

export default FacilitySelect;
