'use client';

import { Flex } from '@chakra-ui/react';
import React, { useState } from 'react';
import Header from './Header';
import Filter from './Filter';
import ScheduleTimeline from './ScheduleTimeline';
import FailureDetails from './FailureDetails';
import { Event } from 'react-big-calendar';

const PredictedFailureSchedule = () => {
  const [selectedEvent, setSelectedEvent] = useState<Event | undefined>(
    undefined
  );
  return (
    <Flex direction="column" width="full" gap="32px" pb="24px">
      <Header />
      <Filter />
      <Flex
        width="full"
        gap="16px"
        flexDir={{ base: 'column', lg: 'row' }}
        px={{ base: '16px', md: 0 }}
      >
        <Flex
          width={{ base: 'full', lg: '70%' }}
          mt={{ base: '16px', lg: undefined }}
          order={{ base: 1, lg: 0 }}
        >
          <ScheduleTimeline setSelectedEvent={setSelectedEvent} />
        </Flex>

        <Flex
          width={{ base: 'full', lg: '30%' }}
          mt={{ base: undefined, lg: '67px' }}
          order={{ base: 0, lg: 1 }}
        >
          <FailureDetails selectedEvent={selectedEvent} />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default PredictedFailureSchedule;
