/* eslint-disable no-unused-vars */
import { Text, useDisclosure, VStack } from '@chakra-ui/react';
import { GenericDeleteModal, GenericPopover } from '@repo/ui/components';
import { useAppDispatch } from '~/lib/redux/hooks';
import { ROLE_IDS_ENUM, ROUTES } from '~/lib/utils/constants';
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
  const [deleteRole, { isLoading }] = useDeleteRoleMutation({});
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleDeleteRole = async () => {
    const session = await getSession();
    const response = await handleSubmit(
      deleteRole,
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
            href={`/${ROUTES.ROLES}/role/${role.roleId}/detail`}
          >
            Modify
          </Text>
          {!Object.values(ROLE_IDS_ENUM).includes(role.roleId) && (
            <Text cursor="pointer" color="red.500" onClick={() => onOpen()}>
              Delete
            </Text>
          )}
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
