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
    <Stack
      alignItems="flex-start"
      spacing={{ base: '8px', '2xl': '56px' }}
      width="max-content"
      direction={{ base: 'column', '2xl': 'row' }}
    >
      <Stack direction="row" alignItems="flex-start" width="max-content">
        <Text color="neutral.600" size="md" minW="65px">
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
      <Stack
        direction="row"
        alignItems="flex-start"
        justifyContent="flex-start"
        width="max-content"
      >
        <Text color="neutral.600" size="md" minW="65px">
          Condition:
        </Text>
        <Text color="black" size="md">
          {currentCondition ?? 'N/A'}
        </Text>
      </Stack>
    </Stack>
  );
};

export default LocationConditionInfo;
