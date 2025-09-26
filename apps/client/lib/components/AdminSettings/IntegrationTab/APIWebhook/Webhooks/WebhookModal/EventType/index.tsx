import { Heading, VStack } from '@chakra-ui/react';
import React from 'react';
import AllEventTypes from './AllEventTypes';

const EventType = () => {
  return (
    <VStack width="full" alignItems="flex-start" spacing="24px">
      <Heading size="lg" color="primary.500" fontWeight={700}>
        Event Type
      </Heading>
      <AllEventTypes />
    </VStack>
  );
};

export default EventType;
