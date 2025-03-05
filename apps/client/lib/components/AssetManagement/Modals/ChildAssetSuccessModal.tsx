/* eslint-disable no-unused-vars */
import { Button, GenericSuccessModal } from '@repo/ui/components';
import { HStack } from '@chakra-ui/react';
import { ROUTES } from '~/lib/utils/constants';

interface ChildAssetSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  handleAction: (type: 'childAsset' | 'parentAsset') => void;
}
const ChildAssetSuccessModal = (props: ChildAssetSuccessModalProps) => {
  const { isOpen, onClose, handleAction } = props;
  return (
    <GenericSuccessModal
      isOpen={isOpen}
      onClose={onClose}
      successText="Asset Child details added successfully"
      mainModalStyle={{ closeOnOverlayClick: false, closeOnEsc: false }}
    >
      <HStack
        spacing="16px"
        width="full"
        pb={{ lg: '54' }}
        flexWrap="wrap"
        justifyContent="center"
      >
        <Button
          href={`/${ROUTES.ASSETS}`}
          variant="secondary"
          customStyles={{ height: '30px', maxW: 'max-content' }}
        >
          Back to Grid
        </Button>
        <Button
          customStyles={{ width: 'max-content' }}
          handleClick={() => handleAction('childAsset')}
        >
          Add Another Child Asset
        </Button>
      </HStack>
    </GenericSuccessModal>
  );
};

export default ChildAssetSuccessModal;
