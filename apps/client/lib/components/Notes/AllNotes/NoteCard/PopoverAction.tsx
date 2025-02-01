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
        popoverBodyStyles={{ padding: '0px' }}
      >
        <VStack width="full" alignItems="flex-start" spacing="4px">
          <Text
            w="full"
            cursor="pointer"
            color="primary.500"
            px="16px"
            py="10px"
            rounded="4px"
            transition="all 200ms ease-in-out"
            _hover={{
              bgColor: 'neutral.200',
            }}
          >
            Edit Note
          </Text>
          <Text
            w="full"
            cursor="pointer"
            color="primary.500"
            px="16px"
            py="10px"
            rounded="4px"
            transition="all 200ms ease-in-out"
            _hover={{
              bgColor: 'neutral.200',
            }}
          >
            Duplicate
          </Text>
          <Text
            w="full"
            cursor="pointer"
            color="primary.500"
            px="16px"
            py="10px"
            rounded="4px"
            transition="all 200ms ease-in-out"
            _hover={{
              bgColor: 'neutral.200',
            }}
          >
            Pin this Note
          </Text>
          <Text
            w="full"
            cursor="pointer"
            color="primary.500"
            px="16px"
            py="10px"
            rounded="4px"
            transition="all 200ms ease-in-out"
            _hover={{
              bgColor: 'neutral.200',
            }}
          >
            Set as Priority
          </Text>
          <Text
            w="full"
            cursor="pointer"
            color="primary.500"
            px="16px"
            py="10px"
            rounded="4px"
            transition="all 200ms ease-in-out"
            _hover={{
              bgColor: 'neutral.200',
            }}
          >
            Delete Note
          </Text>
        </VStack>
      </GenericPopover>
    </>
  );
};

export default PopoverAction;
