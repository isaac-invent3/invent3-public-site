/* eslint-disable no-unused-vars */

import { Button, GenericSuccessModal } from '@repo/ui/components';
import { HStack, Stack, VStack } from '@chakra-ui/react';
import { ROUTES } from '~/lib/utils/constants';

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
      mainModalStyle={{ closeOnOverlayClick: false, closeOnEsc: false }}
    >
      <VStack spacing="24px" width="full">
        <Stack
          spacing="16px"
          width="full"
          direction={{ base: 'column', sm: 'row' }}
          justifyContent="space-between"
        >
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
        </Stack>
        <Button
          href={`/${ROUTES.ASSETS}`}
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
