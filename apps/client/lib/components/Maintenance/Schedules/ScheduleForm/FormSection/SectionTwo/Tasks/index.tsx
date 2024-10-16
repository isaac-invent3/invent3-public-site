import { Flex, HStack, Text, useDisclosure, VStack } from '@chakra-ui/react';
import { useFormikContext } from 'formik';
import React from 'react';
import TaskFormModal from '~/lib/components/TaskManagement/Modals/TaskFormModal';
import ErrorMessage from '~/lib/components/UI/ErrorMessage';
import AddButton from '~/lib/components/UI/Form/FormAddButton';
import SectionInfo from '~/lib/components/UI/Form/FormSectionInfo';
import { taskFormDetails } from '~/lib/interfaces/task.interfaces';
import TaskListTable from './TaskListTable';

const Tasks = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenTaskList,
    onOpen: onOpenTaskList,
    onClose: onCloseTaskList,
  } = useDisclosure();
  const { setFieldValue, values, errors, touched, submitCount } =
    useFormikContext<any>();

  const handleAddTask = (task: taskFormDetails) => {
    setFieldValue('tasks', [
      ...values.tasks,
      { ...task, taskId: values.tasks.length + 1 },
    ]);
  };

  return (
    <HStack width="full" alignItems="flex-start" spacing="41px">
      <Flex width="full" maxW="141px">
        <SectionInfo
          title="Tasks"
          info="Add name that users can likely search with"
          isRequired
        />
      </Flex>
      <VStack mt="20px" width="full" alignItems="flex-start">
        <HStack width="full" justifyContent="space-between">
          {values?.tasks.length >= 1 && (
            <HStack spacing="8px">
              <Text
                color="#0366EF"
                fontWeight={700}
                size="md"
                textDecoration="underline"
                cursor="pointer"
                onClick={onOpenTaskList}
              >
                {values?.tasks.length}{' '}
                {`Task${values?.tasks.length > 1 ? 's' : ''}`}
              </Text>
              <Text color="neutral.600">added</Text>
            </HStack>
          )}
          <AddButton color="#0366EF" handleClick={onOpen}>
            Add Task
          </AddButton>
        </HStack>
        {errors.tasks && (touched.tasks || submitCount > 0) && (
          <ErrorMessage>{errors.tasks as string}</ErrorMessage>
        )}
      </VStack>
      <TaskFormModal
        isOpen={isOpen}
        onClose={onClose}
        handleData={handleAddTask}
      />
      <TaskListTable
        isOpen={isOpenTaskList}
        onClose={onCloseTaskList}
        handleAddTask={handleAddTask}
      />
    </HStack>
  );
};

export default Tasks;
