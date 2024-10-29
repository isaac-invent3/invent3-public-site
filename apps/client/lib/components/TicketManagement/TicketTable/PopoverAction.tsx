/* eslint-disable no-unused-vars */
import { Text, useDisclosure, VStack } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import React from 'react';
import GenericPopover from '~/lib/components/UI/GenericPopover';
import GenericDeleteModal from '~/lib/components/UI/Modal/GenericDeleteModal';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import { Ticket } from '~/lib/interfaces/ticket.interfaces';
import { useDeleteTaskMutation } from '~/lib/redux/services/task/general.services';
import TicketDetailsDrawer from '../Drawers/TicketDetailsDrawer';
import ScheduleTicketDrawer from '../Drawers/ScheduleTicketDrawer';
import MarkTicketAsCompletedModal from '../Modals/MarkTicketAsCompletedModal';
import ScheduledTicketDetailDrawer from '../Drawers/ScheduledTicketDetailDrawer';

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

  const { handleSubmit } = useCustomMutation();
  const [deleteTask, { isLoading }] = useDeleteTaskMutation({});
  const { data } = useSession();

  const handleDeleteTask = async () => {
    const response = await handleSubmit(
      deleteTask,
      { id: ticket.ticketId, deletedBy: data?.user.username },
      'Ticket Deleted Successfully'
    );
    if (response?.data) {
      onCloseDelete();
    }
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
