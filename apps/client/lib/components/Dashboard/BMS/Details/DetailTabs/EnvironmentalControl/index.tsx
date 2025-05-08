import { Grid, GridItem, VStack } from '@chakra-ui/react';
import React from 'react';
import Summary from './Summary';
import TemperatureTrends from './Temperature';
import ZoneCondition from './ZoneCondition';

const EnvironmentalControl = () => {
  return (
    <VStack width="full" p="16px" spacing="16px">
      <Summary />
      <Grid templateColumns="repeat(4, 1fr)" gap="16px" width="full">
        <GridItem colSpan={{ base: 1, lg: 3 }} height="full">
          <TemperatureTrends />
        </GridItem>
        <GridItem height="full">
          <ZoneCondition />
        </GridItem>
      </Grid>
    </VStack>
  );
};

export default EnvironmentalControl;
