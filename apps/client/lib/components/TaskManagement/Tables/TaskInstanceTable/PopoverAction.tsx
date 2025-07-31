import { Text, useDisclosure, VStack } from '@chakra-ui/react';
import { getSession } from 'next-auth/react';

import { GenericDeleteModal, GenericPopover } from '@repo/ui/components';
import { useEffect } from 'react';
import TaskFormDrawer from '~/lib/components/TaskManagement/Drawers/TaskFormDrawer';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import useCustomSearchParams from '~/lib/hooks/useCustomSearchParams';
import {
  taskFormDetails,
  TaskInstance,
} from '~/lib/interfaces/task.interfaces';
import { useDeleteTaskInstanceMutation } from '~/lib/redux/services/task/instance.services';
import {
  STATUS_CATEGORY_ENUM,
  SYSTEM_CONTEXT_DETAILS,
} from '~/lib/utils/constants';
import TaskDetailDrawer from '../../Drawers/TaskDetailDrawer';
import MarkTaskAsCompletedModal from '../../Modals/MarkTaskAsCompletedModal';
import usePermissionAccess from '~/lib/hooks/useRoleAccess';

const PopoverAction = (task: TaskInstance, type: 'drawer' | 'page') => {
  const canEditTask = usePermissionAccess('task:edit');
  const canMarkTaskAsCompleted = usePermissionAccess('task:mark_completed');
  const canDeleteTask = usePermissionAccess('task:delete');
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

  const { handleSubmit } = useCustomMutation();

  const [deleteTaskInstance, { isLoading }] = useDeleteTaskInstanceMutation({});

  const handleDeleteTaskInstance = async () => {
    const session = await getSession();
    const response = await handleSubmit(
      deleteTaskInstance,
      { id: task?.taskInstanceId, deletedBy: session?.user.username! },
      'Task Deleted Successfully'
    );
    if (response?.data) {
      onCloseDelete();
    }
  };

  const { updateSearchParam, getSearchParam } = useCustomSearchParams();

  const taskSlugName = SYSTEM_CONTEXT_DETAILS.TASKS.slug;
  const slugValue = getSearchParam(taskSlugName);

  const openAction = () => {
    updateSearchParam(taskSlugName, task?.taskInstanceId);
  };

  return (
    <>
      <GenericPopover width="129px" placement="bottom-start">
        <VStack width="full" alignItems="flex-start" spacing="16px">
          {type === 'page' &&
            canMarkTaskAsCompleted &&
            task.statusCategoryId === STATUS_CATEGORY_ENUM.ACTIVE && (
              <Text cursor="pointer" onClick={onOpenMarkCompleted}>
                Mark Completed
              </Text>
            )}
          {type === 'page' && (
            <Text cursor="pointer" onClick={openAction}>
              View Details
            </Text>
          )}
          {canEditTask && (
            <Text cursor="pointer" onClick={() => onOpenEdit()}>
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
            parentTaskId: task.parentTaskId,
            taskId: task.taskInstanceId,
            taskName: task.taskInstanceName,
            scheduleId: task.scheduleInstanceId,
            assignedTo: task.assignedToEmployeeId,
          } as unknown as taskFormDetails
        }
        type="instance"
        scheduleId={task.scheduleInstanceId}
      />
      {isOpenDelete && (
        <GenericDeleteModal
          isLoading={isLoading}
          isOpen={isOpenDelete}
          onClose={onCloseDelete}
          handleDelete={handleDeleteTaskInstance}
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
