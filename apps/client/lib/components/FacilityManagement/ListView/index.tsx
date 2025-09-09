import { Heading, SimpleGrid, Skeleton, VStack } from '@chakra-ui/react';
import React from 'react';
import { useGetAggregateFacilityByStateQuery } from '~/lib/redux/services/location/facility.services';
import LocationCard from '../LocationCard';
import { ROUTES } from '~/lib/utils/constants';
import { EmptyState } from '@repo/ui/components';

const ListView = () => {
  const { data, isLoading } = useGetAggregateFacilityByStateQuery();

  return (
    <VStack
      width="full"
      rounded="6px"
      minHeight="60vh"
      spacing="19px"
      p="16px"
      alignItems="flex-start"
      bgColor="white"
    >
      <Heading size="lg">Facility - Nigeria</Heading>
      {isLoading && (
        <SimpleGrid
          width="full"
          columns={{ base: 1, sm: 2, md: 3, lg: 4, xl: 5 }}
          gap={{ base: '16px', lg: '8px' }}
        >
          {Array(10)
            .fill('')
            .map((_, index) => (
              <Skeleton width="full" height="175px" rounded="8px" key={index} />
            ))}
        </SimpleGrid>
      )}
      {!isLoading && data?.data && data?.data?.length > 0 && (
        <SimpleGrid
          width="full"
          columns={{ base: 1, sm: 2, md: 3, lg: 4, xl: 5 }}
          gap={{ base: '16px', lg: '8px' }}
        >
          {data?.data?.map((item, index) => (
            <LocationCard
              href={`/${ROUTES.LOCATION}/${item.stateId}/detail`}
              title={`${item.stateName} State`}
              subtitle={`${item.totalBranchCount} Branches`}
              key={index}
              customStyle={{ width: 'full' }}
            />
          ))}
        </SimpleGrid>
      )}
      {!isLoading && data && data?.data?.length === 0 && <EmptyState />}
    </VStack>
  );
};

export default ListView;
