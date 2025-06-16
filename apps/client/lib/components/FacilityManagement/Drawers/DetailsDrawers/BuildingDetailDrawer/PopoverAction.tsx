import { Text, useDisclosure, VStack } from '@chakra-ui/react';
import { GenericDeleteModal, GenericPopover } from '@repo/ui/components';
import { getSession } from 'next-auth/react';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import { Building } from '~/lib/interfaces/location.interfaces';
import { useDeleteBuildingMutation } from '~/lib/redux/services/location/building.services';
import EditBuildingModal from '../../../LocationModals/EditModals/EditBuildingModal';

const PopoverAction = ({ data }: { data: Building }) => {
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
  const [deleteBuilding, { isLoading }] = useDeleteBuildingMutation();
  const { handleSubmit } = useCustomMutation();

  const handleDelete = async () => {
    const session = await getSession();
    const response = await handleSubmit(
      deleteBuilding,
      { id: data.buildingId, deletedBy: session?.user.username! },
      'Building Deleted Successfully'
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
      <EditBuildingModal
        data={data}
        onClose={onCloseEdit}
        isOpen={isOpenEdit}
      />
    </>
  );
};

export default PopoverAction;
