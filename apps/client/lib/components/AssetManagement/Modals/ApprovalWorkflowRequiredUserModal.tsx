import { Flex, Heading, ModalBody, Text, VStack } from '@chakra-ui/react';
import { GenericModal } from '@repo/ui/components';
import Image from 'next/image';
import React from 'react';

interface ApprovalWorkflowRequiredUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'transfer' | 'disposal';
  isBulk?: boolean;
}
const ApprovalWorkflowRequiredUserModal = (
  props: ApprovalWorkflowRequiredUserModalProps
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
          py={{ base: '60px', lg: '88px' }}
          px={{ base: '24px', lg: '48px' }}
          width="full"
          spacing="40px"
        >
          <VStack width="full" spacing="16px" maxW="370px">
            <Flex width="60px" height="60px" position="relative">
              <Image src="/error-icon.png" fill alt="error-icon" />
            </Flex>
            <VStack width="full" spacing="16px" textAlign="center">
              <Heading
                color="primary.500"
                fontWeight={800}
                lineHeight="100%"
                fontSize={{ base: '24px', lg: '32px' }}
                maxW="359px"
              >
                {isBulk ? 'Bulk' : ''}{' '}
                {type === 'transfer' ? 'Transfer' : 'Disposal'} Request
                Unavailable!
              </Heading>
              <Text
                size="md"
                color="neutral.700"
                textAlign="center"
                lineHeight="100%"
              >
                You’re unable to submit a {isBulk ? 'bulk' : ''}{' '}
                {type === 'transfer' ? 'transfer' : 'disposal'} request at this
                time. Please contact your{' '}
                <Text as="span" color="primary.500" fontWeight={700}>
                  Client Admin
                </Text>{' '}
                to set up the required approval workflow.
              </Text>
            </VStack>
          </VStack>
        </VStack>
      </ModalBody>
    </GenericModal>
  );
};

export default ApprovalWorkflowRequiredUserModal;
