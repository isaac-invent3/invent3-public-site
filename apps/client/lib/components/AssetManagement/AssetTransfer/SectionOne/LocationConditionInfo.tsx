import { HStack, Stack, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { useAppSelector } from '~/lib/redux/hooks';

const LocationConditionInfo = () => {
  const assetData = useAppSelector((state) => state.asset.asset);
  if (!assetData) {
    return null;
  }
  const {
    countryName,
    stateName,
    lganame,
    facilityName,
    buildingName,
    floorName,
    departmentName,
    roomName,
    aisleName,
    shelfName,
    currentCondition,
  } = assetData;
  return (
    <HStack alignItems="flex-start" spacing="56px" width="full">
      <Stack
        direction={{ base: 'column', lg: 'row' }}
        alignItems="flex-start"
        spacing={{ base: '8px', lg: '16px' }}
        width="max-content"
      >
        <Text color="neutral.600" size="md">
          Location:
        </Text>
        <Text
          color="black"
          size="md"
          lineHeight="22px"
          width="full"
          maxW={{ base: 'full', sm: '60%', lg: '157px' }}
        >
          {[
            countryName,
            stateName,
            lganame,
            facilityName,
            buildingName,
            floorName,
            departmentName,
            roomName,
            aisleName,
            shelfName,
          ]
            .filter(Boolean)
            .join(', ') ?? 'N/A'}
        </Text>
      </Stack>
      <VStack
        spacing="8px"
        alignItems="flex-start"
        width={{ base: '40%', lg: 'max-content' }}
      >
        <Text color="neutral.600" size="md">
          Condition:
        </Text>
        <Text color="black" size="md" lineHeight="22px">
          {currentCondition ?? 'N/A'}
        </Text>
      </VStack>
    </HStack>
  );
};

export default LocationConditionInfo;
