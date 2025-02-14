/* eslint-disable no-unused-vars */
import { Text, VStack } from '@chakra-ui/react';
import { GenericPopover } from '@repo/ui/components';

const PopoverAction = () => {
  return (
    <>
      <GenericPopover width="137px" placement="bottom-start">
        <VStack width="full" alignItems="flex-start" spacing="16px">
          <Text cursor="pointer">View Details</Text>
        </VStack>
      </GenericPopover>
    </>
  );
};

export default PopoverAction;
