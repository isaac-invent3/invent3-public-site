import { Heading, HStack, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { Event } from 'react-big-calendar';
import { EventCard } from '../ScheduleTimeline/Events';

const EventDetails = ({ selectedEvent }: { selectedEvent?: Event }) => {
  const details = [
    {
      label: 'Asset',
      value: 'Pump-12',
    },
    {
      label: 'Risk Score',
      value: '93%',
    },
    {
      label: 'Predicted Failure',
      value: 'In 2 days',
    },
    {
      label: 'Technician',
      value: 'T. Adewale',
    },
    {
      label: 'Status',
      value: 'Urgent',
    },
  ];
  return (
    <VStack
      width="full"
      px={4}
      py={6}
      alignItems="flex-start"
      spacing="16px"
      bgColor="white"
      rounded="8px"
    >
      <Heading fontSize="20px" fontWeight={800} lineHeight="100%" color="black">
        Event Details
      </Heading>
      {selectedEvent && (
        <VStack width="full" spacing={6}>
          <EventCard event={selectedEvent} customStyle={{ height: '59px' }} />
          <VStack width="full" spacing={2}>
            {details.map((item, index) => (
              <HStack width="full" justifyContent="space-between" key={index}>
                <Text color="neutral.800" size="md" fontWeight={800}>
                  {item.label}
                </Text>
                <Text color="neutral.600">{item.value}</Text>
              </HStack>
            ))}
          </VStack>
        </VStack>
      )}
    </VStack>
  );
};

export default EventDetails;
