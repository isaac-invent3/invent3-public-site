import React from 'react';
import { Ticket } from '~/lib/interfaces/ticket.interfaces';
import TicketInfoHeader from './TicketInfoHeader';
import { HStack, Text, VStack } from '@chakra-ui/react';
import GenericStatusBox from '~/lib/components/UI/GenericStatusBox';
import { TaskPriorityColorCode } from '~/lib/utils/ColorCodes';

interface ScheduleInfoHeaderProps {
  data: Ticket;
}
const ScheduleInfoHeader = (props: ScheduleInfoHeaderProps) => {
  const { data } = props;

  return (
    <TicketInfoHeader data={data}>
      <HStack
        width="full"
        mt="24px"
        alignItems="flex-start"
        justifyContent="space-between"
      >
        <HStack spacing="40px" alignItems="flex-start">
          <VStack alignItems="flex-start" spacing="8px">
            <Text color="neutral.600">Status:</Text>
            <GenericStatusBox
              text="In Progress"
              colorCode={TaskPriorityColorCode['Medium']}
            />
          </VStack>
          <VStack alignItems="flex-start" spacing="8px">
            <Text color="neutral.600">Priority</Text>
            <GenericStatusBox
              text="High"
              colorCode={TaskPriorityColorCode['Low']}
            />
          </VStack>
        </HStack>
        <VStack alignItems="flex-start" spacing="8px">
          <Text color="neutral.600">Ticket Type</Text>
          <Text color="black">Incident</Text>
        </VStack>
      </HStack>
    </TicketInfoHeader>
  );
};

export default ScheduleInfoHeader;
