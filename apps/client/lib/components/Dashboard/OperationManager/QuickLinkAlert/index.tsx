import { Flex, HStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import QuickLinks from './QuickLinks';
import EscalationAlert from './EscalationAlert';
import { useGetEscalatedTicketCountQuery } from '~/lib/redux/services/ticket.services';

const QuickLinkAlert = () => {
  const [hasEscalation, setHasEscalation] = useState(false);
  const { data } = useGetEscalatedTicketCountQuery();

  useEffect(() => {
    if (data?.data && data?.data?.escalatedTickets > 0) {
      setHasEscalation(true);
    }
  }, [data]);
  return (
    <HStack width="full">
      <Flex width={hasEscalation ? 'calc(100% - 580px)' : 'full'}>
        <QuickLinks />
      </Flex>
      {hasEscalation && (
        <Flex width="580px" height="full">
          <EscalationAlert
            escalationCount={data?.data?.escalatedTickets ?? 0}
          />
        </Flex>
      )}
    </HStack>
  );
};

export default QuickLinkAlert;
