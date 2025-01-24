/* eslint-disable no-unused-vars */
import { Text, useDisclosure, VStack } from '@chakra-ui/react';
import { GenericPopover } from '@repo/ui/components';
import useCustomSearchParams from '~/lib/hooks/useCustomSearchParams';
import { User } from '~/lib/interfaces/user.interfaces';
import { useAppDispatch } from '~/lib/redux/hooks';
import { setUser } from '~/lib/redux/slices/UserSlice';
import { SYSTEM_CONTEXT_DETAILS } from '~/lib/utils/constants';
import DeactivateUserModal from '../Modals/DeactivateUserModal';

interface PopoverActionProps {
  user: User;
}

const PopoverAction = ({ user }: PopoverActionProps) => {
  const dispatch = useAppDispatch();
  const { updateSearchParam } = useCustomSearchParams();
  const { isOpen, onOpen, onClose } = useDisclosure();
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
          <Text cursor="pointer">Modify</Text>
          <Text cursor="pointer" color="red.500" onClick={() => onOpen()}>
            Deactivate
          </Text>
        </VStack>
      </GenericPopover>
      <DeactivateUserModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default PopoverAction;
