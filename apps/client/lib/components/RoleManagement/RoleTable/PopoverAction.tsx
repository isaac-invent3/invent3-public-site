/* eslint-disable no-unused-vars */
import { Text, VStack } from '@chakra-ui/react';
import { GenericPopover } from '@repo/ui/components';
import { useAppDispatch } from '~/lib/redux/hooks';
import { ROUTES } from '~/lib/utils/constants';
import { Role } from '~/lib/interfaces/role.interfaces';

interface PopoverActionProps {
  role: Role;
}

const PopoverAction = ({ role }: PopoverActionProps) => {
  const dispatch = useAppDispatch();
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
          <Text cursor="pointer">Modify</Text>
          <Text cursor="pointer" color="red.500">
            Delete
          </Text>
        </VStack>
      </GenericPopover>
    </>
  );
};

export default PopoverAction;
