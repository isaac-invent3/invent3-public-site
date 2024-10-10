// Custom styles for events based on type
import { Flex, Text, useDisclosure, VStack } from '@chakra-ui/react';
import { Event as EventType } from 'react-big-calendar';
import { formatNumberShort } from '~/lib/utils/helperFunctions';
import AggregateDetailModal from './Modals/AggregateModal';
import EventDetailModal from './Modals/EventDetailModal';

const getEventStyle = (event: EventType) => {
  switch (event.resource?.currentStatus?.toLowerCase()) {
    case 'completed':
      return {
        backgroundColor: '#07CC3B1A',
        borderColor: '#07CC3B',
      };
    case 'not started':
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
        backgroundColor: '#F7F7F7',
        borderColor: '#000000',
      };
  }
};

const Event = ({ event }: { event: EventType }) => {
  const { backgroundColor, borderColor } = getEventStyle(event);
  const { isOpen, onClose, onOpen } = useDisclosure();
  const {
    isOpen: isOpenAggregate,
    onClose: onCloseAggregate,
    onOpen: onOpenAggregate,
  } = useDisclosure();

  const handleEventClick = () => {
    if (event.resource.totalScheduleCount) {
      onOpenAggregate();
    } else {
      onOpen();
    }
  };

  return (
    <Flex
      position="relative"
      width="full"
      height="full"
      overflow="visible"
      cursor="pointer"
      onClick={handleEventClick}
    >
      {event.resource?.totalScheduleCount && (
        <Flex
          position="absolute"
          minW="24px"
          minH="24px"
          rounded="full"
          alignItems="center"
          justifyContent="center"
          bgColor="primary.500"
          right="-8px"
          top="-8px"
          zIndex={99}
        >
          <Text color="neutral.250">
            {formatNumberShort(event.resource?.totalScheduleCount)}
          </Text>
        </Flex>
      )}
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
          maxW="80%"
          noOfLines={1}
          textOverflow="ellipsis"
        >
          {event?.resource?.assetName}
        </Text>
        <Text
          color="neutral.800"
          fontSize="10px"
          lineHeight="11.88px"
          fontWeight={800}
          maxW="80%"
          noOfLines={1}
          textOverflow="ellipsis"
        >
          {event?.resource?.planName ??
            `${formatNumberShort(event?.resource?.totalScheduleCount)} Schedule${event?.resource?.totalScheduleCount > 1 ? 's' : ''}`}
        </Text>
        <Text
          color="neutral.800"
          fontSize="8px"
          textOverflow="ellipsis"
          noOfLines={1}
          lineHeight="9.5px"
        >
          {event?.resource?.maintenanceType}
        </Text>
      </VStack>
      {isOpen && (
        <EventDetailModal
          isOpen={isOpen}
          onClose={onClose}
          data={event.resource}
        />
      )}

      {isOpenAggregate && (
        <AggregateDetailModal
          isOpen={isOpenAggregate}
          onClose={onCloseAggregate}
          data={event.resource}
        />
      )}
    </Flex>
  );
};

export default Event;
