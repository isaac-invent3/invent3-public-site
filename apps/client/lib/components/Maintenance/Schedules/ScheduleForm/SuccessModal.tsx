import React from 'react';
import Button from '~/lib/components/UI/Button';
import GenericSuccessModal from '~/lib/components/UI/Modal/GenericSuccessModal';

interface ScheduleSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'create' | 'edit';
}
const ScheduleSuccessModal = (props: ScheduleSuccessModalProps) => {
  const { isOpen, onClose, type } = props;
  const successText =
    type === 'create'
      ? 'A new maintenance schedule has been created successfully'
      : 'Your maintenance schedule has been updated successfully';
  return (
    <GenericSuccessModal
      isOpen={isOpen}
      onClose={onClose}
      headingText="Successful!"
      successText={successText}
    >
      <Button
        href="/maintenance?tab=Schedules"
        customStyles={{ width: '193px', mb: '54px' }}
      >
        Continue
      </Button>
    </GenericSuccessModal>
  );
};

export default ScheduleSuccessModal;
