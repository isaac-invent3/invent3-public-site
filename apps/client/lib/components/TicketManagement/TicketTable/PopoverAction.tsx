/* eslint-disable no-unused-vars */
import { Text, useDisclosure, VStack } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import React from 'react';
import GenericPopover from '~/lib/components/UI/GenericPopover';
import GenericDeleteModal from '~/lib/components/UI/Modal/GenericDeleteModal';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import { Ticket } from '~/lib/interfaces/ticket.interfaces';
import { useDeleteTaskMutation } from '~/lib/redux/services/task/general.services';

const PopoverAction = (ticket: Ticket) => {
  const {
    isOpen: isOpenEdit,
    onOpen: onOpenEdit,
    onClose: onCloseEdit,
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
      <GenericPopover width="129px" placement="bottom-start">
        <VStack width="full" alignItems="flex-start" spacing="16px">
          <Text cursor="pointer" onClick={onOpenMarkCompleted}>
            Mark Completed
          </Text>

          <Text cursor="pointer" onClick={onOpenViewDetails}>
            View Details
          </Text>

          <Text cursor="pointer">Edit</Text>
          <Text cursor="pointer" onClick={onOpenDelete}>
            Delete
          </Text>
        </VStack>
      </GenericPopover>

      {isOpenDelete && (
        <GenericDeleteModal
          isLoading={isLoading}
          isOpen={isOpenDelete}
          onClose={onCloseDelete}
          handleDelete={handleDeleteTask}
        />
      )}
      {/* {isOpenViewDetails && (
        <TaskDetailModal
          isOpen={isOpenViewDetails}
          onClose={onCloseViewDetails}
          data={task}
        />
      )}
      {isOpenMarkCompleted && (
        <MarkTaskAsCompletedModal
          isOpen={isOpenMarkCompleted}
          onClose={onCloseMarkCompleted}
          data={task}
        />
      )} */}
    </>
  );
};

export default PopoverAction;
