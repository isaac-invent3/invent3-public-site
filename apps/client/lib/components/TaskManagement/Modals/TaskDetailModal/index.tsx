import { HStack, useDisclosure, VStack } from '@chakra-ui/react';
import React from 'react';
import Button from '~/lib/components/UI/Button';
import BackButton from '~/lib/components/UI/Button/BackButton';
import GenericModal from '~/lib/components/UI/Modal';
import { Task } from '~/lib/interfaces/task.interfaces';
import MarkTaskAsCompletedModal from '../MarkTaskAsCompletedModal';
import SectionOne from './SectionOne';
import SectionTwo from './SectionTwo';
import OtherRelatedTasks from './OtherRelatedTasks';

interface TaskDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: Task;
}

const TaskDetailModal = (props: TaskDetailModalProps) => {
  const { isOpen, onClose, data } = props;
  const {
    isOpen: isOpenMarkAsCompleted,
    onOpen: onOpenMarkAsCompleted,
    onClose: onCLoseMarkAsCompleted,
  } = useDisclosure();

  return (
    <GenericModal
      isOpen={isOpen}
      onClose={onClose}
      contentStyle={{
        width: { md: '597px' },
        rounded: 'none',
      }}
    >
      <HStack
        pt="16px"
        pb="29px"
        pl="32px"
        pr="28px"
        width="full"
        justifyContent="space-between"
      >
        <BackButton handleClick={onClose} />

        <Button
          handleClick={onOpenMarkAsCompleted}
          customStyles={{ width: '138px', height: '35px' }}
        >
          Mark as completed
        </Button>
      </HStack>
      <VStack width="full" alignItems="flex-start" spacing="32px" pb="20px">
        <SectionOne data={data} />
        <SectionTwo data={data} />
        <OtherRelatedTasks data={data} />
      </VStack>
      <MarkTaskAsCompletedModal
        isOpen={isOpenMarkAsCompleted}
        onClose={onCLoseMarkAsCompleted}
        data={data}
      />
    </GenericModal>
  );
};

export default TaskDetailModal;
