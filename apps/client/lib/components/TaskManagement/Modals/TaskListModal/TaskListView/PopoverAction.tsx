import { Icon, Text, useDisclosure, VStack } from '@chakra-ui/react';
import React from 'react';
import { ThreeVerticalDotsIcon } from '~/lib/components/CustomIcons';
import DeleteTaskModal from '~/lib/components/TaskManagement/Modals/DeleteTaskModal';
import TaskFormModal from '~/lib/components/TaskManagement/Modals/TaskFormModal';
import GenericPopover from '~/lib/components/UI/GenericPopover';
import { Task, taskFormDetails } from '~/lib/interfaces/task.interfaces';
import { dateFormatter } from '~/lib/utils/Formatters';

const PopoverAction = (task: Task) => {
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
        data={
          {
            ...task,
            priorityId: task.taskPriorityId,
            dueDate: dateFormatter(task.dueDate, 'DD / MM / YYYY'),
            dateCompleted: dateFormatter(task.dateCompleted, 'DD / MM / YYYY'),
          } as unknown as taskFormDetails
        }
        scheduleId={task.scheduleId}
      />
      <DeleteTaskModal
        isOpen={isOpenDelete}
        onClose={onCloseDelete}
        taskId={task.taskId}
      />
    </>
  );
};

export default PopoverAction;
