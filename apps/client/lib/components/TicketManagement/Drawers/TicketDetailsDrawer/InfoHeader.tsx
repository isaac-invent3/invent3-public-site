import React from 'react';
import { Ticket } from '~/lib/interfaces/ticket.interfaces';
import TicketInfoHeader from '../Common/TicketInfoHeader';
import { HStack, Text, VStack } from '@chakra-ui/react';
import GenericStatusBox from '~/lib/components/UI/GenericStatusBox';
import { TaskPriorityColorCode } from '~/lib/utils/ColorCodes';
import { COLOR_CODES_FALLBACK } from '~/lib/utils/constants';

interface InfoHeaderProps {
  data: Ticket;
}
const InfoHeader = (props: InfoHeaderProps) => {
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
              text={data.statusName}
              width="120px"
              colorCode={data.statusColorCode}
            />
          </VStack>
          <VStack alignItems="flex-start" spacing="8px">
            <Text color="neutral.600">Priority</Text>
            <GenericStatusBox
              text={data.ticketPriorityName}
              width="110px"
              colorCode={data.priorityColorCode}
            />
          </VStack>
        </HStack>
        <VStack alignItems="flex-start" spacing="8px">
          <Text color="neutral.600">Ticket Type</Text>
          <GenericStatusBox
            text={data.ticketTypeName}
            width="150px"
            colorCode={COLOR_CODES_FALLBACK.default}
          />
        </VStack>
      </HStack>
    </TicketInfoHeader>
  );
};

export default InfoHeader;
