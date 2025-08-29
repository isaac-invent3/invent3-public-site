import { Text, VStack } from '@chakra-ui/react';
import { Button, GenericSuccessModal } from '@repo/ui/components';
import React from 'react';

interface ReopenedSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}
const ReopenedSuccessModal = ({
  isOpen,
  onClose,
}: ReopenedSuccessModalProps) => {
  return (
    <GenericSuccessModal
      isOpen={isOpen}
      onClose={onClose}
      headingText="Successful!"
      contentStyle={{ spacing: '8px' }}
    >
      <VStack spacing="40px" width="full" mb="48px">
        <Text color="neutral.700" size="md" textAlign="center">
          The ticket has been successfully re-opened and moved to Assigned
          Tickets
        </Text>
        <Button customStyles={{ width: '193px' }} handleClick={onClose}>
          Continue
        </Button>
      </VStack>
    </GenericSuccessModal>
  );
};

export default ReopenedSuccessModal;
