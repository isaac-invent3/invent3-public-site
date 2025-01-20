/* eslint-disable no-unused-vars */
import { Text, VStack } from '@chakra-ui/react';
import { GenericPopover } from '@repo/ui/components';
import { useMemo } from 'react';
import useCustomSearchParams from '~/lib/hooks/useCustomSearchParams';
import {
  SelectedTicketAction,
  Ticket,
  TicketCategory,
} from '~/lib/interfaces/ticket.interfaces';

import { useAppDispatch, useAppSelector } from '~/lib/redux/hooks';
import { setSelectedTicket } from '~/lib/redux/slices/TicketSlice';
import { SYSTEM_CONTEXT_DETAILS } from '~/lib/utils/constants';

interface PopoverActionProps {
  ticket: Ticket;
  category?: TicketCategory;
}
const PopoverAction = (props: PopoverActionProps) => {
  const { ticket, category } = props;
  const { updateSearchParam } = useCustomSearchParams();
  const appConfig = useAppSelector((state) => state.general.appConfigValues);

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
  const ticketCategory: TicketCategory = useMemo(() => {
    if (category) return category;

    if (
      appConfig?.DEFAULT_COMPLETED_TASK_STATUS_ID &&
      ticket.ticketStatusId === +appConfig?.DEFAULT_COMPLETED_TASK_STATUS_ID
    ) {
      return 'completed';
    }

    if (ticket.isScheduled) {
      return 'scheduled';
    }

    if (ticket.assignedTo) {
      return 'assigned';
    }

    return 'new';
  }, [ticket, category]);

  return (
    <>
      <GenericPopover width="137px" placement="bottom-start">
        <VStack width="full" alignItems="flex-start" spacing="16px">
          {ticketCategory === 'new' && (
            <VStack width="full" alignItems="flex-start" spacing="16px">
              <Text cursor="pointer" onClick={() => openModal('assign')}>
                Assign Ticket
              </Text>
              <Text cursor="pointer" onClick={() => openModal('schedule')}>
                Schedule Ticket
              </Text>
              <Text cursor="pointer" onClick={handleViewDetails}>
                View Details
              </Text>
            </VStack>
          )}

          {ticketCategory === 'assigned' && (
            <VStack width="full" alignItems="flex-start" spacing="16px">
              <Text cursor="pointer" onClick={() => openModal('schedule')}>
                Schedule Ticket
              </Text>
              <Text cursor="pointer" onClick={handleViewDetails}>
                View Details
              </Text>
            </VStack>
          )}

          {(ticketCategory === 'scheduled' ||
            ticketCategory === 'in_progress') && (
            <VStack width="full" alignItems="flex-start" spacing="16px">
              <Text cursor="pointer" onClick={() => openModal('edit')}>
                Edit Ticket
              </Text>

              <Text
                cursor="pointer"
                onClick={() => openModal('markAsCompleted')}
              >
                Mark Completed
              </Text>
            </VStack>
          )}

          <Text cursor="pointer" onClick={() => openModal('delete')}>
            Delete
          </Text>
        </VStack>
      </GenericPopover>
    </>
  );
};

export default PopoverAction;
