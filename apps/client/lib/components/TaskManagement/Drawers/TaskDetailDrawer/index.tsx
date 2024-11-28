import {
  DrawerBody,
  DrawerHeader,
  HStack,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import Button from '~/lib/components/UI/Button';
import BackButton from '~/lib/components/UI/Button/BackButton';
import { TaskInstance } from '~/lib/interfaces/task.interfaces';
import MarkTaskAsCompletedModal from '../../Modals/MarkTaskAsCompletedModal';
import SectionOne from './SectionOne';
import SectionTwo from './SectionTwo';
import OtherRelatedTasks from './OtherRelatedTasks';
import GenericDrawer from '~/lib/components/UI/GenericDrawer';

interface TaskDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: TaskInstance;
}

const TaskDetailModal = (props: TaskDetailModalProps) => {
  const { isOpen, onClose, data } = props;
  const {
    isOpen: isOpenMarkAsCompleted,
    onOpen: onOpenMarkAsCompleted,
    onClose: onCLoseMarkAsCompleted,
  } = useDisclosure();

  return (
    <GenericDrawer isOpen={isOpen} onClose={onClose} maxWidth="597px">
      <DrawerHeader p={0} m={0}>
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
      </DrawerHeader>
      <DrawerBody p={0}>
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
      </DrawerBody>
    </GenericDrawer>
  );
};

export default TaskDetailModal;
