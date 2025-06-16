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
import PageHeader from '../UI/PageHeader';
import { AddIcon } from '../CustomIcons';
import { Button, EmptyState } from '@repo/ui/components';
import LocationCard from './LocationCard';
import { ROUTES } from '~/lib/utils/constants';
import { useGetAggregateFacilityByStateQuery } from '~/lib/redux/services/location/facility.services';

const FacilityManagement = () => {
  const { data, isLoading } = useGetAggregateFacilityByStateQuery();
  return (
    <Flex
      width="full"
      direction="column"
      pb="24px"
      gap="32px"
      px={{ base: '16px', lg: '0px' }}
    >
      <HStack width="full" justifyContent="space-between">
        <PageHeader>Facility Management</PageHeader>
        <Button
          customStyles={{
            width: '184px',
            height: { base: '36px', md: 'min-content' },
            alignSelf: 'end',
          }}
          href={`/${ROUTES.LOCATION}/add`}
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
                <Skeleton
                  width="full"
                  height="175px"
                  rounded="8px"
                  key={index}
                />
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
                href={`/${ROUTES.LOCATION}/${item.stateId}`}
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
    </Flex>
  );
};

export default FacilityManagement;
