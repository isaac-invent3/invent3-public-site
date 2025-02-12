import { Button, GenericSuccessModal } from '@repo/ui/components';
import { ROUTES } from '~/lib/utils/constants';

interface UserSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  successText: string;
  headingText?: string;
}
const UserSuccessModal = (props: UserSuccessModalProps) => {
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
        href={`/${ROUTES.USERS}`}
        customStyles={{ width: '195px', mb: '54px' }}
      >
        Continue
      </Button>
    </GenericSuccessModal>
  );
};

export default UserSuccessModal;
