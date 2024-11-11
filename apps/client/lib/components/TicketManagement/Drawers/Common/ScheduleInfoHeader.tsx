import { HStack, Text, VStack } from '@chakra-ui/react';
import GenericStatusBox from '~/lib/components/UI/GenericStatusBox';
import { Ticket } from '~/lib/interfaces/ticket.interfaces';
import { COLOR_CODES_FALLBACK } from '~/lib/utils/constants';
import TicketInfoHeader from './TicketInfoHeader';

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
              width="120px"
              colorCode={COLOR_CODES_FALLBACK.default}
            />
          </VStack>
          <VStack alignItems="flex-start" spacing="8px">
            <Text color="neutral.600">Priority</Text>

            <GenericStatusBox
              text="High"
              width="110px"
              colorCode={COLOR_CODES_FALLBACK.default}
            />
          </VStack>
        </HStack>
        <VStack alignItems="flex-start" spacing="8px">
          <Text color="neutral.600">Ticket Type</Text>
          <GenericStatusBox
            text="Incident"
            width="110px"
            colorCode={COLOR_CODES_FALLBACK.default}
          />
        </VStack>
      </HStack>
    </TicketInfoHeader>
  );
};

export default ScheduleInfoHeader;
