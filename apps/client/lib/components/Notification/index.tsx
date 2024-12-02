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
} from '@chakra-ui/react';
import {
  NotificationIcon,
  PreferenceIcon,
} from '~/lib/components/CustomIcons/layout';
import HeaderIcon from '~/lib/layout/ProtectedPage/Header/HeaderIcon';

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
          <HeaderIcon
            icon={NotificationIcon}
            size="24px"
            handleClick={() => onOpen()}
          />
        </PopoverTrigger>
        <PopoverContent
          p={0}
          m={0}
          mt="45px"
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
          <PopoverHeader py="20px" px="16px" border="none">
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
                <HStack spacing="10.67px">
                  {Tabs.map((item) => (
                    <Text
                      role="button"
                      color={
                        item.label === activeTab ? 'primary.500' : 'neutral.600'
                      }
                      pb="9px"
                      borderBottom={
                        item.label === activeTab ? '2px solid #0E2642' : 'none'
                      }
                      onClick={() => setActiveTab(item.label)}
                    >
                      {item.label}
                      {item.count > 0 ? `(${item.count})` : ''}
                    </Text>
                  ))}
                </HStack>
                <Text role="button" fontWeight={800} color="#0366EF">
                  Mark all as read
                </Text>
              </HStack>
            </VStack>
          </PopoverHeader>
          <PopoverBody py="24px" px="20px">
            <Text>Hello</Text>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default NotificationPopover;
