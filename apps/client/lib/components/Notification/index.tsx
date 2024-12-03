import React, { useState } from 'react';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  useDisclosure,
  Box,
  VStack,
  HStack,
  Heading,
  Text,
  Flex,
  Icon,
  Divider,
} from '@chakra-ui/react';
import {
  NotificationIcon,
  PreferenceIcon,
} from '~/lib/components/CustomIcons/layout';
import HeaderIcon from '~/lib/layout/ProtectedPage/Header/HeaderIcon';
import TabButton from './Tabs/TabButton';
import { NotifcationTabs } from './Tabs';

const NotificationPopover = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [activeTab, setActiveTab] = useState('All');

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
                  {Tabs.map((item) => (
                    <TabButton
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
                <Text
                  role="button"
                  fontSize="9.33px"
                  lineHeight="11.09px"
                  fontWeight={800}
                  color="#0366EF"
                >
                  Mark all as read
                </Text>
              </HStack>
            </VStack>
          </PopoverHeader>
          <PopoverBody pt="20px" px="20px" overflowY="auto">
            <NotifcationTabs />
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default NotificationPopover;
