import { Text, VStack } from '@chakra-ui/react';
import { GenericPopover } from '@repo/ui/components';

const CMFPopoverAction = () => {
  return (
    <>
      <GenericPopover width="189px" placement="bottom-start">
        <VStack width="full" alignItems="flex-start" spacing="16px">
          <Text cursor="pointer">Save Changes</Text>
          <Text cursor="pointer">Mark as Resolved</Text>
          <Text cursor="pointer">Escalate to Super Admin</Text>
        </VStack>
      </GenericPopover>
    </>
  );
};

export default CMFPopoverAction;
