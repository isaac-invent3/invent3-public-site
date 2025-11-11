import { Flex, StackProps, Text, VStack } from '@chakra-ui/react';
import { Event as EventType } from 'react-big-calendar';

export const EventCard = ({
  event,
  customStyle,
}: {
  event: EventType;
  customStyle?: StackProps;
}) => {
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
      {...customStyle}
    >
      <Text
        color="neutral.800"
        fontSize="10px"
        lineHeight="100%"
        fontWeight={800}
        maxW="80%"
        noOfLines={1}
        textOverflow="ellipsis"
      >
        {event?.resource?.prediction}
      </Text>
      <Text
        color="neutral.800"
        fontSize="8px"
        textOverflow="ellipsis"
        noOfLines={1}
        lineHeight="100%"
      >
        Predicted Failure
      </Text>
    </VStack>
  );
};

const getEventStyle = (event: EventType) => {
  switch (event.resource?.risk?.toLowerCase()) {
    case 'low':
      return {
        backgroundColor: '#0366EF1A',
        borderColor: '#0366EF',
      };
    case 'medium':
      return {
        backgroundColor: '#FF7A371A',
        borderColor: '#FF7A37',
      };
    case 'high':
      return {
        backgroundColor: '#F500001A',
        borderColor: '#F50000',
      };
    default:
      return {
        backgroundColor: '#F7F7F7',
        borderColor: '#000000',
      };
  }
};

const Event = ({
  event,
  setSelectedEvent,
}: {
  event: EventType;
  setSelectedEvent: React.Dispatch<React.SetStateAction<EventType | undefined>>;
}) => {
  return (
    <Flex
      position="relative"
      width="full"
      height="full"
      overflow="visible"
      cursor="pointer"
      onClick={() => setSelectedEvent(event)}
    >
      <EventCard event={event} />
    </Flex>
  );
};

export default Event;
