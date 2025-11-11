import { VStack } from '@chakra-ui/react';
import React from 'react';
import RiskLegends from './RiskLegends';
import EventDetails from './EventDetails';
import AIInsights from './AIInsights';
import { Event } from 'react-big-calendar';

const FailureDetails = ({ selectedEvent }: { selectedEvent?: Event }) => {
  return (
    <VStack width="full" spacing="16px">
      <RiskLegends />
      <EventDetails selectedEvent={selectedEvent} />
      <AIInsights />
    </VStack>
  );
};

export default FailureDetails;
