import { SimpleGrid, VStack } from '@chakra-ui/react';
import React from 'react';
import Asset from './Asset';
import AssetLocation from './AssetLocation';
import MaintenancePlan from './MaintenancePlan';

const SectionOne = () => {
  return (
    <VStack spacing="45px" width="full" alignItems="flex-start">
      <SimpleGrid
        columns={2}
        alignItems="flex-start"
        width="full"
        spacing="40px"
      >
        <Asset />
        <AssetLocation />
      </SimpleGrid>

      <MaintenancePlan />
    </VStack>
  );
};

export default SectionOne;
