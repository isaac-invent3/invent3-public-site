/* eslint-disable no-unused-vars */
import { Text, useDisclosure, VStack } from '@chakra-ui/react';
import { GenericPopover } from '@repo/ui/components';
import usePermissionAccess from '~/lib/hooks/useRoleAccess';
import { ROUTES, USER_STATUS_ENUM } from '~/lib/utils/constants';
import DeactivateUserModal from '../Modals/ToggleUserStatusModal';
import { User } from '~/lib/interfaces/user.interfaces';

interface MobilePopoverProps {
  data: User;
}
const MobilePopover = (props: MobilePopoverProps) => {
  const { data } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const canEditUser = usePermissionAccess('user:edit');
  const canDeactivateUser = usePermissionAccess('user:deactivate');

  return (
    <>
      <GenericPopover width="137px" placement="bottom-start">
        <VStack width="full" alignItems="flex-start" spacing="16px">
          {canEditUser && (
            <Text
              cursor="pointer"
              as="a"
              href={`/${ROUTES.USERS}/${data?.userId}/edit`}
            >
              Modify
            </Text>
          )}
          {canDeactivateUser && (
            <Text cursor="pointer" onClick={onOpen}>
              {data?.statusId === USER_STATUS_ENUM.ACTIVE
                ? 'Deactivate'
                : 'Activate'}
            </Text>
          )}
        </VStack>
      </GenericPopover>
      <DeactivateUserModal isOpen={isOpen} onClose={onClose} user={data} />
    </>
  );
};

export default MobilePopover;
