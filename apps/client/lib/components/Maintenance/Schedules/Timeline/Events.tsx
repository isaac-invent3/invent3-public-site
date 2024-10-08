// Custom styles for events based on type
import { Text, VStack } from '@chakra-ui/react';
import { Event as EventType } from 'react-big-calendar';

const getEventStyle = (event: EventType) => {
  switch (event.resource?.currentStatus.toLowerCase()) {
    case 'completed':
      return {
        backgroundColor: '#07CC3B1A',
        borderColor: '#07CC3B',
      };
    case 'pending':
      return {
        backgroundColor: '#0366EF1A',
        borderColor: '#0366EF',
      };
    case 'missed':
      return {
        backgroundColor: '#F500001A',
        borderColor: '#F50000',
      };
    default:
      return {
        backgroundColor: '#FFFFFF', // Default white
        borderColor: '#000000', // Default black
      };
  }
};

const Event = ({ event }: { event: EventType }) => {
  const { backgroundColor, borderColor } = getEventStyle(event);

  return (
    <VStack
      borderLeft="2px"
      borderColor={borderColor}
      backgroundColor={backgroundColor}
      width="full"
      height="full"
      spacing="4px"
      alignItems="flex-start"
      pl="8px"
      pr="4px"
      py="4px"
    >
      <Text
        color="neutral.800"
        fontSize="10px"
        lineHeight="11.88px"
        fontWeight={800}
      >
        {event.resource?.planName}
      </Text>
      <Text color="neutral.800" fontSize="10px" lineHeight="11.88px">
        By {event.resource?.contactPerson}
      </Text>
    </VStack>
  );
};

export default Event;
