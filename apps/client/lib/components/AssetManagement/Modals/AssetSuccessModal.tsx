import React from 'react';
import GenericSuccessModal from './GenericSuccessModal';
import Button from '../../UI/Button';

interface AssetSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  successText: string;
  buttonWidth: string;
  headingText?: string;
}
const AssetSuccessModal = (props: AssetSuccessModalProps) => {
  const { isOpen, onClose, successText, buttonWidth, headingText } = props;
  return (
    <GenericSuccessModal
      isOpen={isOpen}
      onClose={onClose}
      headingText={headingText}
      successText={successText}
    >
      <Button
        href="/asset-management"
        customStyles={{ width: buttonWidth, mb: '54px' }}
      >
        Continue
      </Button>
    </GenericSuccessModal>
  );
};

export default AssetSuccessModal;
