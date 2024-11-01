import { Heading, HStack, ModalBody, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import Button from '~/lib/components/UI/Button';
import GenericModal from '~/lib/components/UI/Modal';

interface GenericDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  handleProceed: () => void;
}

const GenericLeaveDialogModal = (props: GenericDeleteModalProps) => {
  const { isOpen, onClose, handleProceed } = props;

  return (
    <GenericModal
      isOpen={isOpen}
      onClose={onClose}
      contentStyle={{
        width: '526px',
      }}
    >
      <ModalBody p={0} m={0} width="full">
        <VStack
          width="full"
          alignItems="flex-start"
          spacing="40px"
          pt="65px"
          pb="50px"
          px={{ base: '16px', lg: '32px' }}
        >
          <VStack spacing="8px" width="full">
            <Heading
              fontSize="32px"
              lineHeight="38.02px"
              fontWeight={800}
              color="primary.500"
            >
              Leave Form?
            </Heading>
            <Text
              size="md"
              color="neutral.700"
              maxW="296px"
              textAlign="center"
              fontWeight={400}
            >
              Changes you made may not be saved.
            </Text>
          </VStack>
          <HStack width="full" spacing="24px" justifyContent="center">
            <Button
              handleClick={onClose}
              variant="secondary"
              customStyles={{ width: '145px' }}
            >
              Cancel
            </Button>
            <Button
              handleClick={() => handleProceed()}
              customStyles={{ width: '193px' }}
            >
              Proceed
            </Button>
          </HStack>
        </VStack>
      </ModalBody>
    </GenericModal>
  );
};

export default GenericLeaveDialogModal;
