import { HStack } from '@chakra-ui/react';
import { Button, GenericSuccessModal } from '@repo/ui/components';
import { ROUTES } from '~/lib/utils/constants';

interface PlanSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'create' | 'edit';
}
const PlanSuccessModal = (props: PlanSuccessModalProps) => {
  const { isOpen, onClose, type } = props;
  const successText =
    type === 'create'
      ? 'A new maintenance plan has been created successfully'
      : 'Maintance Plan has been updated successfully';
  return (
    <GenericSuccessModal
      isOpen={isOpen}
      onClose={() => onClose()}
      headingText="Successful!"
      successText={successText}
      mainModalStyle={{ closeOnOverlayClick: false, closeOnEsc: false }}
    >
      <HStack>
        <Button
          customStyles={{ width: '193px' }}
          href={`/${ROUTES.MAINTENANCE}`}
        >
          Continue
        </Button>
      </HStack>
    </GenericSuccessModal>
  );
};

export default PlanSuccessModal;
