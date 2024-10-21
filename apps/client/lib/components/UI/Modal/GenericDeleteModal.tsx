import { Heading, HStack, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import Button from '~/lib/components/UI/Button';
import GenericModal from '~/lib/components/UI/Modal';

interface GenericDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  handleDelete: () => void;
  isLoading?: boolean;
}

const GenericDeleteModal = (props: GenericDeleteModalProps) => {
  const { isOpen, onClose, handleDelete, isLoading } = props;

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
        spacing="40px"
        pt="65px"
        pb="50px"
        px={{ base: '16px', lg: '78px' }}
      >
        <VStack spacing="8px" width="full">
          <Heading
            fontSize="32px"
            lineHeight="38.02px"
            fontWeight={800}
            color="primary.500"
          >
            Delete?
          </Heading>
          <Text size="md" color="neutral.700">
            Are you sure you want to delete the record?
          </Text>
        </VStack>
        <VStack spacing="8px" width="full" alignItems="flex-start">
          <Text color="#A00000" fontWeight={800} size="md">
            Warning
          </Text>
          <Text color="#A00000" size="md">
            You can’t undo the action
          </Text>
        </VStack>
        <HStack width="full" spacing="24px">
          <Button
            handleClick={onClose}
            variant="secondary"
            customStyles={{ width: '145px' }}
          >
            Cancel
          </Button>
          <Button
            handleClick={() => handleDelete()}
            isLoading={isLoading}
            loadingText="Deleting..."
            customStyles={{
              bgColor: '#F50000',
              width: '193px',
              _hover: { bgolor: '#F50000' },
              _active: { bgColor: '#F50000' },
              _focused: { bgColor: '#F50000' },
            }}
          >
            Delete
          </Button>
        </HStack>
      </VStack>
    </GenericModal>
  );
};

export default GenericDeleteModal;
