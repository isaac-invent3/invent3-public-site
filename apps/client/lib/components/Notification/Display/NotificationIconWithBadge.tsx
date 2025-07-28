import HeaderIcon from '~/lib/layout/ProtectedPage/Header/HeaderIcon';
import {
  NotificationIcon,
  UnreadNotificationIcon,
} from '../../CustomIcons/layout';
import { Flex } from '@chakra-ui/react';
import { useGetNotificationCountQuery } from '~/lib/redux/services/notification.services';
import { useSession } from 'next-auth/react';
import React from 'react';

interface NotificationIconWithBadgeProps {
  handleClick: () => void;
}
const NotificationIconWithBadge = React.forwardRef<
  HTMLDivElement,
  NotificationIconWithBadgeProps
>((props, ref) => {
  const { handleClick, ...rest } = props;

  const session = useSession();
  const { data } = useGetNotificationCountQuery(
    {
      userId: session?.data?.user?.userId!,
    },
    { skip: !session?.data?.user?.userId }
  );
  const unreadCount = data?.data?.unreadNotifications ?? 0;
  return (
    <Flex ref={ref} {...rest}>
      <HeaderIcon
        icon={unreadCount > 0 ? UnreadNotificationIcon : NotificationIcon}
        size="24px"
        handleClick={handleClick}
      />
    </Flex>
  );
});

export default NotificationIconWithBadge;
