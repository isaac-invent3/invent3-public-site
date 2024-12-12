import { Button, GenericSuccessModal } from '@repo/ui/components';

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
      mainModalStyle={{ closeOnOverlayClick: false, closeOnEsc: false }}
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
