import { SimpleGrid, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import DetailHeader from '../../../../UI/DetailHeader';
import DetailSection from '../../DetailSection';
import { useAppSelector } from '~/lib/redux/hooks';

const InfoOne = () => {
  const assetData = useAppSelector((state) => state.asset.asset);
  const {
    facilityName,
    departmentName,
    buildingName,
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
          departmentName,
          buildingName,
          roomName,
          aisleName,
          shelfName,
        ]
          .filter(Boolean)
          .join(', ') || '-',
    },
    {
      label: 'Asset Code:',
      value: assetCode ?? '-',
    },
    {
      label: 'Weight:',
      value: `${weightKg ?? 0}kg`,
    },
    {
      label: 'Length:',
      value: `${lengthCm ?? 0}cm`,
    },
    {
      label: 'Width:',
      value: `${widthCm ?? 0}cm`,
    },
    {
      label: 'Height::',
      value: `${heightCm ?? 0}cm`,
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
