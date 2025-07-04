/* eslint-disable no-unused-vars */
import { Icon, Text, useDisclosure, VStack } from '@chakra-ui/react';
import { Button, GenericPopover } from '@repo/ui/components';
import usePermissionAccess from '~/lib/hooks/useRoleAccess';
import { ROUTES, USER_STATUS_ENUM } from '~/lib/utils/constants';
import DeactivateUserModal from '../Modals/ToggleUserStatusModal';
import { User } from '~/lib/interfaces/user.interfaces';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { DrawerAction } from '../../UI/DrawerAction';

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
      <DrawerAction>
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
      </DrawerAction>
      <DeactivateUserModal isOpen={isOpen} onClose={onClose} user={data} />
    </>
  );
};

export default MobilePopover;
