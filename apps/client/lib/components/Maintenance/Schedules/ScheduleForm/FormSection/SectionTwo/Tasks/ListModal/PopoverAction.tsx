import { Icon, Text, useDisclosure, VStack } from '@chakra-ui/react';
import { useFormikContext } from 'formik';
import React from 'react';
import { ThreeVerticalDotsIcon } from '~/lib/components/CustomIcons';
import DeleteTaskModal from '~/lib/components/TaskManagement/Modals/DeleteTaskModal';
import TaskFormModal from '~/lib/components/TaskManagement/Modals/TaskFormModal';
import GenericPopover from '~/lib/components/UI/GenericPopover';
import { taskFormDetails } from '~/lib/interfaces/task.interfaces';

const PopoverAction = (task: taskFormDetails) => {
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

  const { setFieldValue, values } = useFormikContext<any>();

  const handleEditTask = (task: taskFormDetails) => {
    const oldTasksExcludedEditedTask = values.tasks.filter(
      (item: taskFormDetails) => item.taskId !== task.taskId
    );
    setFieldValue('tasks', [...oldTasksExcludedEditedTask, task]);
  };

  const handleDelete = () => {
    const newTasks = values.tasks.filter(
      (item: taskFormDetails) => item.taskId !== task.taskId
    );
    setFieldValue('tasks', newTasks);
    setFieldValue('taskCount', values.taskCount - 1);
  };

  return (
    <>
      <GenericPopover
        width="129px"
        icon={
          <Icon as={ThreeVerticalDotsIcon} boxSize="16px" color="#374957" />
        }
        placement="bottom"
      >
        <VStack width="full" alignItems="flex-start" spacing="16px">
          <Text cursor="pointer" onClick={onOpenEdit}>
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
        data={task}
        handleData={handleEditTask}
      />
      <DeleteTaskModal
        isOpen={isOpenDelete}
        onClose={onCloseDelete}
        handleDelete={handleDelete}
      />
    </>
  );
};

export default PopoverAction;
