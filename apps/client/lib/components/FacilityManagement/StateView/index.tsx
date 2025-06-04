'use client';

import {
  Flex,
  Heading,
  HStack,
  Icon,
  SimpleGrid,
  Skeleton,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import { Button, EmptyState } from '@repo/ui/components';
import { ROUTES } from '~/lib/utils/constants';
import { useGetFacilitiesByStateIdQuery } from '~/lib/redux/services/location/facility.services';
import { useParams } from 'next/navigation';
import PageHeader from '../../UI/PageHeader';
import { AddIcon } from '../../CustomIcons';
import LocationCard from '../LocationCard';
import { State } from '~/lib/interfaces/location.interfaces';

const StateView = ({ data: stateData }: { data: State }) => {
  const params = useParams();
  const stateId = params?.stateId as unknown as number;

  const { data, isLoading } = useGetFacilitiesByStateIdQuery({ id: stateId });
  return (
    <Flex width="full" direction="column" pb="24px" gap="32px">
      <HStack width="full" justifyContent="space-between">
        <PageHeader>Facility Management</PageHeader>
        <Button
          customStyles={{
            width: '184px',
            height: { base: '36px', md: 'min-content' },
            alignSelf: 'end',
          }}
        >
          <Icon as={AddIcon} boxSize="18px" color="#D2FEFD" mr="4px" />
          Add New Facility
        </Button>
      </HStack>
      <VStack
        width="full"
        rounded="6px"
        minHeight="60vh"
        spacing="19px"
        p="16px"
        alignItems="flex-start"
        bgColor="white"
      >
        <Heading size="lg">{`${stateData?.stateName} State`}</Heading>
        {isLoading && (
          <SimpleGrid
            width="full"
            columns={{ base: 1, sm: 2, md: 3, lg: 4, xl: 5 }}
            gap={{ base: '16px', lg: '8px' }}
          >
            {Array(10)
              .fill('')
              .map((_, index) => (
                <Skeleton
                  width="full"
                  height="175px"
                  rounded="8px"
                  key={index}
                />
              ))}
          </SimpleGrid>
        )}
        {!isLoading && data?.data && data?.data?.items.length > 0 && (
          <SimpleGrid
            width="full"
            columns={{ base: 1, sm: 2, md: 3, lg: 4, xl: 5 }}
            gap={{ base: '16px', lg: '8px' }}
          >
            {data?.data?.items.map((item, index) => (
              <LocationCard
                href={`/${ROUTES.LOCATION}/${stateId}/facility/${item.facilityId}`}
                title={`${item.facilityName}`}
                subtitle={`${item.address}`}
                key={index}
                customStyle={{ width: 'full' }}
              />
            ))}
          </SimpleGrid>
        )}
        {!isLoading && data && data?.data?.items.length === 0 && <EmptyState />}
      </VStack>
    </Flex>
  );
};

export default StateView;
