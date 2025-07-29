import { useDisclosure, useMediaQuery } from '@chakra-ui/react';
import { getSession, useSession } from 'next-auth/react';
import { useLayoutEffect, useState } from 'react';
import useSignalR from '~/lib/hooks/useSignalR';
import useSignalREventHandler from '~/lib/hooks/useSignalREventHandler';
import {
  notificationApi,
  useMarkAllNotificationsAsReadMutation,
} from '~/lib/redux/services/notification.services';
import NotificationPopover from './Display/NotificationPopover';
import NotificationDrawer from './Display/NotificationDrawer';
import { useAppDispatch } from '~/lib/redux/hooks';
import { DEFAULT_PAGE_SIZE } from '~/lib/utils/constants';
import { NotificationTabType } from '~/lib/interfaces/notification.interfaces';
import NotificationIconWithBadge from './Display/NotificationIconWithBadge';

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
  const [activeTab, setActiveTab] = useState<NotificationTabType>('All');
  const [isMobile] = useMediaQuery('(max-width: 480px)');
  const [markAllAsReadMutation, { isLoading }] =
    useMarkAllNotificationsAsReadMutation();
  const dispatch = useAppDispatch();
  const session = useSession();

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
    callback: (newNotification) => {
      // Update the query cache when a new notification is received
      const parsedNotification = JSON.parse(newNotification);
      dispatch(
        notificationApi.util.updateQueryData(
          'getUserNotification',
          {
            pageNumber: 1,
            pageSize: DEFAULT_PAGE_SIZE,
            userId: session?.data?.user.userId!,
            isRead: activeTab === 'Unread' ? false : undefined,
            isArchived: activeTab === 'Archived' ? true : undefined,
            isAlert: activeTab === 'Alerts' ? true : undefined,
          },
          (draft) => {
            if (draft?.data?.items) {
              draft?.data?.items.unshift(parsedNotification); // Add new notification to the beginning
            }
          }
        )
      );
    },
  });

  useLayoutEffect(() => {
    onClosePopover();
  }, []);

  return (
    <>
      {isMobile && <NotificationIconWithBadge handleClick={onOpenDrawer} />}
      {!isMobile && (
        <NotificationPopover
          isOpen={isOpenPopover}
          onOpen={() => {
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
