import { Text, useDisclosure, VStack } from '@chakra-ui/react';
import { GenericDeleteModal, GenericPopover } from '@repo/ui/components';
import { getSession } from 'next-auth/react';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import { Aisle } from '~/lib/interfaces/location.interfaces';
import { useDeleteAisleMutation } from '~/lib/redux/services/location/aisle.services';
import EditAisleModal from '../../../LocationModals/EditModals/EditAisleModal';

const PopoverAction = ({ data }: { data: Aisle }) => {
  const {
    isOpen: isOpenEdit,
    onOpen: onOpenEdit,
    onClose: onCloseEdit,
  } = useDisclosure();
  const {
    isOpen: isOpenDelete,
    onOpen: onOpenDelete,
    onClose: onCloseDelete,
  } = useDisclosure();
  const [deleteAisle, { isLoading }] = useDeleteAisleMutation();
  const { handleSubmit } = useCustomMutation();

  const handleDelete = async () => {
    const session = await getSession();
    const response = await handleSubmit(
      deleteAisle,
      { id: data.aisleId, deletedBy: session?.user.username! },
      'Aisle Deleted Successfully'
    );
    if (response?.data) {
      onCloseDelete();
    }
  };

  return (
    <>
      <GenericPopover placement="bottom-start" width="120px">
        <VStack alignItems="flex-start">
          <Text onClick={onOpenEdit} cursor="pointer">
            Edit
          </Text>
          <Text color="#F50000" onClick={onOpenDelete} cursor="pointer">
            Delete
          </Text>
        </VStack>
      </GenericPopover>
      <GenericDeleteModal
        isLoading={isLoading}
        isOpen={isOpenDelete}
        onClose={onCloseDelete}
        handleDelete={handleDelete}
      />
      <EditAisleModal data={data} onClose={onCloseEdit} isOpen={isOpenEdit} />
    </>
  );
};

export default PopoverAction;
