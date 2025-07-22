import { Text, VStack } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import { useGetUserNotificationQuery } from '~/lib/redux/services/notification.services';
import { DEFAULT_PAGE_SIZE } from '~/lib/utils/constants';
import NotifcationSkeletion from '../NotifcationSkeletion';
import NotificationDetail from '../NotificationDetail';
// const textStyle = { fontSize: '9.33px', lineHeight: '11.09px' };

export const NotifcationTabs = ({
  activeTab,
  handleClose,
}: {
  activeTab: string;
  handleClose?: () => void;
}) => {
  const session = useSession();

  const { data, isLoading, isFetching } = useGetUserNotificationQuery(
    {
      pageSize: DEFAULT_PAGE_SIZE,
      pageNumber: 1,
      userId: session?.data?.user?.userId!,
      isRead: activeTab === 'Unread' ? false : undefined,
      isArchived: activeTab === 'Archived' ? true : undefined,
      isAlert: activeTab === 'Alerts' ? true : undefined,
    },
    { skip: !session?.data?.user?.userId }
  );

  if (isLoading || isFetching) {
    return <NotifcationSkeletion noOfskeleton={7} />;
  }

  return (
    <VStack width="full" alignItems="flex-start" spacing="31.67px">
      <VStack width="full" alignItems="flex-start" spacing="16.33px">
        {/* <Text color="neutral.600" {...textStyle}>
          Last 7 days
        </Text> */}
        <VStack width="full" alignItems="flex-start">
          {data?.data && data?.data?.items.length < 1 ? (
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
            data?.data?.items.map((notification, index) => (
              <NotificationDetail
                notification={notification}
                key={index}
                handleClose={handleClose}
              />
            ))
          )}
        </VStack>
      </VStack>
      {/* <VStack width="full" alignItems="flex-start" spacing="16.33px">
        <Text color="neutral.600" {...textStyle}>
          Last 30 days
        </Text>
        <VStack width="full" alignItems="flex-start">
          {MOCK_NOTIFICATION.map((notification, index) => (
            <NotificationDetail notification={notification} key={index} />
          ))}
        </VStack>
      </VStack> */}
    </VStack>
  );
};
