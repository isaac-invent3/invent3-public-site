'use client';

import {
  Flex,
  Heading,
  HStack,
  Icon,
  SimpleGrid,
  Skeleton,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { Button, ButtonPagination, EmptyState } from '@repo/ui/components';
import { DEFAULT_PAGE_SIZE, ROUTES } from '~/lib/utils/constants';
import { useGetFacilitiesByStateIdQuery } from '~/lib/redux/services/location/facility.services';
import { useParams } from 'next/navigation';
import PageHeader from '../../UI/PageHeader';
import { AddIcon } from '../../CustomIcons';
import LocationCard from '../LocationCard';
import { Facility, State } from '~/lib/interfaces/location.interfaces';
import BuildingDetailDrawer from '../Drawers/DetailsDrawers/BuildingDetailDrawer';
import { registerCloseFn } from '../Drawers/DetailsDrawers/utils';

const StateView = ({ data: stateData }: { data: State }) => {
  const params = useParams();
  const stateId = params?.stateId as unknown as number;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [selectedFacility, setSelectedFacility] = useState<Facility | null>(
    null
  );
  const { data, isLoading, isFetching } = useGetFacilitiesByStateIdQuery({
    id: stateId,
    pageSize,
    pageNumber,
  });

  return (
    <>
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
          justifyContent="space-between"
        >
          <VStack spacing="19px" alignItems="flex-start" width="full">
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
                opacity={isFetching ? 0.5 : 1}
              >
                {data?.data?.items.map((item, index) => (
                  <LocationCard
                    handleClick={() => {
                      setSelectedFacility(item);
                      registerCloseFn(onClose);
                      onOpen();
                    }}
                    title={`${item.facilityName}`}
                    subtitle={`${item.address}`}
                    key={index}
                    imageUrl={
                      item?.image && item?.imageBasePrefix
                        ? `${item?.imageBasePrefix}${item?.image}`
                        : undefined
                    }
                    customStyle={{ width: 'full' }}
                  />
                ))}
              </SimpleGrid>
            )}
            {!isLoading && data && data?.data?.items.length === 0 && (
              <EmptyState containerStyle={{ my: '20vh' }} />
            )}
          </VStack>
          {(data?.data?.hasPreviousPage || data?.data?.hasNextPage) && (
            <ButtonPagination
              currentPage={pageNumber}
              setCurrentPage={setPageNumber}
              totalPages={data?.data?.totalPages}
            />
          )}
        </VStack>
      </Flex>
      {selectedFacility && (
        <BuildingDetailDrawer
          onClose={() => {
            onClose();
          }}
          isOpen={isOpen}
          facilityData={selectedFacility}
        />
      )}
    </>
  );
};

export default StateView;
