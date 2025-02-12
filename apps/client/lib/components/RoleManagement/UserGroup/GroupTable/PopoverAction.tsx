/* eslint-disable no-unused-vars */
import { Text, VStack } from '@chakra-ui/react';
import { GenericPopover } from '@repo/ui/components';
import { useAppDispatch } from '~/lib/redux/hooks';
import { ROUTES } from '~/lib/utils/constants';
import { UserGroupInfoHeader } from '~/lib/interfaces/user.interfaces';

interface PopoverActionProps {
  group: UserGroupInfoHeader;
}

const PopoverAction = ({ group }: PopoverActionProps) => {
  const dispatch = useAppDispatch();
  return (
    <>
      <GenericPopover width="137px" placement="bottom-start">
        <VStack width="full" alignItems="flex-start" spacing="16px">
          <Text
            cursor="pointer"
            as="a"
            href={`/${ROUTES.ROLES}/${group.groupId}/detail`}
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
