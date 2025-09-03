import { Heading, HStack, ModalBody, ModalHeader } from '@chakra-ui/react';
import { GenericModal, ModalCloseButtonText } from '@repo/ui/components';
import React from 'react';
import ValidationTwoError from '../../CompanyManagement/DataUpload/ValidationTwoError.tsx';

interface DataImportErrorModalProps {
  isOpen: boolean;
  onClose: () => void;
  dataUploadId: number;
}
const DataImportErrorModal = (props: DataImportErrorModalProps) => {
  const { isOpen, onClose, dataUploadId } = props;
  return (
    <GenericModal
      isOpen={isOpen}
      onClose={onClose}
      contentStyle={{
        width: { md: '713px' },
        px: { base: '16px', md: '48px' },
        py: { base: '32px', md: '48px' },
        bgColor: '#E7E7E7',
        maxW: '80vw',
      }}
    >
      <ModalHeader m={0} p={0}>
        <HStack width="full" justifyContent="space-between">
          <Heading>Errors</Heading>
          <ModalCloseButtonText onClose={onClose} />
        </HStack>
      </ModalHeader>
      <ModalBody p={0} m={0} width="full" pt={{ base: '16px', lg: '32px' }}>
        <ValidationTwoError dataUploadId={dataUploadId} showTitle={false} />
      </ModalBody>
    </GenericModal>
  );
};

export default DataImportErrorModal;
