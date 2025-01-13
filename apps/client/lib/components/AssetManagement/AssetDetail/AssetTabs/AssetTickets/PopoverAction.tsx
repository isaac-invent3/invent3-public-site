/* eslint-disable no-unused-vars */
import { Text, VStack } from '@chakra-ui/react';
import { GenericPopover } from '@repo/ui/components';
import useCustomSearchParams from '~/lib/hooks/useCustomSearchParams';
import {
  SelectedTicketAction,
  Ticket,
  TicketCategory,
} from '~/lib/interfaces/ticket.interfaces';

import { useAppDispatch } from '~/lib/redux/hooks';
import { setSelectedTicket } from '~/lib/redux/slices/TicketSlice';
import { SYSTEM_CONTEXT_DETAILS } from '~/lib/utils/constants';

interface PopoverActionProps {
  ticket: Ticket;
  category: TicketCategory;
}
const PopoverAction = (props: PopoverActionProps) => {
  const { ticket, category } = props;
  const { updateSearchParam } = useCustomSearchParams();

  const dispatch = useAppDispatch();

  const openModal = (action: SelectedTicketAction) => {
    dispatch(
      setSelectedTicket({
        action: [action],
        category,
        data: ticket,
      })
    );
  };

  const handleViewDetails = () => {
    openModal('view');
    updateSearchParam(SYSTEM_CONTEXT_DETAILS.TICKETS.slug, ticket.ticketId);
  };

  return (
    <>
      <GenericPopover width="137px" placement="bottom-start">
        <VStack width="full" alignItems="flex-start" spacing="16px">
          <Text cursor="pointer" onClick={() => openModal('schedule')}>
            Schedule Ticket
          </Text>
          <Text cursor="pointer" onClick={handleViewDetails}>
            View Details
          </Text>

          <Text cursor="pointer" onClick={() => openModal('delete')}>
            Delete
          </Text>
        </VStack>
      </GenericPopover>
    </>
  );
};

export default PopoverAction;
