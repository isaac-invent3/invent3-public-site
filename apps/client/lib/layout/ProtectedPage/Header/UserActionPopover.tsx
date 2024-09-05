import React from 'react';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  useDisclosure,
  Box,
  HStack,
  Avatar,
  VStack,
  Text,
  Flex,
  Icon,
  ComponentWithAs,
  IconProps,
} from '@chakra-ui/react';
import {
  ChevronDownIcon,
  Setting2Icon,
  UserProfileIcon,
} from '~/lib/components/CustomIcons/layout';

interface ActionButtonProps {
  icon: ComponentWithAs<'svg', IconProps>;
  name: string;
}
const ActionButton = (props: ActionButtonProps) => {
  const { icon, name } = props;
  return (
    <HStack py="8px" width="full" spacing="16px" cursor="pointer">
      <Icon as={icon} boxSize="25px" />

      <Text fontWeight={500} color="primary.500">
        {name}
      </Text>
    </HStack>
  );
};

const UserActionPopover = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <Box
          position="fixed"
          top="0"
          left="0"
          width="100vw"
          height="100vh"
          bg="blackAlpha.600"
          zIndex="5"
          onClick={onClose}
        />
      )}

      <Popover
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        placement="bottom-start"
      >
        <PopoverTrigger>
          <HStack
            p="7px"
            pl="5px"
            rounded="full"
            bgColor="white"
            spacing="20px"
            cursor="pointer"
          >
            <HStack spacing="10px">
              <Avatar width="40px" height="40px" src="" />
              <VStack alignItems="flex-start" spacing="1px">
                <Text
                  color="neutral.800"
                  fontSize="11.18px"
                  lineHeight="13.28px"
                  letterSpacing="0.05em"
                  fontWeight={700}
                >
                  George Washington
                </Text>
                <Text
                  color="neutral.600"
                  fontSize="9.58px"
                  lineHeight="11.38px"
                  letterSpacing="0.05em"
                  fontWeight={400}
                >
                  Operation Manager
                </Text>
              </VStack>
            </HStack>
            <Flex
              width="16px"
              height="16px"
              bgColor="secondary.pale.accent"
              rounded="full"
              justifyContent="center"
              alignItems="center"
            >
              <Icon as={ChevronDownIcon} boxSize="7px" />
            </Flex>
          </HStack>
        </PopoverTrigger>
        <PopoverContent
          p={0}
          m={0}
          position="relative"
          zIndex="999"
          width="267px"
          rounded="8px"
          border="none"
          overflow="hidden"
          outline={0}
          _focus={{
            borderColor: 'transparent',
          }}
          _active={{
            borderColor: 'transparent',
          }}
          _focusVisible={{
            borderColor: 'transparent',
          }}
        >
          <PopoverHeader
            py="24px"
            px="20px"
            bgImage="/header-popover-bg.png"
            bgSize="cover"
            height="98px"
          >
            <HStack spacing="10px">
              <Avatar
                width="50px"
                height="50px"
                src=""
                border="2.4px solid white"
              />
              <VStack alignItems="flex-start" spacing={0}>
                <Text
                  color="white"
                  fontSize="16px"
                  lineHeight="19.2px"
                  fontWeight={700}
                >
                  George Washington
                </Text>
                <Text
                  color="neutral.300"
                  fontSize="12px"
                  lineHeight="18px"
                  fontWeight={400}
                >
                  Operation Manager
                </Text>
              </VStack>
            </HStack>
          </PopoverHeader>
          <PopoverBody py="24px" px="20px">
            <VStack alignItems="flex-start" spacing="8px">
              <ActionButton icon={UserProfileIcon} name="User Profile" />
              <ActionButton icon={Setting2Icon} name="Logout" />
            </VStack>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default UserActionPopover;
