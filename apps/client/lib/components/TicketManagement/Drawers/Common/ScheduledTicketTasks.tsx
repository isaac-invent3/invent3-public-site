// import { DeleteIcon } from '@chakra-ui/icons';
import {
  HStack,
  Icon,
  Skeleton,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { useField, useFormikContext } from 'formik';
import { useState } from 'react';
import { DeleteIcon } from '~/lib/components/CustomIcons';
import TaskFormModal from '~/lib/components/TaskManagement/Drawers/TaskFormDrawer';
import { CheckBox, FormAddButton } from '@repo/ui/components';
import { ScheduleFormDetails } from '~/lib/interfaces/maintenance.interfaces';
import { Task, taskFormDetails } from '~/lib/interfaces/task.interfaces';
import { Ticket } from '~/lib/interfaces/ticket.interfaces';
import { useGetMaintenanceSchedulesByTicketIdQuery } from '~/lib/redux/services/maintenance/schedule.services';
import { useGetAllTasksByScheduleIdQuery } from '~/lib/redux/services/task/general.services';

interface ScheduledTicketTasksProps {
  data: Ticket;
  scheduleId?: number;
  isFetchingSchedule: boolean;
}

const ScheduledTicketTasks = (props: ScheduledTicketTasksProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { setFieldValue, values } = useFormikContext<ScheduleFormDetails>();
  // eslint-disable-next-line no-unused-vars
  const [field, meta, helpers] = useField('taskCount');

  // TODO: Change implementation for this when api is ready
  const [checkedTasks, setCheckedTasks] = useState<number[]>([]);

  const { data: tasks, isLoading: isFetchingTasks } =
    useGetAllTasksByScheduleIdQuery(
      {
        id: props.scheduleId!,
      },
      { skip: !props.scheduleId }
    );

  const handleAddTask = (task: taskFormDetails) => {
    setFieldValue('tasks', [
      ...values.tasks,
      {
        ...task,
        taskId: null,
        localId: values.tasks.length + 1,
        scheduleId: props.scheduleId,
      },
    ]);
    // Increase taskCount by 1
    helpers.setValue(meta.value + 1);
  };

  const estimatedDurationInHours = (task: taskFormDetails | Task) => {
    if (!task?.estimatedDurationInHours) return 'N/A';

    const hours = Math.floor(task.estimatedDurationInHours);
    const minutes = Math.round((task.estimatedDurationInHours % 1) * 60);

    if (hours > 0 && minutes > 0) {
      return `${hours} hr ${minutes} mins`;
    } else if (hours > 0) {
      return `${hours} hr`;
    } else if (minutes > 0) {
      return `${minutes} mins`;
    }

    return 'N/A';
  };

  const isLoading = isFetchingTasks || props.isFetchingSchedule;

  return (
    <VStack width="full" alignItems="flex-start" pt="24px">
      <HStack width="full" alignItems="center" justifyContent="space-between">
        <Text color="neutral.600" fontWeight={700}>
          Tasks
        </Text>

        <FormAddButton color="#0366EF" handleClick={onOpen}>
          Add Task
        </FormAddButton>
      </HStack>

      {values?.tasks &&
        values?.tasks.length >= 1 &&
        values.tasks.map((task, index) => (
          <HStack
            alignItems="center"
            justifyContent="space-between"
            spacing="8px"
            width="100%"
            key={index}
          >
            <HStack spacing="8px" alignItems="flex-start">
              <CheckBox
                isChecked={
                  task.taskId !== null && checkedTasks.includes(task.taskId)
                }
                handleChange={() =>
                  task.taskId && setCheckedTasks([...checkedTasks, task.taskId])
                }
              />
              <VStack alignItems="flex-start" spacing="5px">
                <Text>{task.taskDescription}</Text>

                <Text color="#656565" fontSize="10px" fontWeight={500}>
                  Estimated Duration: {estimatedDurationInHours(task)}
                </Text>
              </VStack>
            </HStack>
            <Icon as={DeleteIcon} color="error.500" />
          </HStack>
        ))}

      <VStack width="100%" spacing="24px" mt="16px">
        {isLoading &&
          Array(5)
            .fill(0)
            .map((_, index) => (
              <HStack
                alignItems="center"
                justifyContent="space-between"
                spacing="8px"
                width="100%"
                key={index}
              >
                <HStack spacing="8px" alignItems="flex-start">
                  <Skeleton height="18px" width="18px" borderRadius={3} />

                  <VStack alignItems="flex-start" spacing="5px">
                    <Skeleton height="15px" width="200px" />
                    <Skeleton height="10px" width="100px" />
                  </VStack>
                </HStack>
                <Skeleton height="20px" width="20px" />{' '}
              </HStack>
            ))}

        {!isLoading &&
          tasks?.data.items.map((task, index) => (
            <HStack
              alignItems="center"
              justifyContent="space-between"
              spacing="8px"
              width="100%"
              key={index}
            >
              <HStack spacing="8px" alignItems="flex-start">
                <CheckBox
                  isChecked={
                    task.taskId !== null && checkedTasks.includes(task.taskId)
                  }
                  handleChange={() =>
                    task.taskId &&
                    setCheckedTasks([...checkedTasks, task.taskId])
                  }
                />
                <VStack alignItems="flex-start" spacing="5px">
                  <Text>{task.taskDescription}</Text>

                  <Text color="#656565" fontSize="10px" fontWeight={500}>
                    Estimated Duration: {estimatedDurationInHours(task)}
                  </Text>
                </VStack>
              </HStack>
              <Icon as={DeleteIcon} color="error.500" />
            </HStack>
          ))}
      </VStack>

      <TaskFormModal
        isOpen={isOpen}
        onClose={onClose}
        handleData={handleAddTask}
        scheduleId={null}
      />
    </VStack>
  );
};

export default ScheduledTicketTasks;
