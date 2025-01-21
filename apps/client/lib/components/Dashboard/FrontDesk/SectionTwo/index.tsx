import { Flex, HStack } from '@chakra-ui/react';
import React from 'react';
import TicketTrend from './TicketTrend';
import TaskCompletionRate from './TaskCompletionRate';
import MaintenanceSuccess from './MaintenanceSuccess';

const SectionTwo = () => {
  return (
    <HStack width="full" minH="354px">
      <Flex width="41.6%" height="full">
        <TicketTrend />
      </Flex>
      <Flex width="28.7%" height="full">
        <TaskCompletionRate />
      </Flex>
      <Flex width="29.7%" height="full">
        <MaintenanceSuccess />
      </Flex>
    </HStack>
  );
};

export default SectionTwo;
