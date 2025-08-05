import { Text, useDisclosure, VStack } from '@chakra-ui/react';
import { getSession } from 'next-auth/react';

import TaskFormDrawer from '~/lib/components/TaskManagement/Drawers/TaskFormDrawer';
import { GenericDeleteModal, GenericPopover } from '@repo/ui/components';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import { Task, taskFormDetails } from '~/lib/interfaces/task.interfaces';
import { useDeleteTaskMutation } from '~/lib/redux/services/task/general.services';
import { ROUTES } from '~/lib/utils/constants';
import usePermissionAccess from '~/lib/hooks/useRoleAccess';
import { useEffect } from 'react';

const PopoverAction = (task: Task, type: 'drawer' | 'page' | 'template') => {
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
  const canEditTask = usePermissionAccess('task:edit');
  const canDeleteTask = usePermissionAccess('task:delete');

  const { handleSubmit } = useCustomMutation();
  const [deleteTask, { isLoading }] = useDeleteTaskMutation({});

  const handleDeleteTask = async () => {
    const session = await getSession();
    const response = await handleSubmit(
      deleteTask,
      { id: task?.taskId, deletedBy: session?.user.username! },
      'Task Deleted Successfully'
    );
    if (response?.data) {
      onCloseDelete();
    }
  };

  useEffect(() => {
    console.log({ canEditTask, canDeleteTask });
  }, [canEditTask, canDeleteTask]);

  return (
    <>
      <GenericPopover width="129px" placement="bottom-start">
        <VStack width="full" alignItems="flex-start" spacing="16px">
          {canEditTask && (
            <Text
              cursor="pointer"
              {...(type === 'drawer' ? { onClick: () => onOpenEdit() } : {})}
              as={type === 'page' ? 'a' : 'button'}
              {...(type === 'page'
                ? { href: `/${ROUTES.TASKS}/${task.taskId}/edit` }
                : {})}
            >
              Edit
            </Text>
          )}
          {canDeleteTask && (
            <Text cursor="pointer" onClick={onOpenDelete}>
              Delete
            </Text>
          )}
        </VStack>
      </GenericPopover>
      <TaskFormDrawer
        isOpen={isOpenEdit}
        onClose={onCloseEdit}
        data={
          {
            ...task,
            priorityId: task.taskPriorityId,
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
    </>
  );
};

export default PopoverAction;
