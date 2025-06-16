import { Text, useDisclosure, VStack } from '@chakra-ui/react';
import { GenericDeleteModal, GenericPopover } from '@repo/ui/components';
import { getSession } from 'next-auth/react';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import { Room } from '~/lib/interfaces/location.interfaces';
import { useDeleteRoomMutation } from '~/lib/redux/services/location/room.services';
import EditRoomModal from '../../../LocationModals/EditModals/EditRoomModal';

const PopoverAction = ({ data }: { data: Room }) => {
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
  const [deleteRoom, { isLoading }] = useDeleteRoomMutation();
  const { handleSubmit } = useCustomMutation();

  const handleDelete = async () => {
    const session = await getSession();
    const response = await handleSubmit(
      deleteRoom,
      { id: data.roomId, deletedBy: session?.user.username! },
      'Room Deleted Successfully'
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
      <EditRoomModal data={data} onClose={onCloseEdit} isOpen={isOpenEdit} />
    </>
  );
};

export default PopoverAction;
