import { Flex, Stack, StackDivider, VStack } from '@chakra-ui/react';
import React from 'react';
import Summary from './Summary';
import OccupancyDistribution from './OccupancyDistribution';
import OccupancyInfo from './OccupancyInfo';

const OccupancyManagement = () => {
  const occupanyData = [
    {
      label: 'Zone A',
      color: '#07CC3B',
      value: 60,
    },
    {
      label: 'Zone B',
      color: '#EABC30',
      value: 30,
    },
    {
      label: 'Zone C',
      color: '#F50000',
      value: 10,
    },
    {
      label: 'Zone D',
      color: '#17A1FA',
      value: 5,
    },
  ];

  return (
    <VStack width="full" p="16px" spacing="16px">
      <Summary />
      <Stack
        width="full"
        direction={{ base: 'column', lg: 'row' }}
        p="18px"
        bgColor="neutral.200"
        rounded="8px"
        divider={<StackDivider borderColor="neutral.600" />}
        spacing={{ base: '16px', lg: '24px' }}
        alignItems="center"
      >
        <Flex width={{ base: 'full', lg: '40%' }}>
          <OccupancyDistribution occupancyData={occupanyData} />
        </Flex>
        <Flex width={{ base: 'full', lg: '60%' }}>
          <OccupancyInfo occupancyData={occupanyData} />
        </Flex>
      </Stack>
    </VStack>
  );
};

export default OccupancyManagement;
