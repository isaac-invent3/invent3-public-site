/* eslint-disable no-unused-vars */
import { Text, useDisclosure, VStack } from '@chakra-ui/react';
import { GenericDeleteModal, GenericPopover } from '@repo/ui/components';
import { useAppDispatch } from '~/lib/redux/hooks';
import { ROUTES } from '~/lib/utils/constants';
import { UserGroupInfoHeader } from '~/lib/interfaces/user.interfaces';
import { getSession } from 'next-auth/react';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import { useDeleteUserGroupMutation } from '~/lib/redux/services/user.services';

interface PopoverActionProps {
  group: UserGroupInfoHeader;
}

const PopoverAction = ({ group }: PopoverActionProps) => {
  const [deleteUserGroup, { isLoading }] = useDeleteUserGroupMutation({});
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { handleSubmit } = useCustomMutation();

  const handleDeleteUserGroup = async () => {
    const session = await getSession();
    const response = await handleSubmit(
      deleteUserGroup,
      { id: group.groupId, deletedBy: session?.user.username! },
      'Group Deleted Successfully'
    );
    if (response?.data) {
      onClose();
    }
  };
  return (
    <>
      <GenericPopover width="137px" placement="bottom-start">
        <VStack width="full" alignItems="flex-start" spacing="16px">
          {/* <Text
            cursor="pointer"
            as="a"
            href={`/${ROUTES.ROLES}/group/${group.groupId}/detail`}
          >
            View Details
          </Text> */}
          <Text
            cursor="pointer"
            as="a"
            href={`/${ROUTES.ROLES}/group/${group.groupId}/edit`}
          >
            Modify
          </Text>
          <Text cursor="pointer" color="red.500" as="button" onClick={onOpen}>
            Delete
          </Text>
        </VStack>
      </GenericPopover>
      {isOpen && (
        <GenericDeleteModal
          isOpen={isOpen}
          onClose={onClose}
          handleDelete={handleDeleteUserGroup}
          isLoading={isLoading}
        />
      )}
    </>
  );
};

export default PopoverAction;
