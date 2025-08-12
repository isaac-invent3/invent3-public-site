import {
  Flex,
  Heading,
  ModalBody,
  ModalHeader,
  Text,
  VStack,
} from '@chakra-ui/react';
import { GenericModal, ModalCloseButtonText } from '@repo/ui/components';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';
import { ROUTES } from '~/lib/utils/constants';

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
  const router = useRouter();
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
      <ModalHeader
        m={0}
        p={0}
        position="relative"
        pt={{ base: '32px', md: '48px' }}
      >
        <Flex position="absolute" top="0" right="0" mt="16px" pr="16px">
          <Flex>
            <ModalCloseButtonText
              onClose={() => router.push(`/${ROUTES.ASSETS}`)}
            />
          </Flex>
        </Flex>
      </ModalHeader>
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
