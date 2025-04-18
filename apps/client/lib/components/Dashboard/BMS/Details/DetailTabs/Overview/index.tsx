import { SimpleGrid, VStack } from '@chakra-ui/react';
import React from 'react';
import Summary from './Summary';
import ActivePower from './ActivePower';
import EnergyConsumption from './EnergyConsumption';
import HVAC from './HVAC';

const Overview = () => {
  return (
    <VStack py="16px" px="12px" width="full">
      <Summary />
      <SimpleGrid
        width="full"
        gap="16px"
        minH="369px"
        columns={{ base: 1, lg: 3 }}
      >
        <ActivePower />
        <EnergyConsumption />
        <HVAC />
      </SimpleGrid>
    </VStack>
  );
};

export default Overview;
