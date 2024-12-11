import React from 'react';
import { Button } from '@repo/ui/components';
import GenericSuccessModal from '~/lib/components/UI/Modal/GenericSuccessModal';

interface ScheduleInstanceSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}
const ScheduleInstanceSuccessModal = (
  props: ScheduleInstanceSuccessModalProps
) => {
  const { isOpen, onClose } = props;
  return (
    <GenericSuccessModal
      isOpen={isOpen}
      onClose={onClose}
      headingText="Successful!"
      successText="All changes made to the Schedule instance has been successfully saved for this instance"
      mainModalStyle={{ closeOnOverlayClick: false, closeOnEsc: false }}
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

export default ScheduleInstanceSuccessModal;
