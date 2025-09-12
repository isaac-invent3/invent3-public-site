import { Text, useDisclosure, VStack } from '@chakra-ui/react';
import { GenericDeleteModal, GenericPopover } from '@repo/ui/components';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import { getSession } from 'next-auth/react';
import { useDeleteCompanyApiKeyMutation } from '~/lib/redux/services/apiKey.services';
import { CompanyApiKeys } from '~/lib/interfaces/apiKey.interfaces';
import { USER_STATUS_ENUM } from '~/lib/utils/constants';
import ToggleAPIKeyModal from './ToggleAPIKeyModal';

const PopoverAction = ({ data }: { data: CompanyApiKeys }) => {
  const {
    isOpen: isOpenDelete,
    onOpen: onOpenDelete,
    onClose: onCloseDelete,
  } = useDisclosure();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isActive = data?.statusId === USER_STATUS_ENUM.ACTIVE;

  const { handleSubmit } = useCustomMutation();
  const [deleteAPiKey, { isLoading }] = useDeleteCompanyApiKeyMutation({});

  const handleDeleteApiKey = async () => {
    const session = await getSession();
    const response = await handleSubmit(
      deleteAPiKey,
      { id: data?.companyApiKeyId, deletedBy: session?.user.username! },
      'API Key Revoked Successfully'
    );
    if (response?.data) {
      onCloseDelete();
    }
  };

  return (
    <>
      <GenericPopover width="129px" placement="bottom-start">
        <VStack width="full" alignItems="flex-start" spacing="16px">
          <Text
            cursor="pointer"
            color={isActive ? 'red.500' : 'black'}
            onClick={() => onOpen()}
          >
            {isActive ? 'Revoke' : 'Activate'}
          </Text>
        </VStack>
      </GenericPopover>
      <ToggleAPIKeyModal isOpen={isOpen} onClose={onClose} apiKey={data} />
      {isOpenDelete && (
        <GenericDeleteModal
          isOpen={isOpenDelete}
          onClose={onCloseDelete}
          handleDelete={handleDeleteApiKey}
          isLoading={isLoading}
        />
      )}
    </>
  );
};

export default PopoverAction;
