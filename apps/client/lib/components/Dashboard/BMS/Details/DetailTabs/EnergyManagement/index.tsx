import { Grid, GridItem, SimpleGrid, VStack } from '@chakra-ui/react';
import React from 'react';
import EnergyTrends from './EnergyTrends';
import HighestEnergyConsumption from '../Overview/EnergyConsumption';
import EnergyConsumptionByZone from './EnergyConsumptionByZone';
import CostMonthlySpend from './CostMonthlySpend';
import OptimisationRecommendation from './OptimisationRecommendation';

const EnergyManagement = () => {
  return (
    <VStack width="full" spacing="16px" p="16px">
      <SimpleGrid columns={{ base: 1, xl: 3 }} gap="16px" width="full">
        <EnergyConsumptionByZone />
        <CostMonthlySpend />
        <OptimisationRecommendation />
      </SimpleGrid>
      <Grid
        templateColumns={{ base: 'repeat(1, 1fr)', lg: 'repeat(3, 1fr)' }}
        gap="16px"
        width="full"
      >
        <GridItem colSpan={{ base: 1, lg: 2 }}>
          {/* <SimpleGrid> */}
          <EnergyTrends />
          {/* </SimpleGrid> */}
        </GridItem>
        <GridItem colSpan={1}>
          {/* <SimpleGrid height="full"> */}
          <HighestEnergyConsumption title="Energy Consumption" />
          {/* </SimpleGrid> */}
        </GridItem>
      </Grid>
    </VStack>
  );
};

export default EnergyManagement;
