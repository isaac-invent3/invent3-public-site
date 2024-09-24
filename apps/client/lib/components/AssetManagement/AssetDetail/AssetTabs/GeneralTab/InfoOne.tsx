import { SimpleGrid, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import DetailHeader from '../../../../UI/DetailHeader';
import DetailSection from '../../DetailSection';
import { useAppSelector } from '~/lib/redux/hooks';

const InfoOne = () => {
  const assetData = useAppSelector((state) => state.asset.asset);
  const {
    countryName,
    stateName,
    lganame,
    facilityName,
    floorName,
    buildingName,
    departmentName,
    roomName,
    aisleName,
    shelfName,
    weightKg,
    lengthCm,
    assetCode,
    heightCm,
    widthCm,
    description,
  } = assetData;
  const details = [
    {
      label: 'Country:',
      value: countryName ?? 'N/A',
    },
    {
      label: 'State:',
      value: stateName ?? 'N/A',
    },
    {
      label: 'LGA:',
      value: lganame ?? 'N/A',
    },
    {
      label: 'Location:',
      value:
        [
          facilityName,
          buildingName,
          floorName,
          departmentName,
          roomName,
          aisleName,
          shelfName,
        ]
          .filter(Boolean)
          .join(', ') || 'N/A',
    },
    {
      label: 'Asset Code:',
      value: assetCode ?? 'N/A',
    },
    {
      label: 'Weight:',
      value: weightKg !== null ? `${weightKg}kg` : 'N/A',
    },
    {
      label: 'Length:',
      value: lengthCm !== null ? `${lengthCm}cm` : 'N/A',
    },
    {
      label: 'Width:',
      value: widthCm !== null ? `${widthCm}cm` : 'N/A',
    },
    {
      label: 'Height:',
      value: heightCm !== null ? `${heightCm}cm` : 'N/A',
    },
  ];

  return (
    <SimpleGrid
      columns={2}
      width="full"
      gap="74px"
      alignItems="flex-start"
      justifyContent="space-between"
    >
      <VStack alignItems="flex-start" spacing="8px">
        <DetailSection details={details} minWidth="77px" />
      </VStack>
      <VStack alignItems="flex-start">
        <DetailHeader variant="secondary">Description:</DetailHeader>
        <Text size="md" color="neutral.800" fontWeight={400}>
          {description}
        </Text>
      </VStack>
    </SimpleGrid>
  );
};

export default InfoOne;
