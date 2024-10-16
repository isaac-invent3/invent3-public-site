import { Heading, HStack, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import Button from '~/lib/components/UI/Button';
import GenericModal from '~/lib/components/UI/Modal';

interface DeleteTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  handleDelete: () => void;
}

const DeleteTaskModal = (props: DeleteTaskModalProps) => {
  const { isOpen, onClose, handleDelete } = props;

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
            handleClick={() => handleDelete()}
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
