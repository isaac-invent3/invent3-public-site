import { SimpleGrid, VStack } from '@chakra-ui/react';
import React from 'react';
import Summary from './Summary';
import AssetHealthStatus from './AssetHealthStatus';
import MaintenancePriorityList from './MaintenancePriorityList';
import ConditionMonitoringReadings from './ConditionMonitoringReading';

const PredictiveMaintenance = () => {
  return (
    <VStack width="full" p="16px" spacing="16px">
      <SimpleGrid
        width="full"
        columns={{ base: 1, lg: 2 }}
        gap="16px"
        minH="324px"
      >
        <Summary />
        <AssetHealthStatus />
      </SimpleGrid>
      <SimpleGrid
        width="full"
        columns={{ base: 1, lg: 2 }}
        gap="16px"
        minH="415px"
      >
        <MaintenancePriorityList />
        <ConditionMonitoringReadings />
      </SimpleGrid>
    </VStack>
  );
};

export default PredictiveMaintenance;
