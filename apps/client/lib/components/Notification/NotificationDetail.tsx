import { Avatar, Flex, HStack, Icon, Text } from '@chakra-ui/react';

import { Notification } from '~/lib/interfaces/notification.interfaces';
import { NotificationInfoIcon } from '../CustomIcons';
import moment from 'moment';
import Link from 'next/link';
import { NOTIFICATION_EVENT_TYPE_ENUM } from '~/lib/utils/constants';

const textStyle = { fontSize: '9.33px', lineHeight: '11.09px' };

function formatDate(date: string) {
  const now = moment();
  const inputDate = moment(date);

  if (inputDate.isSame(now, 'day')) {
    return `Today at ${inputDate.format('h:mma')}`;
  } else if (inputDate.isSame(now.clone().subtract(1, 'day'), 'day')) {
    return `Yesterday at ${inputDate.format('h:mma')}`;
  } else {
    return `${inputDate.format('D MMM')} at ${inputDate.format('h:mma')}`;
  }
}

const NotificationText = ({ notification }: { notification: Notification }) => {
  const { isRead, firstName, lastName, message, contextId } = notification;
  const keyTextColor = !isRead ? 'black' : 'neutral.600';
  const name = `${firstName} ${lastName}`;

  switch (notification.notificationTriggerEventTypeId) {
    case NOTIFICATION_EVENT_TYPE_ENUM.TICKET_CREATED:
      return (
        <Link href={`/ticket-management?id=${contextId}`}>
          <Text color="neutral.600" {...textStyle}>
            <Text
              color={keyTextColor}
              as="span"
              fontWeight={800}
              {...textStyle}
            >
              {name}
            </Text>{' '}
            created a new ticket{' '}
            <Text
              color={keyTextColor}
              fontWeight={600}
              as="span"
              {...textStyle}
            >
              {message}
            </Text>
          </Text>
        </Link>
      );

    case 2:
      return (
        <Link href={`/ticket?id=${contextId}`}>
          <Text color="neutral.600" {...textStyle}>
            A new ticket{' '}
            <Text color={keyTextColor} as="span" {...textStyle}>
              {message}
            </Text>{' '}
            has been assigned to you
          </Text>
        </Link>
      );

    case 3:
      return (
        <Link href={`/ticket?id=${contextId}`}>
          <Text color="neutral.600" {...textStyle}>
            <Text
              color={keyTextColor}
              as="span"
              fontWeight={800}
              {...textStyle}
            >
              {name}
            </Text>{' '}
            scheduled the ticket{' '}
            <Text
              color={keyTextColor}
              as="span"
              {...textStyle}
              fontWeight={600}
            >
              {message}
            </Text>
          </Text>
        </Link>
      );

    case 4:
      return (
        <Link href={`/ticket?id=${contextId}`}>
          <Text color="neutral.600" {...textStyle}>
            A new ticket{' '}
            <Text
              color={keyTextColor}
              as="span"
              fontWeight={800}
              {...textStyle}
            >
              {message}
            </Text>{' '}
            has been assigned to you.
          </Text>
        </Link>
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
}
const NotificationDetail = (props: NotificationDetailProps) => {
  const { notification } = props;
  const { isRead, firstName, lastName, dateCreated } = notification;
  const name = `${firstName} ${lastName}`;

  return (
    <HStack
      width="full"
      justifyContent="space-between"
      pb="10.67px"
      borderColor="#BBBBBB"
      borderBottomWidth="0.67px"
      alignItems="flex-start"
    >
      <HStack spacing="10.67px" maxW="70%">
        <Flex
          width="6px"
          height="6px"
          rounded="full"
          bgColor="#17A1FA"
          flexShrink={0}
          visibility={isRead ? 'hidden' : 'visible'}
        />
        <HStack spacing="10.67px">
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
          <NotificationText notification={notification} />
        </HStack>
      </HStack>
      <Text color="neutral.600" {...textStyle} whiteSpace="nowrap">
        {formatDate(dateCreated)}
      </Text>
    </HStack>
  );
};

export default NotificationDetail;
