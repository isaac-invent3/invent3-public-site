import { Text, useDisclosure, VStack } from '@chakra-ui/react';
import { useFormikContext } from 'formik';

import TaskFormDrawer from '~/lib/components/TaskManagement/Drawers/TaskFormDrawer';
import { GenericDeleteModal, GenericPopover } from '@repo/ui/components';
import { ScheduleFormDetails } from '~/lib/interfaces/maintenance.interfaces';
import { taskFormDetails } from '~/lib/interfaces/task.interfaces';
import { useAppDispatch, useAppSelector } from '~/lib/redux/hooks';
import { updateScheduleForm } from '~/lib/redux/slices/MaintenanceSlice';

const PopoverAction = (task: taskFormDetails) => {
  const dispatch = useAppDispatch();
  const schedule = useAppSelector((state) => state.maintenance.scheduleForm);

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

  const { setFieldValue, values } = useFormikContext<ScheduleFormDetails>();

  const handleEditTask = (updatedTask: taskFormDetails) => {
    const oldTasksExcludedEditedTask = values.tasks.filter(
      (item: taskFormDetails) => item.localId !== updatedTask.localId
    );
    setFieldValue('tasks', [...oldTasksExcludedEditedTask, updatedTask]);
    // Add the task ID to updated task array
    if (task.taskId && !schedule.updatedTaskIDs.includes(task.taskId)) {
      dispatch(
        updateScheduleForm({
          updatedTaskIDs: [...schedule.updatedTaskIDs, task.taskId],
        })
      );
    }
  };

  const handleDelete = () => {
    const newTasks = values.tasks.filter(
      (item: taskFormDetails) => item.localId !== task.localId
    );
    setFieldValue('tasks', newTasks);
    setFieldValue('taskCount', values.taskCount && values.taskCount - 1);
    // Add the task ID to deleted task array
    if (task.taskId) {
      dispatch(
        updateScheduleForm({
          deletedTaskIDs: [...schedule.deletedTaskIDs, task.taskId],
        })
      );
    }
  };

  return (
    <>
      <GenericPopover width="129px" placement="bottom">
        <VStack width="full" alignItems="flex-start" spacing="16px">
          <Text cursor="pointer" onClick={onOpenEdit}>
            Edit
          </Text>
          <Text cursor="pointer" onClick={onOpenDelete}>
            Delete
          </Text>
        </VStack>
      </GenericPopover>
      <TaskFormDrawer
        isOpen={isOpenEdit}
        onClose={onCloseEdit}
        data={task}
        handleData={handleEditTask}
        scheduleId={null}
      />
      <GenericDeleteModal
        isOpen={isOpenDelete}
        onClose={onCloseDelete}
        handleDelete={handleDelete}
      />
    </>
  );
};

export default PopoverAction;
