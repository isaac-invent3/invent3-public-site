import { Flex, Heading, ModalBody, Text, VStack } from '@chakra-ui/react';
import { Button, GenericModal, ModalHeading } from '@repo/ui/components';
import Image from 'next/image';
import React from 'react';
import { ROUTES } from '~/lib/utils/constants';

interface TransferDisposalInProgressModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'transfer' | 'disposal';
}
const TransferDisposalInProgressModal = (
  props: TransferDisposalInProgressModalProps
) => {
  const { isOpen, onClose, type } = props;
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
          py={{ base: '60px', lg: '60px' }}
          px={{ base: '24px', lg: '48px' }}
          width="full"
          spacing="40px"
        >
          <VStack width="full" spacing="16px" maxW="370px">
            <Flex width="60px" height="60px" position="relative">
              <Image src="/in_progress.png" fill alt="in_progress-icon" />
            </Flex>
            <VStack width="full" spacing="16px">
              <Heading
                color="#F50000"
                fontWeight={800}
                lineHeight="100%"
                fontSize={{ base: '24px', lg: '32px' }}
              >
                {type === 'transfer' ? 'Transfer' : 'Disposal'} in Progress!
              </Heading>
              <Text
                size="md"
                color="neutral.700"
                textAlign="center"
                lineHeight="100%"
              >
                A {type} is currently ongoing for this asset. You cannot
                initiate another request until the current process is completed
                to avoid conflicts or duplication.
              </Text>
            </VStack>
          </VStack>
          <Button href={`/${ROUTES.ASSETS}`} customStyles={{ width: '193px' }}>
            Go Back
          </Button>
        </VStack>
      </ModalBody>
    </GenericModal>
  );
};

export default TransferDisposalInProgressModal;
