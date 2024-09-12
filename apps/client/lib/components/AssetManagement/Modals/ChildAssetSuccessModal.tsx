import React from 'react';
import GenericSuccessModal from './GenericSuccessModal';
import Button from '../../UI/Button';
import { HStack } from '@chakra-ui/react';

interface ChildAssetSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}
const ChildAssetSuccessModal = (props: ChildAssetSuccessModalProps) => {
  const { isOpen, onClose } = props;
  return (
    <GenericSuccessModal
      isOpen={isOpen}
      onClose={onClose}
      successText="Asset Child details added successfully"
    >
      <HStack spacing="16px" width="full" pb="54">
        <Button
          href="/asset-management"
          variant="secondary"
          customStyles={{ height: '30px', maxW: 'max-content' }}
        >
          Back to Grid
        </Button>
        <Button customStyles={{ width: 'full' }}>
          Add Another Child Asset
        </Button>
      </HStack>
    </GenericSuccessModal>
  );
};

export default ChildAssetSuccessModal;
