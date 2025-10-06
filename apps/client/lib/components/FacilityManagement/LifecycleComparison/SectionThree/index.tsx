import { Grid, GridItem, VStack } from '@chakra-ui/react';
import React from 'react';
import FacilityList from './FacilityList';
import LifecycleCostByFacilityChart from './LifecycleCostByFacilityChart';

const SectionThree = () => {
  return (
    <>
      <Grid
        templateColumns={{ base: 'repeat(1, 1fr)', lg: 'repeat(4, 1fr)' }}
        gap="16px"
        width="full"
        display={{ base: 'none', lg: 'grid' }}
      >
        <GridItem colSpan={{ base: 1, lg: 3 }} height="full">
          <FacilityList />
        </GridItem>
        <GridItem colSpan={1}>
          <LifecycleCostByFacilityChart />
        </GridItem>
      </Grid>
      <VStack gap="16px" width="full" display={{ base: 'flex', lg: 'none' }}>
        <FacilityList />
        <LifecycleCostByFacilityChart />
      </VStack>
    </>
  );
};

export default SectionThree;
