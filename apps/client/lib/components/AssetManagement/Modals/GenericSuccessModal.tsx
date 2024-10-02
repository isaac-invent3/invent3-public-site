import React from 'react';
import GenericModal from '../../UI/Modal';
import { Heading, Image, Text, VStack } from '@chakra-ui/react';

interface GenericSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  successText: string;
  children: React.ReactNode;
  headingText?: string;
}
const GenericSuccessModal = (props: GenericSuccessModalProps) => {
  const { isOpen, onClose, successText, children, headingText } = props;

  return (
    <GenericModal
      isOpen={isOpen}
      onClose={onClose}
      contentStyle={{ width: { lg: '526px' } }}
    >
      <VStack spacing="48px" width="full" pb={{ lg: '40px' }} px="74px">
        <Image
          src="/success-ribbon.gif"
          width="290px"
          minH="full"
          position="absolute"
        />
        <VStack width="full" spacing="24px" pt={{ lg: '48px' }}>
          <Image src="/success-check.gif" width="60px" height="60px" />
          <VStack spacing="8px" width="full">
            <Heading
              fontSize="32px"
              lineHeight="38.02px"
              fontWeight={800}
              color="primary.main"
              textAlign="center"
            >
              {headingText ?? 'Successful!'}
            </Heading>
            <Text size="md" color="neutral.600" textAlign="center" maxW="306px">
              {successText}
            </Text>
          </VStack>
        </VStack>
        {children}
      </VStack>
    </GenericModal>
  );
};

export default GenericSuccessModal;
