import { DrawerBody, DrawerHeader, Text, VStack } from '@chakra-ui/react';
import { GenericDrawer } from '@repo/ui/components';
import React from 'react';
import NotificationHeader from '../NotificationHeader';
import { NotifcationTabs } from '../Tabs';

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  isLoading: boolean;
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
  handleMarkNotificationsAsRead: () => void;
}
const NotificationDrawer = (props: NotificationDrawerProps) => {
  const {
    isOpen,
    onClose,
    isLoading,
    activeTab,
    setActiveTab,
    handleMarkNotificationsAsRead,
  } = props;

  return (
    <GenericDrawer isOpen={isOpen} onClose={onClose}>
      <DrawerHeader m={0} p="16px">
        <VStack width="full" alignItems="flex-end" spacing="16px">
          <Text size="md" color="#F50000" as="button" onClick={onClose}>
            Close
          </Text>
          <NotificationHeader
            isLoading={isLoading}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            handleMarkNotificationsAsRead={handleMarkNotificationsAsRead}
          />
        </VStack>
      </DrawerHeader>
      <DrawerBody m={0} p={'16px'}>
        {isOpen && <NotifcationTabs activeTab={activeTab} />}
      </DrawerBody>
    </GenericDrawer>
  );
};

export default NotificationDrawer;
