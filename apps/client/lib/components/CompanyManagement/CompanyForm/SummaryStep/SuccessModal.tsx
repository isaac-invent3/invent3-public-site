import { Button, GenericSuccessModal } from '@repo/ui/components';
import { ROUTES } from '~/lib/utils/constants';

interface CompanySuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'create' | 'edit';
}
const CompanySuccessModal = (props: CompanySuccessModalProps) => {
  const { isOpen, onClose, type } = props;
  const successText =
    type === 'create'
      ? 'Your company is being created. You will receive an email notification once the process is complete.'
      : 'Company updated successfully!';
  return (
    <GenericSuccessModal
      isOpen={isOpen}
      onClose={onClose}
      successText={successText}
      mainModalStyle={{ closeOnOverlayClick: false, closeOnEsc: false }}
    >
      <Button href={`/${ROUTES.COMPANY}`} customStyles={{ width: '195px' }}>
        Continue
      </Button>
    </GenericSuccessModal>
  );
};

export default CompanySuccessModal;
