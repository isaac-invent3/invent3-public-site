import { Text, useDisclosure, VStack } from '@chakra-ui/react';
import { GenericDeleteModal, GenericPopover } from '@repo/ui/components';
import { getSession } from 'next-auth/react';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import { Department } from '~/lib/interfaces/location.interfaces';
import { useDeleteDepartmentMutation } from '~/lib/redux/services/location/department.services';
import EditDepartmentModal from '../../../LocationModals/EditModals/EditDepartmentModal';

const PopoverAction = ({ data }: { data: Department }) => {
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
  const [deleteDepartment, { isLoading }] = useDeleteDepartmentMutation();
  const { handleSubmit } = useCustomMutation();

  const handleDelete = async () => {
    const session = await getSession();
    const response = await handleSubmit(
      deleteDepartment,
      { id: data.departmentId, deletedBy: session?.user.username! },
      'Department Deleted Successfully'
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
      <EditDepartmentModal
        data={data}
        onClose={onCloseEdit}
        isOpen={isOpenEdit}
      />
    </>
  );
};

export default PopoverAction;
