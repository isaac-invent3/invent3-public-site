import { Text, useDisclosure, VStack } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import React from 'react';
import TaskFormModal from '~/lib/components/TaskManagement/Drawers/TaskFormDrawer';
import GenericPopover from '~/lib/components/UI/GenericPopover';
import GenericDeleteModal from '~/lib/components/UI/Modal/GenericDeleteModal';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import { Task, taskFormDetails } from '~/lib/interfaces/task.interfaces';
import { useDeleteTaskMutation } from '~/lib/redux/services/task/general.services';
import { dateFormatter } from '~/lib/utils/Formatters';
import TaskDetailDrawer from '../Drawers/TaskDetailDrawer';
import MarkTaskAsCompletedModal from '../Modals/MarkTaskAsCompletedModal';

const PopoverAction = (task: Task, type: 'drawer' | 'page') => {
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
      { id: task?.taskId, deletedBy: data?.user.username },
      'Task Deleted Successfully'
    );
    if (response?.data) {
      onCloseDelete();
    }
  };

  return (
    <>
      <GenericPopover width="129px" placement="bottom-start">
        <VStack width="full" alignItems="flex-start" spacing="16px">
          {type === 'page' && task.status === 'In Progress' && (
            <Text cursor="pointer" onClick={onOpenMarkCompleted}>
              Mark Completed
            </Text>
          )}
          {type === 'page' && (
            <Text cursor="pointer" onClick={onOpenViewDetails}>
              View Details
            </Text>
          )}
          <Text
            cursor="pointer"
            {...(type === 'drawer' ? { onClick: () => onOpenEdit() } : {})}
            as={type === 'page' ? 'a' : 'button'}
            {...(type === 'page'
              ? { href: `/task-management/${task.taskId}/edit` }
              : {})}
          >
            Edit
          </Text>
          <Text cursor="pointer" onClick={onOpenDelete}>
            Delete
          </Text>
        </VStack>
      </GenericPopover>
      <TaskFormModal
        isOpen={isOpenEdit}
        onClose={onCloseEdit}
        data={
          {
            ...task,
            priorityId: task.taskPriorityId,
            dueDate: dateFormatter(task.dueDate, 'DD / MM / YYYY'),
          } as unknown as taskFormDetails
        }
        scheduleId={task.scheduleId}
      />
      {isOpenDelete && (
        <GenericDeleteModal
          isLoading={isLoading}
          isOpen={isOpenDelete}
          onClose={onCloseDelete}
          handleDelete={handleDeleteTask}
        />
      )}
      {isOpenViewDetails && (
        <TaskDetailDrawer
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
      )}
    </>
  );
};

export default PopoverAction;
