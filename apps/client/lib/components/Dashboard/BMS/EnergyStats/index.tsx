import { SimpleGrid } from '@chakra-ui/react';
import React from 'react';
import TotalEnergyConsumption from './TotalEnergyConsumption';
import HighestEnergyConsumption from './HighestEnergyConsumption';
import MostEnergyEfficient from './MostEnergyEfficient';

const EnergyStats = () => {
  return (
    <SimpleGrid
      width="full"
      gap={{ base: '16px', lg: '24px' }}
      columns={{ base: 1, lg: 3 }}
    >
      <TotalEnergyConsumption />
      <HighestEnergyConsumption />
      <MostEnergyEfficient />
    </SimpleGrid>
  );
};

export default EnergyStats;
