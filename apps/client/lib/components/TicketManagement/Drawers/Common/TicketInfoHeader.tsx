import { Flex, Heading } from '@chakra-ui/react';
import React from 'react';
import { Ticket } from '~/lib/interfaces/ticket.interfaces';

interface TicketInfoHeaderProps {
  data: Ticket;
  children?: React.ReactNode;
}
const TicketInfoHeader = (props: TicketInfoHeaderProps) => {
  const { data, children } = props;
  return (
    <Flex
      bgColor="#B4BFCA4D"
      pt="24px"
      px="24px"
      pb="30px"
      width="full"
      alignItems="flex-start"
      direction="column"
    >
      <Heading
        fontSize="32px"
        lineHeight="38.02px"
        color="black"
        fontWeight={800}
      >
        #{data?.ticketId} {data?.ticketTitle}
      </Heading>
      {children}
    </Flex>
  );
};

export default TicketInfoHeader;
