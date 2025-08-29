import { Flex, HStack, Text, VStack } from '@chakra-ui/react';
import { Button } from '@repo/ui/components';
import usePermissionAccess from '~/lib/hooks/useRoleAccess';
import {
  SelectedTicketAction,
  Ticket,
  TicketCategory,
} from '~/lib/interfaces/ticket.interfaces';
import { useAppDispatch, useAppSelector } from '~/lib/redux/hooks';
import {
  addSelectedAction,
  setSelectedTicket,
} from '~/lib/redux/slices/TicketSlice';
import PopoverAction from '../../TicketTable/PopoverAction';
import { DrawerAction } from '~/lib/components/UI/DrawerAction';

interface TicketDrawerHeaderProps {
  data: Ticket;
  category: TicketCategory;
  action: SelectedTicketAction;
  children?: React.ReactNode;
}

const TicketDrawerHeader = (props: TicketDrawerHeaderProps) => {
  const { action, category, data, children } = props;
  const canAssignTicket = usePermissionAccess('ticket:assign');
  const canMarkTicketAsCompleted = usePermissionAccess('ticket:mark_completed');
  const canDeleteTicket = usePermissionAccess('ticket:delete');
  const canScheduleTicket = usePermissionAccess('ticket:schedule');
  const appConfigValue = useAppSelector(
    (state) => state.general.appConfigValues
  );

  const dispatch = useAppDispatch();

  const { selectedTicket } = useAppSelector((state) => state.ticket);

  const completedStatusId =
    typeof appConfigValue?.DEFAULT_COMPLETED_TASK_STATUS_ID === 'string'
      ? +appConfigValue?.DEFAULT_COMPLETED_TASK_STATUS_ID
      : appConfigValue?.DEFAULT_COMPLETED_TASK_STATUS_ID;

  const openModal = (action: SelectedTicketAction) => {
    if (selectedTicket) {
      return dispatch(addSelectedAction(action));
    }

    dispatch(
      setSelectedTicket({
        action: [action],
        category,
        data,
      })
    );
  };

  return (
    <>
      <HStack spacing="8px">
        {children}
        {(action === 'view' || action === 'assign') &&
          !category.includes('completed') &&
          data?.ticketStatusId !== completedStatusId && (
            <DrawerAction>
              <VStack width="full" alignItems="flex-start" spacing="16px">
                {canScheduleTicket && (
                  <Text
                    cursor="pointer"
                    as="button"
                    onClick={() => openModal('schedule')}
                  >
                    Schedule Ticket
                  </Text>
                )}

                {category === 'new' && action === 'view' && canAssignTicket && (
                  <Text
                    cursor="pointer"
                    as="button"
                    onClick={() => openModal('assign')}
                  >
                    Assign Ticket
                  </Text>
                )}
                {canDeleteTicket &&
                  data?.ticketStatusId !== completedStatusId && (
                    <Text
                      cursor="pointer"
                      as="button"
                      onClick={() => openModal('delete')}
                    >
                      Delete
                    </Text>
                  )}
              </VStack>
            </DrawerAction>
          )}
        {action === 'schedule' && category === 'in_progress' && (
          <DrawerAction>
            {canMarkTicketAsCompleted && (
              <Text
                cursor="pointer"
                as="button"
                onClick={() => openModal('markAsCompleted')}
                whiteSpace="nowrap"
              >
                Mark as Completed
              </Text>
            )}
          </DrawerAction>
        )}
      </HStack>
    </>
  );
};

export default TicketDrawerHeader;
