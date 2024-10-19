import { HStack } from '@chakra-ui/react';
import React from 'react';
import Button from '~/lib/components/UI/Button';
import GenericSuccessModal from '~/lib/components/UI/Modal/GenericSuccessModal';

interface PlanSuccessModalProps {
  isOpen: boolean;
  // eslint-disable-next-line no-unused-vars
  onClose: (addAnotherSchedule: boolean) => void;
  type: 'create' | 'edit';
}
const PlanSuccessModal = (props: PlanSuccessModalProps) => {
  const { isOpen, onClose, type } = props;
  const successText =
    type === 'create'
      ? 'A new maintenance plan and schedule has been successfully'
      : 'Maintance Plan has been updated successfully';
  return (
    <GenericSuccessModal
      isOpen={isOpen}
      onClose={() => onClose(false)}
      headingText="Successful!"
      successText={successText}
      customStyle={{ closeOnOverlayClick: false }}
    >
      <HStack spacing="24px">
        {type === 'create' && (
          <Button
            variant="secondary"
            customStyles={{ width: '154px' }}
            handleClick={() => onClose(true)}
          >
            Add Another Schedule
          </Button>
        )}
        <Button customStyles={{ width: '193px' }} href="/maintenance">
          Continue
        </Button>
      </HStack>
    </GenericSuccessModal>
  );
};

export default PlanSuccessModal;
