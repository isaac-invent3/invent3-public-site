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
  ExitIcon,
  Setting2Icon,
  UserProfileIcon,
} from '~/lib/components/CustomIcons/layout';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { ROLE_IDS_ENUM } from '~/lib/utils/constants';
import Profile from '~/lib/components/Profile';
import UserSettings from '~/lib/components/UserSettings';
import { handleSignOutClient } from '~/lib/utils/handleSignOutClient';

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
      <Icon
        as={icon}
        boxSize={{ base: '20px', md: '26px' }}
        color="neutral.600"
        rounded="8px"
      />

      <Text size="md" color="primary.500">
        {name}
      </Text>
    </HStack>
  );
};

const UserActionPopover = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data } = useSession();
  const router = useRouter();
  const {
    isOpen: isOpenProfile,
    onOpen: onOpenProfile,
    onClose: onCloseProfile,
  } = useDisclosure();
  const {
    isOpen: isOpenSettings,
    onOpen: onOpenSettings,
    onClose: onCloseSettings,
  } = useDisclosure();

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
            p={{ md: '7px' }}
            pl={{ base: 0, md: 0 }}
            height="40px"
            justifyContent={{ base: 'center', md: 'space-between' }}
            width={{ base: '40px', md: 'min-content' }}
            rounded="full"
            bgColor="white"
            spacing="20px"
            cursor="pointer"
            textTransform="capitalize"
            flexShrink={0}
          >
            <HStack spacing="10px">
              <Avatar
                size={{ base: 'sm', md: 'md' }}
                width="38px"
                height="38px"
                src=""
                border="2.4px solid white"
                name={data?.user.name ?? ''}
              />
              <VStack
                alignItems="flex-start"
                spacing="1px"
                display={{ base: 'none', md: 'flex' }}
              >
                <Text
                  color="neutral.800"
                  fontSize="11.18px"
                  lineHeight="13.28px"
                  letterSpacing="0.05em"
                  fontWeight={700}
                  whiteSpace="nowrap"
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
              display={{ base: 'none', md: 'flex' }}
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
            py={{ base: '12px', md: '24px' }}
            px="20px"
            bgImage="/header-popover-bg.png"
            bgSize="cover"
            height={{ md: '98px' }}
          >
            <HStack spacing="10px">
              <Avatar
                width={{ base: '30px', md: '50px' }}
                height={{ base: '30px', md: '50px' }}
                src=""
                border="2.4px solid white"
                name={data?.user.name ?? ''}
                size={{ base: 'sm', md: 'md' }}
              />
              <VStack alignItems="flex-start" spacing={0}>
                <Text
                  color="white"
                  size={{ base: 'md', md: 'lg' }}
                  fontWeight={700}
                >
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
          <PopoverBody pt={{ base: '16px', md: '32px' }} pb="20px" px="20px">
            <VStack alignItems="flex-start" spacing="8px">
              <ActionButton
                icon={UserProfileIcon}
                name="User Profile"
                handleClick={() => {
                  onOpenProfile();
                  onClose();
                }}
              />
              <ActionButton
                icon={Setting2Icon}
                name="General Settings"
                handleClick={() => {
                  onOpenSettings();
                  onClose();
                }}
              />
              {data?.user.roleIds?.includes(ROLE_IDS_ENUM.CLIENT_ADMIN) && (
                <ActionButton
                  icon={Setting2Icon}
                  name="Admin Settings"
                  handleClick={() => {
                    router.push('/settings');
                    onClose();
                  }}
                />
              )}
              <ActionButton
                icon={ExitIcon}
                name="Logout"
                handleClick={() => handleSignOutClient()}
              />
            </VStack>
          </PopoverBody>
        </PopoverContent>
      </Popover>
      {isOpenProfile && (
        <Profile isOpen={isOpenProfile} onClose={onCloseProfile} />
      )}
      {isOpenSettings && (
        <UserSettings isOpen={isOpenSettings} onClose={onCloseSettings} />
      )}
    </>
  );
};

export default UserActionPopover;
