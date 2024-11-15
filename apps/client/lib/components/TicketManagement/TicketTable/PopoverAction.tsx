/* eslint-disable no-unused-vars */
import { Text, useDisclosure, useToast, VStack } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import GenericPopover from '~/lib/components/UI/GenericPopover';
import GenericDeleteModal from '~/lib/components/UI/Modal/GenericDeleteModal';
import { Ticket } from '~/lib/interfaces/ticket.interfaces';
import { useDeleteTicketMutation } from '~/lib/redux/services/ticket.services';
import ScheduledTicketDetailDrawer from '../Drawers/ScheduledTicketDetailDrawer';
import ScheduleTicketDrawer from '../Drawers/ScheduleTicketDrawer';
import TicketDetailsDrawer from '../Drawers/TicketDetailsDrawer';
import MarkTicketAsCompletedModal from '../Modals/MarkTicketAsCompletedModal';

interface PopoverActionProps {
  ticket: Ticket;
  type: 'new' | 'scheduled' | 'completed';
}
const PopoverAction = (props: PopoverActionProps) => {
  const { ticket, type } = props;
  const {
    isOpen: isOpenEdit,
    onOpen: onOpenEdit,
    onClose: onCloseEdit,
  } = useDisclosure();
  const {
    isOpen: isOpenScheduleTicket,
    onOpen: onOpenScheduleTicket,
    onClose: onCloseScheduleTicket,
  } = useDisclosure();
  const {
    isOpen: isOpenDelete,
    onOpen: onOpenDelete,
    onClose: onCloseDelete,
  } = useDisclosure();
  const {
    isOpen: isOpenMarkCompleted,
    onOpen: onOpenMarkCompleted,
    onClose: onCloseMarkCompleted,
  } = useDisclosure();
  const {
    isOpen: isOpenViewDetails,
    onOpen: onOpenViewDetails,
    onClose: onCloseViewDetails,
  } = useDisclosure();
  const toast = useToast();

  const [deleteTicket, { isLoading }] = useDeleteTicketMutation({});
  const { data } = useSession();

  const handleDeleteTask = async () => {
    await deleteTicket({ id: ticket.ticketId, deletedBy: data?.user.username });

    toast({
      title: 'Ticket Deleted Successfully',
      status: 'success',
      position: 'top-right',
    });

    onCloseDelete();
  };

  return (
    <>
      <GenericPopover width="137px" placement="bottom-start">
        <VStack width="full" alignItems="flex-start" spacing="16px">
          {type === 'new' && (
            <VStack width="full" alignItems="flex-start" spacing="16px">
              <Text cursor="pointer" onClick={onOpenScheduleTicket}>
                Schedule Ticket
              </Text>

              <Text cursor="pointer" onClick={onOpenViewDetails}>
                View Details
              </Text>
            </VStack>
          )}
          {type === 'scheduled' && (
            <VStack width="full" alignItems="flex-start" spacing="16px">
              <Text cursor="pointer" onClick={onOpenEdit}>
                Edit Ticket
              </Text>
              <Text cursor="pointer" onClick={onOpenMarkCompleted}>
                Mark Completed
              </Text>
            </VStack>
          )}
          <Text cursor="pointer" onClick={onOpenDelete}>
            Delete
          </Text>
        </VStack>
      </GenericPopover>
      {isOpenScheduleTicket && (
        <ScheduleTicketDrawer
          isOpen={isOpenScheduleTicket}
          onClose={onCloseScheduleTicket}
          data={ticket}
        />
      )}

      {isOpenDelete && (
        <GenericDeleteModal
          isLoading={isLoading}
          isOpen={isOpenDelete}
          onClose={onCloseDelete}
          handleDelete={handleDeleteTask}
        />
      )}

      <MarkTicketAsCompletedModal
        isOpen={isOpenMarkCompleted}
        onClose={onCloseMarkCompleted}
        data={ticket}
      />

      {isOpenViewDetails && (
        <TicketDetailsDrawer
          isOpen={isOpenViewDetails}
          onClose={onCloseViewDetails}
          data={ticket}
        />
      )}

      {isOpenEdit && (
        <ScheduledTicketDetailDrawer
          isOpen={isOpenEdit}
          onClose={onCloseEdit}
          data={ticket}
        />
      )}
    </>
  );
};

export default PopoverAction;
