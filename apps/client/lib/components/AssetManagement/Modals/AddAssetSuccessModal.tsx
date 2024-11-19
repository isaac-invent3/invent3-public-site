/* eslint-disable no-unused-vars */
import React from 'react';
import GenericSuccessModal from '../../UI/Modal/GenericSuccessModal';
import Button from '../../UI/Button';
import { HStack, VStack } from '@chakra-ui/react';

interface AddAssetSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  handleAction: (type: 'childAsset' | 'parentAsset') => void;
}
const AddAssetSuccessModal = (props: AddAssetSuccessModalProps) => {
  const { isOpen, onClose, handleAction } = props;
  return (
    <GenericSuccessModal
      isOpen={isOpen}
      onClose={onClose}
      successText="Asset details added successfully"
      mainModalStyle={{ closeOnOverlayClick: false }}
    >
      <VStack spacing="24px" width="full">
        <HStack spacing="16px" width="full">
          <Button
            customStyles={{ width: 'full' }}
            variant="outline"
            handleClick={() => handleAction('childAsset')}
          >
            Add a Child Asset
          </Button>
          <Button
            customStyles={{ width: 'full' }}
            handleClick={() => handleAction('parentAsset')}
          >
            Add Another Asset
          </Button>
        </HStack>
        <Button
          href="/asset-management"
          variant="secondary"
          customStyles={{ height: '30px', maxW: 'max-content' }}
        >
          Back to Grid
        </Button>
      </VStack>
    </GenericSuccessModal>
  );
};

export default AddAssetSuccessModal;
