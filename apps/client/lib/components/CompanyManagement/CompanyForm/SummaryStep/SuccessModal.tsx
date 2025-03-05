import { Stack } from '@chakra-ui/react';
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
      ? 'Company Created Successfully!'
      : 'Company Updated Sucessfully!';
  return (
    <GenericSuccessModal
      isOpen={isOpen}
      onClose={onClose}
      successText={successText}
      mainModalStyle={{ closeOnOverlayClick: false, closeOnEsc: false }}
    >
      {type === 'edit' && (
        <Button href={`/${ROUTES.COMPANY}`} customStyles={{ width: '195px' }}>
          Continue
        </Button>
      )}
      {type === 'create' && (
        <Stack
          direction={{ base: 'column', sm: 'row' }}
          width="full"
          justifyContent="center"
          spacing={{ base: '8px', sm: '16px' }}
        >
          <Button
            variant="outline"
            href={`/${ROUTES.COMPANY}`}
            customStyles={{ width: { base: 'full', sm: '170px' } }}
          >
            Don’t Upload Data yet
          </Button>
          <Button
            href={`/${ROUTES.COMPANY}`}
            customStyles={{ width: { base: 'full', sm: '193px' } }}
          >
            Continue to Data Upload
          </Button>
        </Stack>
      )}
    </GenericSuccessModal>
  );
};

export default CompanySuccessModal;
