import { Button, GenericSuccessModal } from '@repo/ui/components';
import { ROUTES } from '~/lib/utils/constants';

interface VendorSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  successText: string;
  headingText?: string;
}
const VendorSuccessModal = (props: VendorSuccessModalProps) => {
  const { isOpen, onClose, successText, headingText } = props;
  return (
    <GenericSuccessModal
      isOpen={isOpen}
      onClose={onClose}
      headingText={headingText}
      successText={successText}
      mainModalStyle={{ closeOnOverlayClick: false, closeOnEsc: false }}
    >
      <Button
        href={`/${ROUTES.VENDOR}`}
        customStyles={{ width: '195px', mb: '54px' }}
      >
        Continue
      </Button>
    </GenericSuccessModal>
  );
};

export default VendorSuccessModal;
