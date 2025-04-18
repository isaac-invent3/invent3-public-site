'use client';

import { Heading, SimpleGrid, Skeleton, Text, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useGetAllFacilitiesQuery } from '~/lib/redux/services/location/facility.services';
import { DEFAULT_PAGE_SIZE } from '~/lib/utils/constants';
import LocationCard from './LocationCard';
import Header from '../Header';

const Locations = () => {
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [pageNumber, setPageNumber] = useState(1);
  const { data, isLoading } = useGetAllFacilitiesQuery({
    pageSize,
    pageNumber,
  });

  return (
    <VStack
      width="full"
      spacing={{ base: '16px', lg: '32px' }}
      px={{ base: '16px', lg: 0 }}
      pb="26px"
    >
      <Header />
      <VStack
        py="16px"
        px={{ base: '12px', lg: '16px' }}
        alignItems="flex-start"
        bgColor="white"
        spacing={{ base: '22px', lg: '19px' }}
        rounded="8px"
        minH="60vh"
        width="full"
      >
        <Heading
          color="primary.500"
          fontWeight={700}
          fontSize={{ base: '14px', lg: '24px' }}
          lineHeight="16px"
        >
          Locations/Facilities
        </Heading>
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
                id={item.facilityId}
                facilityName={item.facilityName}
                lgaName={item.facilityName}
                stateName={item.facilityName}
                key={index}
                customStyle={{ width: 'full' }}
              />
            ))}
          </SimpleGrid>
        )}
        {!isLoading && data?.data?.items.length === 0 && (
          <Text color="neutral.250" my="20vh" textAlign="center" width="full">
            No Location at the moment
          </Text>
        )}
      </VStack>
    </VStack>
  );
};

export default Locations;
