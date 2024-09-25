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
import { handleSignOut } from '~/app/actions/authActions';
import { useSession } from 'next-auth/react';

interface ActionButtonProps {
  icon: ComponentWithAs<'svg', IconProps>;
  name: string;
  handleClick: () => void;
}
const ActionButton = (props: ActionButtonProps) => {
  const { icon, name, handleClick } = props;
  return (
    <HStack
      py="8px"
      width="full"
      spacing="16px"
      cursor="pointer"
      onClick={handleClick}
    >
      <Icon as={icon} boxSize="24px" bgColor="#F9F9F9F9" rounded="8px" />

      <Text size="md" color="primary.500">
        {name}
      </Text>
    </HStack>
  );
};

const UserActionPopover = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data } = useSession();

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
          zIndex="9"
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
            pl={0}
            height="40px"
            rounded="full"
            bgColor="white"
            spacing="20px"
            cursor="pointer"
            textTransform="capitalize"
          >
            <HStack spacing="10px">
              <Avatar
                width="38px"
                height="38px"
                src=""
                border="2.4px solid white"
              />
              <VStack alignItems="flex-start" spacing="1px">
                <Text
                  color="neutral.800"
                  fontSize="11.18px"
                  lineHeight="13.28px"
                  letterSpacing="0.05em"
                  fontWeight={700}
                >
                  {data?.user?.name}
                </Text>
                <Text
                  color="neutral.600"
                  fontSize="9.58px"
                  lineHeight="11.38px"
                  letterSpacing="0.05em"
                  fontWeight={400}
                >
                  {data?.user?.role}
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
                <Text color="white" size="lg" fontWeight={700}>
                  {data?.user?.name}
                </Text>
                <Text
                  color="neutral.300"
                  fontSize="12px"
                  lineHeight="18px"
                  fontWeight={400}
                >
                  {data?.user?.role}
                </Text>
              </VStack>
            </HStack>
          </PopoverHeader>
          <PopoverBody py="24px" px="20px">
            <VStack alignItems="flex-start" spacing="8px">
              <ActionButton
                icon={UserProfileIcon}
                name="User Profile"
                handleClick={() => {}}
              />
              <ActionButton
                icon={Setting2Icon}
                name="Logout"
                handleClick={() => handleSignOut()}
              />
            </VStack>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default UserActionPopover;
