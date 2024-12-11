import { HStack } from '@chakra-ui/react';
import React from 'react';
import { Button } from '@repo/ui/components';
import GenericSuccessModal from '~/lib/components/UI/Modal/GenericSuccessModal';

interface PlanSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'create' | 'edit';
}
const PlanSuccessModal = (props: PlanSuccessModalProps) => {
  const { isOpen, onClose, type } = props;
  const successText =
    type === 'create'
      ? 'A new maintenance plan has been created successfully'
      : 'Maintance Plan has been updated successfully';
  return (
    <GenericSuccessModal
      isOpen={isOpen}
      onClose={() => onClose()}
      headingText="Successful!"
      successText={successText}
      mainModalStyle={{ closeOnOverlayClick: false, closeOnEsc: false }}
    >
      <HStack>
        <Button customStyles={{ width: '193px' }} href="/maintenance">
          Continue
        </Button>
      </HStack>
    </GenericSuccessModal>
  );
};

export default PlanSuccessModal;
