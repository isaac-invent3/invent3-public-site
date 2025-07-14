import { Flex, ModalBody, VStack } from '@chakra-ui/react';
import { Button, GenericModal, ModalHeading } from '@repo/ui/components';
import Image from 'next/image';
import React from 'react';

interface ForgotPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}
const ForgotPasswordModal = (props: ForgotPasswordModalProps) => {
  const { isOpen, onClose } = props;
  return (
    <GenericModal
      isOpen={isOpen}
      onClose={onClose}
      contentStyle={{
        width: '466px',
        rounded: '8px',
        // p: { base: '16px', lg: '24px' },
      }}
    >
      <ModalBody p={0} m={0}>
        <VStack
          py={{ base: '16px', lg: '24px' }}
          px={{ base: '24px', lg: '48px' }}
          width="full"
          spacing="60px"
        >
          <VStack width="full" spacing="8px">
            <Flex width="134px" height="89px" position="relative">
              <Image
                src="/forgot-password-icon.png"
                fill
                alt="forgot-password-icon"
              />
            </Flex>
            <ModalHeading
              heading="Forgot your Password?"
              subheading="Please contact the company’s admin to reset your password."
              customStyle={{ spacing: '16px', alignItems: 'center' }}
              textStyle={{ maxW: '300px', textAlign: 'center' }}
            />
          </VStack>
          <Button customStyles={{ width: '186px' }} handleClick={onClose}>
            Ok, Got it
          </Button>
        </VStack>
      </ModalBody>
    </GenericModal>
  );
};

export default ForgotPasswordModal;
