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
import CheckBox from '~/lib/components/UI/CheckBox';
import AddButton from '~/lib/components/UI/Form/FormAddButton';
import { ScheduleFormDetails } from '~/lib/interfaces/maintenance.interfaces';
import { taskFormDetails } from '~/lib/interfaces/task.interfaces';
import { Ticket } from '~/lib/interfaces/ticket.interfaces';
import { useGetMaintenanceSchedulesByTicketIdQuery } from '~/lib/redux/services/maintenance/schedule.services';
import { useGetAllTasksByScheduleIdQuery } from '~/lib/redux/services/task/general.services';
import { dateFormatter } from '~/lib/utils/Formatters';

interface ScheduledTicketTasksProps {
  data: Ticket;
}

const ScheduledTicketTasks = (props: ScheduledTicketTasksProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { setFieldValue, values } = useFormikContext<ScheduleFormDetails>();
  // eslint-disable-next-line no-unused-vars
  const [field, meta, helpers] = useField('taskCount');

  const handleAddTask = (task: taskFormDetails) => {
    setFieldValue('tasks', [
      ...values.tasks,
      { ...task, taskId: null, localId: values.tasks.length + 1 },
    ]);
    // Increase taskCount by 1
    helpers.setValue(meta.value + 1);
  };

  // TODO: Change implementation for this when api is ready
  const [checkedTasks, setCheckedTasks] = useState<number[]>([]);

  const { data: maintenanceSchedule, isLoading: isFetchingSchedule } =
    useGetMaintenanceSchedulesByTicketIdQuery(props.data.ticketId!);

  const { data: tasks, isLoading: isFetchingTasks } =
    useGetAllTasksByScheduleIdQuery({
      id: maintenanceSchedule?.data.scheduleId,
    });

  const isLoading = isFetchingTasks || isFetchingSchedule;

  return (
    <VStack width="full" alignItems="flex-start" pt="24px" px="24px">
      <HStack width="full" alignItems="center" justifyContent="space-between">
        <Text color="#838383" fontWeight={700}>
          Tasks
        </Text>

        <AddButton color="#0366EF" handleClick={onOpen}>
          Add Task
        </AddButton>
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
                  Due Date: {task.dateCompleted}
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
                    Due Date:
                    {dateFormatter(task.dateCreated, 'DD / MM / YYYY hh:mm a')}
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
