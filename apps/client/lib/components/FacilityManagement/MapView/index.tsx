import { Flex, HStack, Icon, Text, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import MapViewComponent from './Map';
import Stats from './Stats';
import { ChevronLeftIcon } from '@chakra-ui/icons';
import { LoadingSpinner } from '@repo/ui/components';
import {
  FacilityMapStats,
  SingleMapFacilityData,
} from '~/lib/interfaces/location.interfaces';
import {
  useGetLGAFacilityCountByStateIdQuery,
  useGetStateFacilityCountByCountryIdQuery,
} from '~/lib/redux/services/location/facility.services';

const generateFacilityCountOption = (
  data: FacilityMapStats[] | undefined
): Record<string, SingleMapFacilityData> => {
  const options: Record<string, SingleMapFacilityData> = {};

  if (data && Array.isArray(data)) {
    data.forEach((item) => {
      const label = item.lgaName || item.stateName || 'Unknown Location';
      const id = item.stateId || item.lgaId || 0;
      options[label] = {
        count: item?.facilityCount!,
        id: id,
        name: label,
      };
    });
  }

  return options;
};

const MapView = () => {
  const [selectedState, setSelectedState] =
    useState<SingleMapFacilityData | null>(null);
  const { data: stateFacilityCount, isLoading: isLoadingStateFacilityCount } =
    useGetStateFacilityCountByCountryIdQuery({ id: 1, pageSize: 37 });
  const { data: lgaFacilityCount, isLoading: isLoadingLGAFacilityCount } =
    useGetLGAFacilityCountByStateIdQuery(
      { id: selectedState?.id, pageSize: 45 },
      { skip: !selectedState }
    );
  const facilityLabel = selectedState?.name
    ? `in ${selectedState?.name}`
    : 'Under Management';

  return (
    <Flex width="full" height="full" gap="20px" justifyContent="space-between">
      <Flex
        width="80%"
        height="full"
        position="relative"
        direction="column"
        alignItems="flex-start"
      >
        <HStack width="full" justifyContent="space-between" my="32px">
          <VStack pl="24px" alignItems="flex-start" spacing="4px">
            <Text
              fontWeight={700}
              size="lg"
              whiteSpace="nowrap"
            >{`Facilities ${facilityLabel}`}</Text>
            {!selectedState?.id && (
              <Text color="neutral.600" maxW="124px">
                Click on the different region to drill down
              </Text>
            )}
          </VStack>
          {selectedState?.name && (
            <HStack
              alignItems="center"
              spacing="4px"
              mt="8px"
              cursor="pointer"
              onClick={() => setSelectedState(null)}
            >
              <Icon as={ChevronLeftIcon} boxSize="24px" />
              <Text>Back To Country Map</Text>
            </HStack>
          )}
        </HStack>
        {isLoadingLGAFacilityCount || isLoadingStateFacilityCount ? (
          <VStack justifyContent="center" minHeight="50vh" width="full">
            <LoadingSpinner />
          </VStack>
        ) : (
          <Flex
            width="full"
            height="full"
            maxH="60%"
            zIndex={99}
            alignItems="flex-start"
            justifyContent="center"
            position="relative"
          >
            {/* <Flex
              width="full"
              height="full"
              position="absolute"
              alignItems="center"
              justifyContent="center"
              top={0}
              bottom={0}
              right={0}
              left={0}
              pointerEvents="none"
              overflow="hidden"
            >
              <Text
                textAlign="center"
                letterSpacing="0.3em"
                fontSize="174.62px"
                lineHeight="207.45px"
                fontWeight={900}
                color="neutral.300"
                transform="rotate(-27deg)"
                opacity={0.8}
              >
                {selectedState?.name}
              </Text>
            </Flex> */}
            <Flex width={{ base: '100%', '2xl': '67%' }}>
              <MapViewComponent
                selectedState={selectedState}
                setSelectedState={setSelectedState}
                facilityData={generateFacilityCountOption(
                  selectedState?.id
                    ? lgaFacilityCount?.data?.items
                    : stateFacilityCount?.data?.items
                )}
              />
            </Flex>
          </Flex>
        )}
      </Flex>
      <Flex width="256px" mt="24px" pr="9px">
        <Stats
          isLoading={isLoadingLGAFacilityCount || isLoadingStateFacilityCount}
          data={generateFacilityCountOption(
            selectedState?.id
              ? lgaFacilityCount?.data?.items
              : stateFacilityCount?.data?.items
          )}
          type={selectedState?.id ? 'lga' : 'state'}
          selectedState={selectedState}
        />
      </Flex>
    </Flex>
  );
};

export default MapView;
