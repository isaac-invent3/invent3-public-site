import { Text, useDisclosure, VStack } from '@chakra-ui/react';
import { GenericDeleteModal, GenericPopover } from '@repo/ui/components';
import { getSession } from 'next-auth/react';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import { Floor } from '~/lib/interfaces/location.interfaces';
import { useDeleteFloorMutation } from '~/lib/redux/services/location/floor.services';
import EditFloorModal from '../../../LocationModals/EditModals/EditFloorModal';

const PopoverAction = ({ data }: { data: Floor }) => {
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
  const [deleteFloor, { isLoading }] = useDeleteFloorMutation();
  const { handleSubmit } = useCustomMutation();

  const handleDelete = async () => {
    const session = await getSession();
    const response = await handleSubmit(
      deleteFloor,
      { id: data.floorId, deletedBy: session?.user.username! },
      'Floor Deleted Successfully'
    );
    if (response?.data) {
      onCloseDelete();
    }
  };

  return (
    <>
      <GenericPopover placement="bottom-start" width="120px">
        <VStack alignItems="flex-start">
          <Text onClick={onOpenEdit}>Edit</Text>
          <Text color="#F50000" onClick={onOpenDelete}>
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
      <EditFloorModal data={data} onClose={onCloseEdit} isOpen={isOpenEdit} />
    </>
  );
};

export default PopoverAction;
