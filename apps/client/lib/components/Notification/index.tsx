import { useDisclosure, useMediaQuery } from '@chakra-ui/react';
import { getSession } from 'next-auth/react';
import { useState } from 'react';
import {
  NotificationIcon,
  PreferenceIcon,
} from '~/lib/components/CustomIcons/layout';
// import useSignalR from '~/lib/hooks/useSignalR';
// import useSignalREventHandler from '~/lib/hooks/useSignalREventHandler';
import HeaderIcon from '~/lib/layout/ProtectedPage/Header/HeaderIcon';
import { useMarkAllNotificationsAsReadMutation } from '~/lib/redux/services/notification.services';
import NotificationPopover from './Display/NotificationPopover';
import NotificationDrawer from './Display/NotificationDrawer';

const NotificationComponents = () => {
  const {
    isOpen: isOpenPopover,
    onOpen: onOpenPopover,
    onClose: onClosePopover,
  } = useDisclosure();
  const {
    isOpen: isOpenDrawer,
    onOpen: onOpenDrawer,
    onClose: onCloseDrawer,
  } = useDisclosure();
  const [activeTab, setActiveTab] = useState('All');
  const [isMobile] = useMediaQuery('(max-width: 480px)');
  // const connectionState = useSignalR('asset-hub');

  // useSignalREventHandler({
  //   callback: (message) => console.log(message),
  //   eventName: 'ReceiveAsset',
  //   connectionState,
  // });
  const [markAllAsReadMutation, { isLoading }] =
    useMarkAllNotificationsAsReadMutation();

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
      {isMobile && (
        <HeaderIcon
          icon={NotificationIcon}
          size="24px"
          handleClick={onOpenDrawer}
        />
      )}
      {!isMobile && (
        <NotificationPopover
          isOpen={isOpenPopover}
          onOpen={onOpenPopover}
          onClose={onClosePopover}
          isLoading={isLoading}
          handleMarkNotificationsAsRead={handleMarkNotificationsAsRead}
          setActiveTab={setActiveTab}
          activeTab={activeTab}
        />
      )}
      {isMobile && (
        <NotificationDrawer
          isOpen={isOpenDrawer}
          onClose={onCloseDrawer}
          isLoading={isLoading}
          handleMarkNotificationsAsRead={handleMarkNotificationsAsRead}
          setActiveTab={setActiveTab}
          activeTab={activeTab}
        />
      )}
    </>
  );
};

export default NotificationComponents;
