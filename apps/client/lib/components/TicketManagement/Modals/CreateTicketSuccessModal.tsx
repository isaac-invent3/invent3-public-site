import { Text, VStack } from '@chakra-ui/react';
import React from 'react';
import Button from '~/lib/components/UI/Button';
import GenericSuccessModal from '~/lib/components/UI/Modal/GenericSuccessModal';

interface CreateTicketSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}
const CreateTicketSuccessModal = (props: CreateTicketSuccessModalProps) => {
  const { isOpen, onClose } = props;
  return (
    <GenericSuccessModal
      isOpen={isOpen}
      onClose={onClose}
      headingText="Successful!"
      contentStyle={{ spacing: '8px' }}
    >
      <VStack spacing="40px" width="full" mb="48px">
        <Text color="neutral.700" size="md" textAlign="center">
          The ticket has been created successfully. The assigned person would be
          notified of the ticket
        </Text>
        <Button customStyles={{ width: '193px' }} handleClick={onClose}>
          Continue
        </Button>
      </VStack>
    </GenericSuccessModal>
  );
};

export default CreateTicketSuccessModal;
