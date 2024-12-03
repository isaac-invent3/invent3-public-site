import { Text, VStack } from '@chakra-ui/react';
import React from 'react';
import MOCK_NOTIFICATION from '~/lib/utils/MockData/notification';
import NotificationDetail from '../NotificationDetail';

const textStyle = { fontSize: '9.33px', lineHeight: '11.09px' };
export const NotifcationTabs = () => {
  return (
    <VStack width="full" alignItems="flex-start" spacing="31.67px">
      <VStack width="full" alignItems="flex-start" spacing="16.33px">
        <Text color="neutral.600" {...textStyle}>
          Last 7 days
        </Text>
        <VStack width="full" alignItems="flex-start">
          {MOCK_NOTIFICATION.slice(0, 4).map((notification, index) => (
            <NotificationDetail notification={notification} key={index} />
          ))}
        </VStack>
      </VStack>
      <VStack width="full" alignItems="flex-start" spacing="16.33px">
        <Text color="neutral.600" {...textStyle}>
          Last 30 days
        </Text>
        <VStack width="full" alignItems="flex-start">
          {MOCK_NOTIFICATION.map((notification, index) => (
            <NotificationDetail notification={notification} key={index} />
          ))}
        </VStack>
      </VStack>
    </VStack>
  );
};
