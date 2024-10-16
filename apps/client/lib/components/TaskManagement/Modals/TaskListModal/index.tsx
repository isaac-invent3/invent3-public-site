import { Heading, HStack, useDisclosure, VStack } from '@chakra-ui/react';
import React from 'react';
import Button from '~/lib/components/UI/Button';
import BackButton from '~/lib/components/UI/Button/BackButton';
import GenericModal from '~/lib/components/UI/Modal';
import TaskFormModal from '../TaskFormModal';
import { taskFormDetails } from '~/lib/interfaces/task.interfaces';

interface TaskListModalProps {
  isOpen: boolean;
  onClose: () => void;
  // eslint-disable-next-line no-unused-vars
  handleAddTask?: (task: taskFormDetails) => void;
  isDefaultPlan?: boolean;
  children: React.ReactNode;
}

const TaskListModal = (props: TaskListModalProps) => {
  const {
    isOpen,
    onClose,
    handleAddTask,
    isDefaultPlan = false,
    children,
  } = props;
  const {
    isOpen: isOpenForm,
    onOpen: onOpenForm,
    onClose: onCLoseForm,
  } = useDisclosure();

  return (
    <GenericModal
      isOpen={isOpen}
      onClose={onClose}
      contentStyle={{
        width: 'full',
        maxW: '80vw',
        minH: '70vh',
        rounded: 'none',
      }}
    >
      <HStack
        pt="16px"
        pb="29px"
        pl="32px"
        pr="4"
        width="full"
        justifyContent="space-between"
      >
        <BackButton handleClick={onClose} />
        <Button
          handleClick={onOpenForm}
          customStyles={{ width: '138px', height: '35px' }}
          isDisabled={isDefaultPlan}
        >
          Add New Task
        </Button>
      </HStack>
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
      <TaskFormModal
        isOpen={isOpenForm}
        onClose={onCLoseForm}
        handleData={handleAddTask}
      />
    </GenericModal>
  );
};

export default TaskListModal;
