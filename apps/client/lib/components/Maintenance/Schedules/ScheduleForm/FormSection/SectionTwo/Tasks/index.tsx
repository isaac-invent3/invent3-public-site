import { Flex, HStack, Text, useDisclosure, VStack } from '@chakra-ui/react';
import { useField, useFormikContext } from 'formik';
import React from 'react';
import TaskFormModal from '~/lib/components/TaskManagement/Drawers/TaskFormDrawer';
import ErrorMessage from '~/lib/components/UI/ErrorMessage';
import AddButton from '~/lib/components/UI/Form/FormAddButton';
import SectionInfo from '~/lib/components/UI/Form/FormSectionInfo';
import { taskFormDetails } from '~/lib/interfaces/task.interfaces';
import FormTaskListDrawer from './ListDrawer';
import { useAppSelector } from '~/lib/redux/hooks';
import TaskListView from '~/lib/components/TaskManagement/Drawers/TaskListDrawer/TaskListView';

interface DateProps {
  sectionMaxWidth: string;
  spacing: string;
}
const Tasks = (props: DateProps) => {
  const { sectionMaxWidth, spacing } = props;

  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenTaskList,
    onOpen: onOpenTaskList,
    onClose: onCloseTaskList,
  } = useDisclosure();
  const {
    isOpen: isOpenFormTaskList,
    onOpen: onOpenFormTaskList,
    onClose: onCloseFormTaskList,
  } = useDisclosure();
  const { scheduleId } = useAppSelector(
    (state) => state.maintenance.scheduleForm
  );
  const { setFieldValue, values } = useFormikContext<any>();
  // eslint-disable-next-line no-unused-vars
  const [field, meta, helpers] = useField('taskCount');

  const handleAddTask = (task: taskFormDetails) => {
    setFieldValue('tasks', [
      ...values.tasks,
      { ...task, taskId: values.tasks.length + 1 },
    ]);
    helpers.setValue(meta.value + 1);
  };

  return (
    <HStack width="full" alignItems="flex-start" spacing={spacing}>
      <Flex width="full" maxW={sectionMaxWidth}>
        <SectionInfo
          title="Tasks"
          info="Add name that users can likely search with"
          isRequired
        />
      </Flex>
      <VStack mt="20px" width="full" alignItems="flex-start">
        <VStack width="full" alignItems="flex-start" spacing="17px">
          <AddButton color="#0366EF" handleClick={onOpen}>
            Add Task
          </AddButton>
          {values?.taskCount >= 1 && (
            <HStack spacing="8px">
              <Text
                color="#0366EF"
                fontWeight={700}
                size="md"
                textDecoration="underline"
                cursor="pointer"
                onClick={scheduleId ? onOpenTaskList : onOpenFormTaskList}
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
      </VStack>
      <TaskFormModal
        isOpen={isOpen}
        onClose={onClose}
        handleData={handleAddTask}
        scheduleId={scheduleId}
      />
      <FormTaskListDrawer
        isOpen={isOpenFormTaskList}
        onClose={onCloseFormTaskList}
        handleAddTask={handleAddTask}
      />
      {scheduleId && isOpenTaskList && (
        <TaskListView
          isOpen={isOpenTaskList}
          onClose={onCloseTaskList}
          scheduleId={scheduleId}
          showPopover={true}
        />
      )}
    </HStack>
  );
};

export default Tasks;
