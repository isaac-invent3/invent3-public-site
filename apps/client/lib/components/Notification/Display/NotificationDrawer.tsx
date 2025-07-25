import { DrawerBody, DrawerHeader, Text, VStack } from '@chakra-ui/react';
import { GenericDrawer } from '@repo/ui/components';
import React from 'react';
import NotificationHeader from '../NotificationHeader';
import { NotifcationTabs } from '../Tabs';
import { NotificationTabType } from '~/lib/interfaces/notification.interfaces';

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  isLoading: boolean;
  activeTab: NotificationTabType;
  setActiveTab: React.Dispatch<React.SetStateAction<NotificationTabType>>;
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
      <DrawerBody m={0} p={'16px'} id="notificationsDiv">
        {isOpen && (
          <NotifcationTabs activeTab={activeTab} handleClose={onClose} />
        )}
      </DrawerBody>
    </GenericDrawer>
  );
};

export default NotificationDrawer;
