import {
  DrawerBody,
  DrawerHeader,
  Heading,
  HStack,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import Button from '~/lib/components/UI/Button';
import BackButton from '~/lib/components/UI/Button/BackButton';
import TaskFormDrawer from '../TaskFormDrawer';
import { taskFormDetails } from '~/lib/interfaces/task.interfaces';
import GenericDrawer from '~/lib/components/UI/GenericDrawer';

interface TaskListDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  // eslint-disable-next-line no-unused-vars
  handleAddTask?: (task: taskFormDetails) => void;
  showAddTaskButton?: boolean;
  scheduleId?: number;
  children: React.ReactNode;
  taskType: 'main' | 'instance';
}

const TaskListDrawer = (props: TaskListDrawerProps) => {
  const {
    isOpen,
    onClose,
    handleAddTask,
    showAddTaskButton = true,
    children,
    scheduleId,
    taskType,
  } = props;
  const {
    isOpen: isOpenForm,
    onOpen: onOpenForm,
    onClose: onCLoseForm,
  } = useDisclosure();

  return (
    <GenericDrawer isOpen={isOpen} onClose={onClose} maxWidth="907px">
      <DrawerHeader p={0} m={0}>
        <HStack
          pt="16px"
          pb="29px"
          pl="32px"
          pr="4"
          width="full"
          justifyContent="space-between"
        >
          <BackButton handleClick={onClose} />
          {showAddTaskButton && (
            <Button
              handleClick={onOpenForm}
              customStyles={{ width: '138px', height: '35px' }}
            >
              Add New Task
            </Button>
          )}
        </HStack>
      </DrawerHeader>
      <DrawerBody p={0} m={0}>
        <VStack width="full" alignItems="flex-start" spacing="32px">
          <Heading
            fontSize="32px"
            lineHeight="38.02px"
            fontWeight={800}
            color="primary.500"
            pl="32px"
          >
            List of Tasks
          </Heading>
          {children}
        </VStack>
        <TaskFormDrawer
          isOpen={isOpenForm}
          onClose={onCLoseForm}
          handleData={handleAddTask}
          scheduleId={scheduleId}
          type={taskType}
        />
      </DrawerBody>
    </GenericDrawer>
  );
};

export default TaskListDrawer;
