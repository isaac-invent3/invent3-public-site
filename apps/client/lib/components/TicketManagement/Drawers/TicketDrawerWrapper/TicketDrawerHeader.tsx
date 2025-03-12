import { Flex, HStack } from '@chakra-ui/react';
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

  const dispatch = useAppDispatch();

  const { selectedTicket } = useAppSelector((state) => state.ticket);

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
        <Flex display={{ base: 'flex', lg: 'none' }}>
          <PopoverAction ticket={data} category={category} />
        </Flex>
        {(action === 'view' || action === 'assign') && (
          <HStack spacing="8px" display={{ base: 'none', lg: 'flex' }}>
            {canScheduleTicket && (
              <Button
                handleClick={() => openModal('schedule')}
                customStyles={{ width: '126px', height: '35px' }}
              >
                Schedule Ticket
              </Button>
            )}

            {category === 'new' && action === 'view' && canAssignTicket && (
              <Button
                handleClick={() => openModal('assign')}
                variant="outline"
                customStyles={{ width: '126px', height: '35px' }}
              >
                Assign Ticket
              </Button>
            )}

            {canDeleteTicket && (
              <Button
                customStyles={{ width: '84px', height: '35px' }}
                variant="secondary"
                handleClick={() => openModal('delete')}
              >
                Delete
              </Button>
            )}
          </HStack>
        )}

        {action === 'edit' && canMarkTicketAsCompleted && (
          <Button
            customStyles={{ width: '139px', height: '35px' }}
            variant="secondary"
            handleClick={() => openModal('markAsCompleted')}
          >
            Mark as Completed
          </Button>
        )}
      </HStack>
    </>
  );
};

export default TicketDrawerHeader;
