import { Heading, ModalBody, Text, VStack } from '@chakra-ui/react';
import { Button, GenericModal } from '@repo/ui/components';
import React from 'react';
import { ROUTES } from '~/lib/utils/constants';

interface ApprovalWorkflowRequiredClientModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'transfer' | 'disposal';
  isBulk?: boolean;
}
const ApprovalWorkflowRequiredClientModal = (
  props: ApprovalWorkflowRequiredClientModalProps
) => {
  const { isOpen, onClose, type, isBulk } = props;
  return (
    <GenericModal
      isOpen={isOpen}
      onClose={onClose}
      contentStyle={{
        width: '526px',
        rounded: '8px',
      }}
      mainModalStyle={{ closeOnOverlayClick: false, closeOnEsc: false }}
    >
      <ModalBody p={0} m={0}>
        <VStack
          py={{ base: '60px', lg: '81px' }}
          px={{ base: '24px', lg: '48px' }}
          width="full"
          spacing="40px"
        >
          <VStack width="full" spacing="8px" maxW="442px" textAlign="center">
            <Heading
              color="primary.500"
              fontWeight={800}
              lineHeight="100%"
              fontSize={{ base: '24px', lg: '32px' }}
              maxW="361px"
            >
              Set Up Approval Workflow to Proceed
            </Heading>
            <Text
              size="md"
              color="neutral.700"
              textAlign="center"
              lineHeight="100%"
            >
              Before you can request a bulk asset disposal, you need to set up
              an approval workflow. Please go to Settings to create a new
              workflow and select an appropriate approval type.
            </Text>
          </VStack>
          <Button
            href={`/${ROUTES.SETTINGS}?tab=Approval+Workflow`}
            customStyles={{ width: '193px' }}
          >
            Go to Settings
          </Button>
        </VStack>
      </ModalBody>
    </GenericModal>
  );
};

export default ApprovalWorkflowRequiredClientModal;
