import { Text, useDisclosure, VStack } from '@chakra-ui/react';
import { GenericDeleteModal, GenericPopover } from '@repo/ui/components';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import { getSession } from 'next-auth/react';
import { useDeleteCompanyWebhookURLMutation } from '~/lib/redux/services/webhook.services';
import { CompanyWebhookURL } from '~/lib/interfaces/webhook.interfaces';
import WebhookModal from './WebhookModal';

const PopoverAction = ({ data }: { data: CompanyWebhookURL }) => {
  const {
    isOpen: isOpenDelete,
    onOpen: onOpenDelete,
    onClose: onCloseDelete,
  } = useDisclosure();
  const {
    isOpen: isOpenEdit,
    onOpen: onOpenEdit,
    onClose: onCloseEdit,
  } = useDisclosure();

  const { handleSubmit } = useCustomMutation();
  const [deleteWebhookURL, { isLoading }] = useDeleteCompanyWebhookURLMutation(
    {}
  );

  const handleDeleteApiKey = async () => {
    const session = await getSession();
    const response = await handleSubmit(
      deleteWebhookURL,
      { id: data?.companyWebhookUrlId, deletedBy: session?.user.username! },
      'Webhook URL Revoked Successfully'
    );
    if (response?.data) {
      onCloseDelete();
    }
  };

  return (
    <>
      <GenericPopover width="129px" placement="bottom-start">
        <VStack width="full" alignItems="flex-start" spacing="16px">
          <Text cursor="pointer" onClick={onOpenEdit} color="primary.500">
            Edit
          </Text>
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
      {isOpenEdit && (
        <WebhookModal
          isOpen={isOpenEdit}
          onClose={onCloseEdit}
          type="edit"
          data={data}
        />
      )}
    </>
  );
};

export default PopoverAction;
