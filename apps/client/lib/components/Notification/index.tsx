import { useDisclosure, useMediaQuery } from '@chakra-ui/react';
import { getSession } from 'next-auth/react';
import { useState } from 'react';
import { NotificationIcon } from '~/lib/components/CustomIcons/layout';
import useSignalR from '~/lib/hooks/useSignalR';
import useSignalREventHandler from '~/lib/hooks/useSignalREventHandler';
import HeaderIcon from '~/lib/layout/ProtectedPage/Header/HeaderIcon';
import { useMarkAllNotificationsAsReadMutation } from '~/lib/redux/services/notification.services';
import NotificationPopover from './Display/NotificationPopover';
import NotificationDrawer from './Display/NotificationDrawer';
// import addNotification from 'react-push-notification';

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

  // SignalR Connection
  const connectionState = useSignalR('notification-hub');

  useSignalREventHandler({
    eventName: 'ReceiveNotification',
    connectionState,
    callback: (notification) => {
      console.log('Notification received:', notification);
    },
  });

  // const buttonClick = () => {
  //   addNotification({
  //     title: 'Warning',
  //     subtitle: 'This is a subtitle',
  //     message: 'This is a very long message',
  //     theme: 'darkblue',
  //     native: true, // when using native, your OS will handle theming.
  //   });
  // };

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
          onOpen={() => {
            // buttonClick();
            onOpenPopover();
          }}
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
