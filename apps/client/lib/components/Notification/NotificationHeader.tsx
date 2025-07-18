import {
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  Icon,
  Spinner,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import { PreferenceIcon } from '../CustomIcons/layout';
import TabButton from './Tabs/TabButton';
import { NotificationTabType } from '~/lib/interfaces/notification.interfaces';

const Tabs: { label: NotificationTabType; count: number }[] = [
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

interface NotificationHeaderProps {
  isLoading: boolean;
  activeTab: NotificationTabType;
  setActiveTab: React.Dispatch<React.SetStateAction<NotificationTabType>>;
  handleMarkNotificationsAsRead: () => void;
}
const NotificationHeader = (props: NotificationHeaderProps) => {
  const { isLoading, activeTab, setActiveTab, handleMarkNotificationsAsRead } =
    props;
  return (
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
            fontSize="12px"
            lineHeight="14.26px"
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
  );
};

export default NotificationHeader;
