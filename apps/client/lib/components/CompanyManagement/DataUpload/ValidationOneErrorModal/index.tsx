import {
  Flex,
  Heading,
  ModalBody,
  ModalHeader,
  Text,
  VStack,
} from '@chakra-ui/react';
import { GenericModal, ModalCloseButtonText } from '@repo/ui/components';
import React from 'react';
import ErrorTable from './ErrorTable';

interface ValidationOneErrorModalProps {
  isOpen: boolean;
  onClose: () => void;
  missingColumns: string[];
}

const ValidationOneErrorModal = (props: ValidationOneErrorModalProps) => {
  const { isOpen, onClose, missingColumns } = props;
  return (
    <GenericModal
      isOpen={isOpen}
      onClose={onClose}
      contentStyle={{
        width: '548px',
        height: '738px',
        p: { base: '16px', lg: '24px' },
        rounded: 'none',
      }}
    >
      <ModalHeader m={0} p={0} position="relative" pt={{ base: '32px' }}>
        <Flex position="absolute" top="0" right="0">
          <Flex>
            <ModalCloseButtonText onClose={onClose} />
          </Flex>
        </Flex>
        <VStack spacing="8px" alignItems="flex-start">
          <Heading fontWeight={800} size="2xl" color="primary.500">
            Errors
          </Heading>
          <Text size="xl" color="primary.500" fontWeight={700}>
            Validating Template Phase 1
          </Text>
        </VStack>
      </ModalHeader>
      <ModalBody m={0} p={0} mt="32px">
        <Flex direction="column" width="full">
          <VStack width="full" alignItems="flex-start" spacing="8px" mb="48px">
            <Text>
              Here are the following errors we detected from the uploaded
              template:
            </Text>
            <Text color="#F50000">
              There are {missingColumns?.length} Error(s)
            </Text>
          </VStack>
          <VStack width="full" alignItems="flex-start" spacing="70px">
            <ErrorTable
              title="Missing Columns"
              subtitle="These are the columns missing from the template"
              columnsInfo={missingColumns}
            />
          </VStack>
        </Flex>
      </ModalBody>
    </GenericModal>
  );
};

export default ValidationOneErrorModal;
