import { Flex, SimpleGrid, VStack } from '@chakra-ui/react';
import React from 'react';
import EnergyOverview from './EnergyOverview';
import EnergyTrends from './EnergyTrends';
import SystemPerformanceMetrics from './SystemPerformanceMetrics';
import HighestEnergyConsumption from '../Overview/EnergyConsumption';
import ActivePower from '../Overview/ActivePower';

const EnergyManagement = () => {
  return (
    <VStack width="full" spacing="16px" p="16px">
      <SimpleGrid
        columns={{ base: 1, lg: 2 }}
        gap="16px"
        minH="342px"
        width="full"
      >
        <EnergyOverview />
        <EnergyTrends />
      </SimpleGrid>
      <SimpleGrid
        columns={{ base: 1, lg: 3 }}
        gap="16px"
        minH="342px"
        width="full"
      >
        <HighestEnergyConsumption title="Energy Consumption" />
        <SystemPerformanceMetrics />
        <ActivePower title="Facility Comparison" />
      </SimpleGrid>
    </VStack>
  );
};

export default EnergyManagement;
