import { Heading, HStack, Text, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import Header from './Header';
import SummaryDetail from './SummaryDetail';
import EnergyStats from './EnergyStats';
import Link from 'next/link';
import LocationSkeleton from './Locations/LocationSkeleton';
import LocationCard from './Locations/LocationCard';
import { useGetAllFacilitiesQuery } from '~/lib/redux/services/location/facility.services';

const BMSDashboard = () => {
  const [pageSize, setPageSize] = useState(10);
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
        minH="40vh"
        width="full"
      >
        <HStack width="full" justifyContent="space-between">
          <Heading
            color="primary.500"
            fontWeight={700}
            fontSize={{ base: '14px', lg: '24px' }}
            lineHeight="16px"
          >
            Locations/Facilities
          </Heading>
          <Link href={`/dashboard/bms/locations`}>
            <Text color="#0366EF">See All 36 Locations</Text>
          </Link>
        </HStack>
        <VStack width="full" spacing="24px">
          {isLoading ? (
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
          )}
          <SummaryDetail />
          <EnergyStats />
        </VStack>
      </VStack>
    </VStack>
  );
};

export default BMSDashboard;
