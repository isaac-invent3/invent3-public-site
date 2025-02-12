/* eslint-disable no-unused-vars */
import { Text, useDisclosure, VStack } from '@chakra-ui/react';
import { GenericDeleteModal, GenericPopover } from '@repo/ui/components';
import { useAppDispatch } from '~/lib/redux/hooks';
import { ROUTES } from '~/lib/utils/constants';
import { Role } from '~/lib/interfaces/role.interfaces';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import usePermissionAccess from '~/lib/hooks/useRoleAccess';
import { useDeleteRoleMutation } from '~/lib/redux/services/role.services';
import { getSession } from 'next-auth/react';

interface PopoverActionProps {
  role: Role;
}

const PopoverAction = ({ role }: PopoverActionProps) => {
  const { handleSubmit } = useCustomMutation();
  const [deleteTemplate, { isLoading }] = useDeleteRoleMutation({});
  const canDeleteRole = usePermissionAccess('role:delete');
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleDeleteRole = async () => {
    const session = await getSession();
    const response = await handleSubmit(
      deleteTemplate,
      { id: role.roleId, deletedBy: session?.user.username! },
      'Role Deleted Successfully'
    );
    if (response?.data) {
      onClose();
    }
  };
  return (
    <>
      <GenericPopover width="137px" placement="bottom-start">
        <VStack width="full" alignItems="flex-start" spacing="16px">
          <Text
            cursor="pointer"
            as="a"
            href={`/${ROUTES.ROLES}/${role.roleId}/detail`}
          >
            View Details
          </Text>
          {/* {canDeleteRole && ( */}
          <Text cursor="pointer" color="red.500" onClick={() => onOpen()}>
            Delete
          </Text>
          {/* )} */}
        </VStack>
      </GenericPopover>
      {isOpen && (
        <GenericDeleteModal
          isOpen={isOpen}
          onClose={onClose}
          handleDelete={handleDeleteRole}
          isLoading={isLoading}
        />
      )}
    </>
  );
};

export default PopoverAction;
