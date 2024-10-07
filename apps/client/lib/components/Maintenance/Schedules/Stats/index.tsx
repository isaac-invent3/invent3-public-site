import { VStack } from '@chakra-ui/react';
import React from 'react';
import GeneralStats from './GeneralStats';
import StatusCount from './StatusCount';

const ScheduleStats = () => {
  return (
    <VStack width="full" spacing="16px">
      <GeneralStats />
      <StatusCount />
    </VStack>
  );
};

export default ScheduleStats;
