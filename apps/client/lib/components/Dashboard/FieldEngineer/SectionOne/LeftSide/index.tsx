import { Flex, Grid, GridItem } from '@chakra-ui/react';
import React from 'react';
import TicketSummary from './TicketSummary';
import MaintenanceSuccessChart from '../../../Common/Charts/MaintenanceSuccessChart';
import TaskCompletionRateChart from '../../../Common/Charts/TaskCompletionRateChart';
import AssetSummary from './AssetSummary';

const LeftSide = () => {
  return (
    <Flex direction="column" gap="16px" width="full">
      <Flex gap="16px" width="full" height="full">
        <Flex width="max-content" minH="full">
          <TicketSummary />
        </Flex>
        <Flex width="full">
          <AssetSummary />
        </Flex>
      </Flex>
      {/* <Flex gap="16px" width="full" alignItems="flex-start">
        <Flex width="45%" height="full">
          <TaskCompletionRateChart
            notCompletedColorCode="#EABC30"
            completedColorCode="#033376"
          />
        </Flex>
        <Flex width="55%" minH="full">
          <MaintenanceSuccessChart
            missedColorCode="#EABC30"
            completedColorCode="#033376"
          />
        </Flex>
      </Flex> */}
      <Grid
        templateColumns="repeat(3, 1fr)"
        gap="16px"
        width="full"
        height="full"
      >
        <GridItem colSpan={1} width="full">
          <TaskCompletionRateChart
            notCompletedColorCode="#EABC30"
            completedColorCode="#033376"
          />
        </GridItem>

        <GridItem colSpan={2}>
          <MaintenanceSuccessChart
            missedColorCode="#EABC30"
            completedColorCode="#033376"
          />
        </GridItem>
      </Grid>
    </Flex>
  );
};

export default LeftSide;
