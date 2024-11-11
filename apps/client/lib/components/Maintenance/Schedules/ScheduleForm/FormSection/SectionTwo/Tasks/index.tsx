import { Flex, HStack, Text, useDisclosure, VStack } from '@chakra-ui/react';
import { useField, useFormikContext } from 'formik';
import React from 'react';
import TaskFormModal from '~/lib/components/TaskManagement/Drawers/TaskFormDrawer';
import ErrorMessage from '~/lib/components/UI/ErrorMessage';
import AddButton from '~/lib/components/UI/Form/FormAddButton';
import SectionInfo from '~/lib/components/UI/Form/FormSectionInfo';
import { taskFormDetails } from '~/lib/interfaces/task.interfaces';
import FormTaskListDrawer from './ListDrawer';
import { ScheduleFormDetails } from '~/lib/interfaces/maintenance.interfaces';
import { isArray } from 'lodash';

interface TasksProps {
  sectionMaxWidth: string;
  spacing: string;
}
const Tasks = (props: TasksProps) => {
  const { sectionMaxWidth, spacing } = props;

  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenFormTaskList,
    onOpen: onOpenFormTaskList,
    onClose: onCloseFormTaskList,
  } = useDisclosure();

  const { setFieldValue, values, errors } =
    useFormikContext<ScheduleFormDetails>();
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

  return (
    <HStack width="full" alignItems="flex-start" spacing={spacing}>
      <Flex width="full" maxW={sectionMaxWidth}>
        <SectionInfo
          title="Add Tasks"
          info="Add name that users can likely search with"
          isRequired
        />
      </Flex>
      <VStack mt="20px" width="full" alignItems="flex-start">
        <VStack width="full" alignItems="flex-start" spacing="17px">
          <AddButton color="#0366EF" handleClick={onOpen}>
            Add Task
          </AddButton>
          {values?.taskCount && values?.taskCount >= 1 && (
            <HStack spacing="8px">
              <Text
                color="#0366EF"
                fontWeight={700}
                size="md"
                textDecoration="underline"
                cursor="pointer"
                onClick={onOpenFormTaskList}
              >
                {values?.taskCount} {`Task${values?.taskCount > 1 ? 's' : ''}`}
              </Text>
              <Text color="neutral.600">added</Text>
            </HStack>
          )}
        </VStack>
        {meta.touched && meta.error !== undefined && (
          <ErrorMessage>{meta.error}</ErrorMessage>
        )}
        {isArray(errors.tasks) &&
          errors.tasks?.map((taskError) =>
            typeof taskError === 'string' ? (
              <ErrorMessage key={taskError}>{taskError}</ErrorMessage>
            ) : (
              Object.entries(taskError).map(([key, message]) => (
                <ErrorMessage key={key}>{message}</ErrorMessage>
              ))
            )
          )}
      </VStack>
      <TaskFormModal
        isOpen={isOpen}
        onClose={onClose}
        handleData={handleAddTask}
        scheduleId={null}
      />
      <FormTaskListDrawer
        isOpen={isOpenFormTaskList}
        onClose={onCloseFormTaskList}
        handleAddTask={handleAddTask}
      />
    </HStack>
  );
};

export default Tasks;
