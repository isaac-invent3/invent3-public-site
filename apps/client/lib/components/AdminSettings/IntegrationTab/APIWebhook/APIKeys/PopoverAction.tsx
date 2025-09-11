import { Text, useDisclosure, VStack } from '@chakra-ui/react';
import { GenericDeleteModal, GenericPopover } from '@repo/ui/components';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import { getSession } from 'next-auth/react';
import { useDeleteCompanyApiKeyMutation } from '~/lib/redux/services/apiKey.services';
import { CompanyApiKeys } from '~/lib/interfaces/apiKey.interfaces';

const PopoverAction = ({ data }: { data: CompanyApiKeys }) => {
  const {
    isOpen: isOpenDelete,
    onOpen: onOpenDelete,
    onClose: onCloseDelete,
  } = useDisclosure();

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
          <Text cursor="pointer" onClick={onOpenDelete} color="#F50000">
            Delete
          </Text>
        </VStack>
      </GenericPopover>
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
