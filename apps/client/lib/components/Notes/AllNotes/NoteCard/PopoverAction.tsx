import { Text, VStack } from '@chakra-ui/react';
import { GenericPopover } from '@repo/ui/components';
import { AiOutlineEllipsis } from 'react-icons/ai';

const PopoverAction = () => {
  return (
    <>
      <GenericPopover
        width="129px"
        placement="bottom-start"
        icon={AiOutlineEllipsis}
      >
        <VStack width="full" alignItems="flex-start" spacing="16px">
          <Text
            cursor="pointer"
            _hover={{
              background: 'red',
            }}
          >
            Edit Note
          </Text>
          <Text cursor="pointer">Duplicate</Text>
          <Text cursor="pointer">Pin this Note</Text>
          <Text cursor="pointer">Set as Priority</Text>
          <Text cursor="pointer">Delete</Text>
        </VStack>
      </GenericPopover>
    </>
  );
};

export default PopoverAction;
