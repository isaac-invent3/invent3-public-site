import {
  Box,
  Button,
  Divider,
  Flex,
  HStack,
  Heading,
  Icon,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Spinner,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';
import { getSession } from 'next-auth/react';
import { useState } from 'react';
import {
  NotificationIcon,
  PreferenceIcon,
} from '~/lib/components/CustomIcons/layout';
import useSignalR from '~/lib/hooks/useSignalR';
import useSignalREventHandler from '~/lib/hooks/useSignalREventHandler';
import HeaderIcon from '~/lib/layout/ProtectedPage/Header/HeaderIcon';
import { useMarkAllNotificationsAsReadMutation } from '~/lib/redux/services/notification.services';
import { NotifcationTabs } from './Tabs';
import TabButton from './Tabs/TabButton';

const NotificationPopover = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [activeTab, setActiveTab] = useState('All');
  const connectionState = useSignalR();

  useSignalREventHandler({
    callback: (message) => console.log(message),
    eventName: 'ReceiveNotification',
    connectionState,
  });
  const [markAllAsReadMutation, { isLoading }] =
    useMarkAllNotificationsAsReadMutation();

  const Tabs = [
    {
      label: 'All',
      count: 0,
    },
    {
      label: 'Unread',
      count: 2,
    },
    {
      label: 'Alerts',
      count: 0,
    },
  ];

  const handleMarkNotificationsAsRead = async () => {
    const session = await getSession();

    if (!session?.user?.userId) return;

    await markAllAsReadMutation({
      userId: session?.user.userId,
      lastModifiedBy: session?.user.userId,
    });
  };

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
          <HeaderIcon icon={NotificationIcon} size="24px" />
        </PopoverTrigger>
        <PopoverContent
          p={0}
          m={0}
          position="relative"
          zIndex="999"
          width="347.33px"
          height="604px"
          maxH="80vh"
          rounded="10.67px"
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
          <PopoverHeader p={0} mt="20px" px="16px" border="none">
            <VStack width="full" spacing="31px">
              <HStack width="full" justifyContent="space-between">
                <Heading
                  fontSize={{ base: '21.33px' }}
                  lineHeight="25.34px"
                  color="primary.500"
                >
                  Notifications
                </Heading>
                <Flex
                  alignItems="center"
                  justifyContent="center"
                  bgColor="neutral.200"
                  width="26.61px"
                  height="26.61px"
                  rounded="full"
                >
                  <Icon as={PreferenceIcon} boxSize="15px" />
                </Flex>
              </HStack>
              <HStack
                width="full"
                justifyContent="space-between"
                borderBottom="1px solid #BBBBBB"
                alignItems="flex-start"
              >
                <HStack spacing="10.67px" height="full" alignItems="stretch">
                  {Tabs.map((item, index) => (
                    <TabButton
                      key={index}
                      tab={item}
                      activeTab={activeTab}
                      setActiveTab={setActiveTab}
                    />
                  ))}
                  <Divider
                    orientation="vertical"
                    borderColor="neutral.600"
                    borderWidth="1px"
                    height="12px"
                  />
                  <TabButton
                    tab={{ label: 'Archived', count: 0 }}
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                  />
                </HStack>
                <HStack gap="8px">
                  {isLoading && <Spinner color="#0366EF" size="sm" />}

                  <Button
                    fontSize="9.33px"
                    lineHeight="11.09px"
                    fontWeight={800}
                    color="#0366EF"
                    onClick={handleMarkNotificationsAsRead}
                    padding={0}
                    background={'none'}
                    height="auto"
                    isDisabled={isLoading}
                  >
                    Mark all as read
                  </Button>
                </HStack>
              </HStack>
            </VStack>
          </PopoverHeader>
          <PopoverBody pt="20px" px="20px" overflowY="auto">
            {isOpen && <NotifcationTabs activeTab={activeTab} />}
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default NotificationPopover;
