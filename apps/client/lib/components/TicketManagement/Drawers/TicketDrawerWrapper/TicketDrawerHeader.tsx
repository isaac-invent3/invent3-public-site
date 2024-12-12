import { HStack } from '@chakra-ui/react';
import { Button } from '@repo/ui/components';
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

interface TicketDrawerHeaderProps {
  data: Ticket;
  category: TicketCategory;
  action: SelectedTicketAction;
  children?: React.ReactNode;
}

const TicketDrawerHeader = (props: TicketDrawerHeaderProps) => {
  const { action, category, data, children } = props;

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

        {(action === 'view' || action === 'assign') && (
          <>
            <Button
              handleClick={() => openModal('schedule')}
              customStyles={{ width: '126px', height: '35px' }}
            >
              Schedule Ticket
            </Button>

            {category === 'new' && action === 'view' && (
              <Button
                handleClick={() => openModal('assign')}
                variant="outline"
                customStyles={{ width: '126px', height: '35px' }}
              >
                Assign Ticket
              </Button>
            )}

            <Button
              customStyles={{ width: '84px', height: '35px' }}
              variant="secondary"
              handleClick={() => openModal('delete')}
            >
              Delete
            </Button>
          </>
        )}

        {action === 'edit' && (
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
