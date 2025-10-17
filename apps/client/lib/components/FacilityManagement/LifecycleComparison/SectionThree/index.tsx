import { Grid, GridItem, VStack } from '@chakra-ui/react';
import React from 'react';
import FacilityList from './FacilityList';
import LifecycleCostByFacilityChart from './LifecycleCostByFacilityChart';
import {
  CostByFacility,
  LifeCycleFilter,
} from '~/lib/interfaces/location/lifecycle.interfaces';

const SectionThree = ({
  filters,
  lifeCycleCosts,
  isLoading,
}: {
  filters: LifeCycleFilter;
  lifeCycleCosts?: CostByFacility[];
  isLoading: boolean;
}) => {
  return (
    <>
      <Grid
        templateColumns={{ base: 'repeat(1, 1fr)', lg: 'repeat(4, 1fr)' }}
        gap="16px"
        width="full"
        display={{ base: 'none', lg: 'grid' }}
      >
        <GridItem colSpan={{ base: 1, lg: 3 }} height="full">
          <FacilityList filters={filters} />
        </GridItem>
        <GridItem colSpan={1}>
          <LifecycleCostByFacilityChart
            isLoading={isLoading}
            lifeCycleCosts={lifeCycleCosts ?? []}
          />
        </GridItem>
      </Grid>
      <VStack gap="16px" width="full" display={{ base: 'flex', lg: 'none' }}>
        <FacilityList filters={filters} />
        <LifecycleCostByFacilityChart
          isLoading={isLoading}
          lifeCycleCosts={lifeCycleCosts ?? []}
        />
      </VStack>
    </>
  );
};

export default SectionThree;
