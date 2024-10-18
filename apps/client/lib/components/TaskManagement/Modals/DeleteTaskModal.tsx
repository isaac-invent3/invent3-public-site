import { Heading, HStack, Text, VStack } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import React from 'react';
import Button from '~/lib/components/UI/Button';
import GenericModal from '~/lib/components/UI/Modal';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import { useDeleteTaskMutation } from '~/lib/redux/services/task/general.services';

interface DeleteTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  handleDelete?: () => void;
  taskId?: number | null;
}

const DeleteTaskModal = (props: DeleteTaskModalProps) => {
  const { isOpen, onClose, handleDelete, taskId } = props;
  const { handleSubmit } = useCustomMutation();
  const [deleteTask, { isLoading }] = useDeleteTaskMutation({});
  const { data } = useSession();

  const handleDeleteTask = async () => {
    if (taskId) {
      const response = await handleSubmit(
        deleteTask,
        { id: taskId, deletedBy: data?.user.username },
        'Task Deleted Successfully'
      );
      if (response?.data) {
        onClose();
      }
    }
    if (handleDelete) {
      handleDelete();
    }
  };

  return (
    <GenericModal
      isOpen={isOpen}
      onClose={onClose}
      contentStyle={{
        width: '526px',
      }}
    >
      <VStack
        width="full"
        alignItems="flex-start"
        spacing="32px"
        py="32px"
        px="16px"
      >
        <Heading
          fontSize="32px"
          lineHeight="38.02px"
          fontWeight={800}
          color="#F73A3A"
        >
          Delete Task
        </Heading>
        <Text size="lg">Are You Sure you want to Delete this task?</Text>
        <HStack width="full" spacing="24px">
          <Button handleClick={onClose} variant="secondary">
            Cancel
          </Button>
          <Button
            handleClick={() => handleDeleteTask()}
            isLoading={isLoading}
            loadingText="Deleting..."
            customStyles={{
              bgColor: '#F73A3A',
              _hover: { bgColor: '#F73A3A' },
              _active: { bgColor: '#F73A3A' },
              _focused: { bgColor: '#F73A3A' },
            }}
          >
            Delete
          </Button>
        </HStack>
      </VStack>
    </GenericModal>
  );
};

export default DeleteTaskModal;
