import { SimpleGrid, VStack } from '@chakra-ui/react';
import React from 'react';
import Summary from './Summary';
import OccupancyTrend from './OccupancyTrend';
import TotalAllowedCapacity from './TotalAllowedCapacity';
import DensityMetrics from './DensityMetrics';

const OccupancyManagement = () => {
  return (
    <VStack width="full" p="16px" spacing="16px">
      <Summary />
      <SimpleGrid
        width="full"
        gap="16px"
        minH="369px"
        columns={{ base: 1, lg: 3 }}
      >
        <OccupancyTrend />
        <TotalAllowedCapacity />
        <DensityMetrics />
      </SimpleGrid>
    </VStack>
  );
};

export default OccupancyManagement;
