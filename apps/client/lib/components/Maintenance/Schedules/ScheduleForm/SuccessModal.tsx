import React from 'react';
import Button from '~/lib/components/UI/Button';
import GenericSuccessModal from '~/lib/components/UI/Modal/GenericSuccessModal';

interface ScheduleSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  successText: string;
  buttonWidth: string;
  headingText?: string;
}
const ScheduleSuccessModal = (props: ScheduleSuccessModalProps) => {
  const { isOpen, onClose, buttonWidth } = props;
  return (
    <GenericSuccessModal
      isOpen={isOpen}
      onClose={onClose}
      headingText="Successful!"
      successText="A new maintenance schedule has been created successfully"
    >
      <Button
        href="/maintenance"
        customStyles={{ width: buttonWidth, mb: '54px' }}
      >
        Continue
      </Button>
    </GenericSuccessModal>
  );
};

export default ScheduleSuccessModal;
