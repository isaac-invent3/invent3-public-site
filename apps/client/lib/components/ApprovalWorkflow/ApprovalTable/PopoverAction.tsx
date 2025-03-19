/* eslint-disable no-unused-vars */
import { Text, VStack } from '@chakra-ui/react';
import { GenericPopover } from '@repo/ui/components';

interface PopoverActionProps {}

const PopoverAction = (props: PopoverActionProps) => {
  return (
    <>
      <GenericPopover width="137px" placement="bottom-start">
        <VStack width="full" alignItems="flex-start" spacing="16px">
          <Text cursor="pointer">View Workflow</Text>
        </VStack>
      </GenericPopover>
    </>
  );
};

export default PopoverAction;
