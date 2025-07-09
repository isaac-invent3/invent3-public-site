/* eslint-disable no-unused-vars */
import { Text, useDisclosure, VStack } from '@chakra-ui/react';
import { GenericPopover } from '@repo/ui/components';
import useCustomSearchParams from '~/lib/hooks/useCustomSearchParams';
import { User } from '~/lib/interfaces/user.interfaces';
import { useAppDispatch } from '~/lib/redux/hooks';
import { setUser } from '~/lib/redux/slices/UserSlice';
import {
  ROUTES,
  SYSTEM_CONTEXT_DETAILS,
  USER_STATUS_ENUM,
} from '~/lib/utils/constants';
import ToggleUserStatusModal from '../Modals/ToggleUserStatusModal';
import ResetUserPassword from '../Modals/ResetUserPasswordModal';

interface PopoverActionProps {
  user: User;
}

const PopoverAction = ({ user }: PopoverActionProps) => {
  const dispatch = useAppDispatch();
  const {
    isOpen: isOpenResetPassword,
    onOpen: onOpenResetPassword,
    onClose: onCloseResetPassword,
  } = useDisclosure();
  const { updateSearchParam } = useCustomSearchParams();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isActive = user?.statusId === USER_STATUS_ENUM.ACTIVE;
  return (
    <>
      <GenericPopover width="137px" placement="bottom-start">
        <VStack width="full" alignItems="flex-start" spacing="16px">
          <Text
            cursor="pointer"
            onClick={() => {
              dispatch(setUser(user));
              updateSearchParam(SYSTEM_CONTEXT_DETAILS.USER.slug, user.userId);
            }}
          >
            View Details
          </Text>
          <Text
            cursor="pointer"
            as="a"
            href={`/${ROUTES.USERS}/${user.userId}/edit`}
          >
            Modify
          </Text>
          <Text
            cursor="pointer"
            color={isActive ? 'red.500' : 'black'}
            onClick={() => onOpen()}
          >
            {isActive ? 'Deactivate' : 'Activate'}
          </Text>
          <Text
            cursor="pointer"
            color="red.500"
            onClick={() => onOpenResetPassword()}
          >
            Reset Password
          </Text>
        </VStack>
      </GenericPopover>
      <ToggleUserStatusModal isOpen={isOpen} onClose={onClose} user={user} />
      <ResetUserPassword
        isOpen={isOpenResetPassword}
        onClose={onCloseResetPassword}
        user={user}
      />
    </>
  );
};

export default PopoverAction;
