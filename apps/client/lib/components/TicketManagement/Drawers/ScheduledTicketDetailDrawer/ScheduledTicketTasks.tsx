// import { DeleteIcon } from '@chakra-ui/icons';
import { HStack, Icon, Text, useDisclosure, VStack } from '@chakra-ui/react';
import { useField, useFormikContext } from 'formik';
import { useState } from 'react';
import { DeleteIcon } from '~/lib/components/CustomIcons';
import TaskFormModal from '~/lib/components/TaskManagement/Drawers/TaskFormDrawer';
import CheckBox from '~/lib/components/UI/CheckBox';
import AddButton from '~/lib/components/UI/Form/FormAddButton';
import { ScheduleFormDetails } from '~/lib/interfaces/maintenance.interfaces';
import { taskFormDetails } from '~/lib/interfaces/task.interfaces';

const tasks = [
  {
    taskId: 1,
    taskDescription:
      'Lorem ipsum dolor sit amet consectetur. Massa fermentum a tellus nibh pellentesque risus. Ridiculus ullamcorper mauris malesuada mollis facilisi.',
    taskDueDate: '23/10/2024',
  },
  {
    taskId: 2,
    taskDescription:
      'Lorem ipsum dolor sit amet consectetur. Massa fermentum a tellus nibh pellentesque risus. Ridiculus ullamcorper mauris malesuada mollis facilisi.',
    taskDueDate: '23/10/2024',
  },
  {
    taskId: 3,
    taskDescription:
      'Lorem ipsum dolor sit amet consectetur. Massa fermentum a tellus nibh pellentesque risus. Ridiculus ullamcorper mauris malesuada mollis facilisi.',
    taskDueDate: '23/10/2024',
  },
  {
    taskId: 4,
    taskDescription:
      'Lorem ipsum dolor sit amet consectetur. Massa fermentum a tellus nibh pellentesque risus. Ridiculus ullamcorper mauris malesuada mollis facilisi.',
    taskDueDate: '23/10/2024',
  },
  {
    taskId: 5,
    taskDescription:
      'Lorem ipsum dolor sit amet consectetur. Massa fermentum a tellus nibh pellentesque risus. Ridiculus ullamcorper mauris malesuada mollis facilisi.',
    taskDueDate: '23/10/2024',
  },
  {
    taskId: 6,
    taskDescription:
      'Lorem ipsum dolor sit amet consectetur. Massa fermentum a tellus nibh pellentesque risus. Ridiculus ullamcorper mauris malesuada mollis facilisi.',
    taskDueDate: '23/10/2024',
  },
];

const ScheduledTicketTasks = () => {
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

      <VStack spacing="24px" mt="16px">
        {tasks.map((task, index) => (
          <HStack
            alignItems="center"
            justifyContent="space-between"
            spacing="8px"
            key={index}
          >
            <HStack spacing="8px" alignItems="flex-start">
              <CheckBox
                isChecked={checkedTasks.includes(task.taskId)}
                handleChange={() => {
                 setCheckedTasks((prev) =>
                   prev.includes(task.taskId)
                     ? prev.filter((item) => item !== task.taskId)
                     : [...prev, task.taskId]
                 );
                }}
              />
              <VStack alignItems="flex-start" spacing="5px">
                <Text>{task.taskDescription}</Text>

                <Text color="#656565" fontSize="10px" fontWeight={500}>
                  Due Date: {task.taskDueDate}
                </Text>
              </VStack>
            </HStack>
            <Icon as={DeleteIcon} cursor="pointer" color="error.500" />
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
