import { Text, VStack } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import { useGetUserNotificationQuery } from '~/lib/redux/services/notification.services';
import { DEFAULT_PAGE_SIZE } from '~/lib/utils/constants';
import NotifcationSkeletion from '../NotifcationSkeletion';
import NotificationDetail from '../NotificationDetail';
import InfiniteScroll from 'react-infinite-scroll-component';
import { LoadingSpinner } from '@repo/ui/components';
import { useEffect, useState } from 'react';
import { Notification } from '~/lib/interfaces/notification.interfaces';

export const AllNotifications = ({
  handleClose,
}: {
  handleClose?: () => void;
}) => {
  const session = useSession();
  const [pageNumber, setPageNumber] = useState(1);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const { data, isLoading, isFetching } = useGetUserNotificationQuery(
    {
      pageSize: DEFAULT_PAGE_SIZE,
      pageNumber,
      userId: session?.data?.user?.userId!,
    },
    { skip: !session?.data?.user?.userId }
  );

  useEffect(() => {
    if (data?.data?.items) {
      setNotifications((prev) => [...prev, ...data.data.items]);
    }
  }, [data]);

  if (isLoading) {
    return <NotifcationSkeletion noOfskeleton={7} />;
  }

  return (
    <InfiniteScroll
      dataLength={notifications.length}
      next={() => {
        setPageNumber((prev) => prev + 1);
      }}
      hasMore={(data?.data && data?.data?.hasNextPage) ?? false}
      scrollableTarget="notificationsDiv"
      loader={<LoadingSpinner size="md" customStyle={{ mt: '8px' }} />}
      style={{ overflow: 'hidden' }}
    >
      {notifications.length < 1 ? (
        <Text
          width="full"
          textAlign="center"
          color="neutral.600"
          my="10vh"
          size="md"
        >
          No Notifications at the moment
        </Text>
      ) : (
        <VStack width="full" alignItems="flex-start" spacing="16.33px">
          {notifications.map((notification, index) => (
            <NotificationDetail
              notification={notification}
              key={index}
              handleClose={handleClose}
            />
          ))}
        </VStack>
      )}
    </InfiniteScroll>
  );
};
