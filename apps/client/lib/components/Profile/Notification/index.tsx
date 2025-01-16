import { Divider, VStack } from '@chakra-ui/react';
import React from 'react';
import WhenToNotify from './WhenToNotify';
import EnableNotificationType from './EnableNotificationType';
import Notes from './Notes';
import Reminders from './Reminders';
import Approvals from './Approvals';
import useUpdateConfigurationOptions from '../Common/useUpdateConfigurationOptions';

const Notification = () => {
  const { submitButton } = useUpdateConfigurationOptions();
  return (
    <VStack spacing="24px" width="full" alignItems="flex-end">
      <VStack
        spacing="24px"
        width="full"
        alignItems="flex-start"
        bgColor="white"
        p="24px"
        pt="32px"
        rounded="6px"
        minH="60vh"
        divider={<Divider borderColor="neutral.700" />}
      >
        <WhenToNotify />
        <EnableNotificationType />
        <Notes />
        <Reminders />
        <Approvals />
      </VStack>
      {submitButton}
    </VStack>
  );
};

export default Notification;
