/* eslint-disable no-unused-vars */
import { Text, VStack } from '@chakra-ui/react';
import { GenericPopover } from '@repo/ui/components';
import {
  SelectedTicketAction,
  Ticket,
  TicketCategory,
} from '~/lib/interfaces/ticket.interfaces';

import { useAppDispatch } from '~/lib/redux/hooks';
import { setSelectedTicket } from '~/lib/redux/slices/TicketSlice';

interface PopoverActionProps {
  ticket: Ticket;
  category: TicketCategory;
}
const PopoverAction = (props: PopoverActionProps) => {
  const { ticket, category } = props;

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

  return (
    <>
      <GenericPopover width="137px" placement="bottom-start">
        <VStack width="full" alignItems="flex-start" spacing="16px">
          {category === 'new' && (
            <VStack width="full" alignItems="flex-start" spacing="16px">
              <Text cursor="pointer" onClick={() => openModal('assign')}>
                Assign Ticket
              </Text>
              <Text cursor="pointer" onClick={() => openModal('schedule')}>
                Schedule Ticket
              </Text>
              <Text cursor="pointer" onClick={() => openModal('view')}>
                View Details
              </Text>
            </VStack>
          )}

          {category === 'assigned' && (
            <VStack width="full" alignItems="flex-start" spacing="16px">
              <Text cursor="pointer" onClick={() => openModal('schedule')}>
                Schedule Ticket
              </Text>
              <Text cursor="pointer" onClick={() => openModal('view')}>
                View Details
              </Text>
            </VStack>
          )}

          {(category === 'scheduled' || category === 'in_progress') && (
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
