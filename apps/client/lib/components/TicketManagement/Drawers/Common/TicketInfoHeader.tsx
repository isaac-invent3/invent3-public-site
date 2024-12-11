import { Flex, Heading } from '@chakra-ui/react';

import { Ticket } from '~/lib/interfaces/ticket.interfaces';

interface TicketInfoHeaderProps {
  data: Ticket;
  children?: React.ReactNode;
  isUpdateTicket?: boolean;
}
const TicketInfoHeader = (props: TicketInfoHeaderProps) => {
  const { data, children, isUpdateTicket } = props;
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
        fontSize={isUpdateTicket ? '24px' : '32px'}
        lineHeight={isUpdateTicket ? '28.51px' : '38.02px'}
        color="black"
        fontWeight={isUpdateTicket ? 700 : 800}
      >
        #{data?.ticketId} {data?.ticketTitle}
      </Heading>
      {children}
    </Flex>
  );
};

export default TicketInfoHeader;
