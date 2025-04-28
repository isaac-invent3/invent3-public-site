import { Grid, GridItem, VStack } from '@chakra-ui/react';
import React from 'react';
import Summary from './Summary';
import TemperatureTrends from './Temperature';
import SystemStatus from './SystemStatus';
import ZoneControl from './ZoneControl';
import HVAC from '../Overview/HVAC';
import Control from './Control';

const EnvironmentalControl = () => {
  return (
    <VStack width="full" p="16px" spacing="16px">
      <Grid templateColumns="repeat(4, 1fr)" gap="16px" width="full">
        <GridItem colSpan={{ base: 1, lg: 3 }} height="full">
          <VStack
            width="full"
            gap="16px"
            justifyContent="space-between"
            height="full"
          >
            <Summary />
            <TemperatureTrends />
          </VStack>
        </GridItem>
        <GridItem colSpan={1} height="full">
          <Grid templateRows={'repeat(2, 1fr)'} gap="16px" height="full">
            <GridItem>
              <ZoneControl />
            </GridItem>
            <GridItem>
              <HVAC />
            </GridItem>
          </Grid>
        </GridItem>
      </Grid>
      <Grid
        templateColumns="repeat(4, 1fr)"
        gap="16px"
        width="full"
        minH="252px"
      >
        <GridItem colSpan={{ base: 1, lg: 3 }}>
          <SystemStatus />
        </GridItem>
        <GridItem colSpan={1}>
          <Control />
        </GridItem>
      </Grid>
    </VStack>
  );
};

export default EnvironmentalControl;
