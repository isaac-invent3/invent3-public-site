import { Flex, SimpleGrid, VStack } from '@chakra-ui/react';
import React from 'react';
import DetailHeader from '../../../../../UI/DetailHeader';
import DetailSection from '../../../DetailSection';
import { useAppSelector } from '~/lib/redux/hooks';

const InfoTwo = () => {
  const assetData = useAppSelector((state) => state.asset.asset);
  const { currentOwner, departmentName, assignedTo, responsibleFor } =
    assetData;
  const details = [
    {
      label: 'Owner',
      value: currentOwner ?? 'N/A',
    },
    {
      label: 'Department',
      value: departmentName ?? 'N/A',
    },
    {
      label: 'Responsible for',
      value: responsibleFor ?? 'N/A',
    },
    {
      label: 'Assigned to',
      value: assignedTo ?? 'N/A',
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
      <VStack alignItems="flex-start" spacing="16px">
        <DetailSection
          minWidth="101px"
          details={details}
          header="Owner's Info"
        />
      </VStack>
      <VStack alignItems="flex-start" spacing="16px">
        <DetailHeader variant="secondary">Photos</DetailHeader>
        <Flex width="full" gap="16px" wrap="wrap">
          {Array(8)
            .fill('')
            .map((_, index) => (
              <Flex
                key={index}
                width="60px"
                height="60px"
                rounded="8px"
                bgColor="#6E7D8E80"
              />
            ))}
        </Flex>
      </VStack>
    </SimpleGrid>
  );
};

export default InfoTwo;
