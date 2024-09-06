import { Flex, SimpleGrid, VStack } from '@chakra-ui/react';
import React from 'react';
import DetailHeader from '../../../DetailHeader';
import DetailSection from '../../../DetailSection';

const InfoTwo = () => {
  const details = [
    {
      label: 'Owner',
      value: 'Dell',
    },
    {
      label: 'Department',
      value: 'Latitude 360',
    },
    {
      label: 'Responsible for',
      value: 'A23570720495730',
    },
    {
      label: 'Assigned to',
      value: 'Latitude 360',
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
        <DetailHeader>Photos</DetailHeader>
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
