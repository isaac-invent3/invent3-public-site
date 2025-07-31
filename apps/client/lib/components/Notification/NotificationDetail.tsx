import {
  Avatar,
  Flex,
  HStack,
  Icon,
  Text,
  useDisclosure,
} from '@chakra-ui/react';

import { Notification } from '~/lib/interfaces/notification.interfaces';
import { NotificationInfoIcon } from '../CustomIcons';
import moment from 'moment';
import { NOTIFICATION_EVENT_TYPE_ENUM } from '~/lib/utils/constants';
import { useEffect, useState } from 'react';
import { useMarkANotificationAsReadMutation } from '~/lib/redux/services/notification.services';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import { getSession } from 'next-auth/react';
import { findSystemContextDetailById } from '~/lib/hooks/useParseUrl';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '~/lib/redux/hooks';
import { setParsedUrlData } from '~/lib/redux/slices/NoteSlice';

const textStyle = { fontSize: '11px', lineHeight: '100%' };

function formatDate(date: string) {
  const now = moment().utcOffset(0, true).local();
  const inputDate = moment(date).utcOffset(0, true).local();

  if (inputDate.isSame(now, 'day')) {
    return `Today at ${inputDate.format('h:mma')}`;
  } else if (inputDate.isSame(now.clone().subtract(1, 'day'), 'day')) {
    return `Yesterday at ${inputDate.format('h:mma')}`;
  } else {
    return `${inputDate.format('D MMM')} at ${inputDate.format('h:mma')}`;
  }
}

const NotificationText = ({
  notification,
  handleClose,
}: {
  notification: Notification;
  handleClose?: () => void;
}) => {
  const { isRead, firstName, lastName, message, contextId } = notification;
  const keyTextColor = !isRead ? 'black' : 'neutral.600';
  const name =
    firstName || lastName
      ? `${firstName ?? ''} ${lastName ?? ''}`.trim()
      : 'System';
  const systemContextDetails = findSystemContextDetailById(
    notification.systemContextTypeId
  );
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleNavigate = () => {
    if (systemContextDetails?.route && contextId) {
      router.push(
        `/${systemContextDetails?.route}?${systemContextDetails?.slug}=${contextId}`
      );
      if (handleClose) handleClose();
    }
  };

  const handleOpenNote = () => {
    dispatch(
      setParsedUrlData({
        systemContextId: notification.systemContextTypeId,
        contextId: notification.contextId,
      })
    );
    if (handleClose) handleClose();
  };

  switch (notification.notificationEventTypeId) {
    case NOTIFICATION_EVENT_TYPE_ENUM.CREATE:
      return (
        <Text
          color="neutral.600"
          {...textStyle}
          cursor="pointer"
          onClick={handleNavigate}
        >
          <Text color={keyTextColor} as="span" fontWeight={800} {...textStyle}>
            {name}
          </Text>{' '}
          created a new {systemContextDetails?.label}{' '}
          <Text color={keyTextColor} fontWeight={600} as="span" {...textStyle}>
            {message}
          </Text>
        </Text>
      );

    case NOTIFICATION_EVENT_TYPE_ENUM.UPDATE:
      return (
        <Text
          color="neutral.600"
          {...textStyle}
          cursor="pointer"
          onClick={handleNavigate}
        >
          <Text color={keyTextColor} as="span" fontWeight={800} {...textStyle}>
            {name}
          </Text>{' '}
          updated {systemContextDetails?.label}{' '}
          <Text color={keyTextColor} fontWeight={600} as="span" {...textStyle}>
            {message}
          </Text>
        </Text>
      );

    case NOTIFICATION_EVENT_TYPE_ENUM.DELETE:
      return (
        <Text color="neutral.600" {...textStyle}>
          <Text color={keyTextColor} as="span" fontWeight={800} {...textStyle}>
            {name}
          </Text>{' '}
          deleted {systemContextDetails?.label}{' '}
          <Text color={keyTextColor} fontWeight={600} as="span" {...textStyle}>
            {message}
          </Text>
        </Text>
      );

    case NOTIFICATION_EVENT_TYPE_ENUM.SCHEDULE:
      return (
        <Text
          color="neutral.600"
          {...textStyle}
          cursor="pointer"
          onClick={handleNavigate}
        >
          <Text color={keyTextColor} as="span" fontWeight={800} {...textStyle}>
            {name}
          </Text>{' '}
          scheduled the ticket{' '}
          <Text color={keyTextColor} as="span" {...textStyle} fontWeight={600}>
            {message}
          </Text>
        </Text>
      );

    case NOTIFICATION_EVENT_TYPE_ENUM.ASSIGNED:
      return (
        <Text
          color="neutral.600"
          {...textStyle}
          cursor="pointer"
          onClick={handleNavigate}
        >
          A new ticket{' '}
          <Text color={keyTextColor} as="span" fontWeight={800} {...textStyle}>
            {message}
          </Text>{' '}
          has been assigned to you.
        </Text>
      );
    case NOTIFICATION_EVENT_TYPE_ENUM.TAG:
      return (
        <Text
          color="neutral.600"
          {...textStyle}
          cursor="pointer"
          onClick={handleOpenNote}
        >
          <Text color={keyTextColor} as="span" fontWeight={800} {...textStyle}>
            {name}
          </Text>{' '}
          tagged you to a {systemContextDetails?.label}:{' '}
          <Text color={keyTextColor} fontWeight={600} as="span" {...textStyle}>
            {message}
          </Text>
        </Text>
      );
    case NOTIFICATION_EVENT_TYPE_ENUM.ADD:
      return (
        <Text color="neutral.600" {...textStyle} cursor="pointer">
          <Text color={keyTextColor} as="span" fontWeight={800} {...textStyle}>
            {name}
          </Text>{' '}
          was added to the
          <Text color={keyTextColor} fontWeight={600} as="span" {...textStyle}>
            {message}
          </Text>
          {''}
          {systemContextDetails?.label}
        </Text>
      );

    default:
      return (
        <Text color="neutral.600" {...textStyle}>
          {notification.message}
        </Text>
      );
  }
};

interface NotificationDetailProps {
  notification: Notification;
  handleClose?: () => void;
}
const NotificationDetail = (props: NotificationDetailProps) => {
  const { notification, handleClose } = props;
  const [isRead, setIsRead] = useState(notification.isRead);
  const { firstName, lastName, dateCreated } = notification;
  const name = `${firstName} ${lastName}`;
  const [markNotificationAsRead, { isLoading }] =
    useMarkANotificationAsReadMutation();
  const { handleSubmit } = useCustomMutation();
  const {
    isOpen: isOpenNote,
    onClose: onCloseNote,
    onOpen: onOpenNote,
  } = useDisclosure();

  const handleMarkNotificationAsRead = async () => {
    const data = await getSession();
    const response = await handleSubmit(
      markNotificationAsRead,
      {
        notificationId: notification.notificationId,
        lastModifiedBy: data?.user?.username!,
      },
      ''
    );
    if (response?.data) {
      setIsRead(true);
    }
  };

  useEffect(() => {
    if (notification) {
      setIsRead(notification.isRead);
    }
  }, [notification]);

  return (
    <>
      <HStack
        width="full"
        justifyContent="space-between"
        pb="10.67px"
        borderColor="#BBBBBB"
        borderBottomWidth="0.67px"
        alignItems="flex-start"
        cursor="pointer"
        opacity={isLoading ? 0.6 : 1}
        onClick={() => {
          if (!isRead) {
            handleMarkNotificationAsRead();
          }
        }}
      >
        <HStack spacing="10.67px" maxW="70%" alignItems="flex-start">
          <Flex
            width="6px"
            height="6px"
            rounded="full"
            bgColor="#17A1FA"
            flexShrink={0}
            visibility={isRead ? 'hidden' : 'visible'}
            mt="8px"
          />
          <HStack spacing="10.67px" alignItems="flex-start">
            {name ? (
              <Avatar width="26.67px" height="26.67px" />
            ) : (
              <Flex
                flexShrink={0}
                width="26.67px"
                height="26.67px"
                rounded="full"
                bgColor="#DEDEDE"
                justifyContent="center"
                alignItems="center"
              >
                <Icon as={NotificationInfoIcon} boxSize="16px" />
              </Flex>
            )}
            <NotificationText
              notification={notification}
              handleClose={handleClose}
            />
          </HStack>
        </HStack>
        <Text color="neutral.600" {...textStyle} whiteSpace="nowrap">
          {formatDate(dateCreated)}
        </Text>
      </HStack>
    </>
  );
};

export default NotificationDetail;
