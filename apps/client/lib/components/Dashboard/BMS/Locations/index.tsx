import { HStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useGetAllFacilitiesQuery } from '~/lib/redux/services/location/facility.services';
import { DEFAULT_PAGE_SIZE } from '~/lib/utils/constants';
import LocationSkeleton from './LocationSkeleton';
import LocationCard from './LocationCard';

interface LocationsProps {
  type: 'preview' | 'full';
}
const Locations = (props: LocationsProps) => {
  const { type } = props;
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [pageNumber, setPageNumber] = useState(1);
  const { data, isLoading } = useGetAllFacilitiesQuery({
    pageSize: type === 'preview' ? 10 : pageSize,
    pageNumber,
  });

  if (type === 'preview') {
    return isLoading ? (
      <LocationSkeleton
        numberOfSkeleton={10}
        customStyles={{ direction: 'row' }}
      />
    ) : (
      <HStack overflowX="scroll" width="full">
        {data?.data?.items.map((item, index) => (
          <LocationCard
            id={item.facilityId}
            facilityName={item.facilityName}
            lgaName={item.facilityName}
            stateName={item.facilityName}
            key={index}
          />
        ))}
      </HStack>
    );
  }
};

export default Locations;
