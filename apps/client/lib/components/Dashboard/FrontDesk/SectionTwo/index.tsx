import { Flex, HStack } from '@chakra-ui/react';
import React from 'react';
import TicketTrend from './TicketTrend';
import TaskCompletionRateChart from '../../Common/Charts/TaskCompletionRateChart';
import MaintenanceSuccessChart from '../../Common/Charts/MaintenanceSuccessChart';

const SectionTwo = () => {
  return (
    <HStack width="full" minH="354px">
      <Flex width="41.6%" height="full">
        <TicketTrend />
      </Flex>
      <Flex width="28.7%" height="full">
        <TaskCompletionRateChart
          notCompletedColorCode="#00A129"
          completedColorCode="#033376"
        />
      </Flex>
      <Flex width="29.7%" height="full">
        <MaintenanceSuccessChart
          missedColorCode="#00A129"
          completedColorCode="#033376"
        />
      </Flex>
    </HStack>
  );
};

export default SectionTwo;
