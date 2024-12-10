import { SimpleGrid, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import DetailHeader from '../../../../UI/DetailHeader';
import DetailSection from '../../DetailSection';
import { useAppSelector } from '~/lib/redux/hooks';
import PhotoViewer from './InfoTwo.tsx/Photos';

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
          lganame,
          stateName,
          countryName,
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
      <VStack alignItems="flex-start" spacing="20px">
        <VStack width="full" spacing="8px" alignItems="flex-start">
          <DetailHeader variant="secondary">Description:</DetailHeader>
          <Text size="md" color="neutral.800" fontWeight={400}>
            {description}
          </Text>
        </VStack>
        <PhotoViewer />
      </VStack>
    </SimpleGrid>
  );
};

export default InfoOne;
