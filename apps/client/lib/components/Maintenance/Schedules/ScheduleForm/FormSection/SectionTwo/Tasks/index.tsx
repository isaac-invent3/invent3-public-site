import { HStack, Text, useDisclosure, VStack } from '@chakra-ui/react';
import { useField, useFormikContext } from 'formik';

import {
  ErrorMessage,
  FormAddButton,
  FormInputWrapper,
} from '@repo/ui/components';
import { isArray } from 'lodash';
import TaskFormDrawer from '~/lib/components/TaskManagement/Drawers/TaskFormDrawer';
import { ScheduleFormDetails } from '~/lib/interfaces/maintenance.interfaces';
import { taskFormDetails } from '~/lib/interfaces/task.interfaces';
import FormTaskListDrawer from './ListDrawer';

interface TasksProps {
  sectionMaxWidth: string;
  spacing: string;
  showTaskCount?: boolean;
}
const Tasks = (props: TasksProps) => {
  const { showTaskCount, sectionMaxWidth, spacing } = props;

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
    <>
      <FormInputWrapper
        sectionMaxWidth={sectionMaxWidth}
        customSpacing={spacing}
        title="Add Tasks"
        description="List all tasks for this maintenance schedule"
        isRequired
      >
        <VStack mt="20px" width="full" alignItems="flex-start">
          <VStack width="full" alignItems="flex-start" spacing="17px">
            <FormAddButton color="#0366EF" handleClick={onOpen}>
              Add Task
            </FormAddButton>
            {values?.taskCount && values?.taskCount >= 1 && (
              <HStack spacing="8px">
                <Text
                  color={showTaskCount ? '#0366EF' : 'primary.500'}
                  fontWeight={700}
                  size="md"
                  textDecoration={showTaskCount ? 'underline' : 'none'}
                  cursor={showTaskCount ? 'pointer' : 'initial'}
                  onClick={() => {
                    onOpenFormTaskList;
                  }}
                >
                  {values?.taskCount}{' '}
                  {`Task${values?.taskCount > 1 ? 's' : ''}`}
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
      </FormInputWrapper>

      <TaskFormDrawer
        isOpen={isOpen}
        onClose={onClose}
        handleData={handleAddTask}
        scheduleId={null}
      />
      {isOpenFormTaskList && (
        <FormTaskListDrawer
          isOpen={isOpenFormTaskList}
          onClose={onCloseFormTaskList}
          handleAddTask={handleAddTask}
        />
      )}
    </>
  );
};

export default Tasks;
