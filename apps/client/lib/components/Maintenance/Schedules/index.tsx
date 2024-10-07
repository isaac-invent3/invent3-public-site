import React from 'react';
import ScheduleTimeline from './Timeline';
import { Flex } from '@chakra-ui/react';
import ScheduleStats from './Stats';

const Schedules = () => {
  return (
    <Flex mt="35px" width="full" gap="16px">
      <Flex width="77%">
        <ScheduleTimeline />
      </Flex>
      <Flex width="23%" mt="52px">
        <ScheduleStats />
      </Flex>
    </Flex>
  );
};

export default Schedules;
