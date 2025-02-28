import React from 'react';
import SectionWrapper from '../Common/SectionWrapper';
import { VStack } from '@chakra-ui/react';
import NotificationRadioGroup from './NotificationRadioGroup';
import { REMINDERS_NOTIFICATION } from '../utils';

const INFO = [
  {
    title: 'Do not nofity me',
    subtitle: '',
    key: REMINDERS_NOTIFICATION.REMINDERS_NO_NOTIFICATIONS,
  },
  {
    title: 'Important Reminders only',
    subtitle: 'Only notify me if the reminder is tagged as important',
    key: REMINDERS_NOTIFICATION.REMINDERS_IMPORTANT_ONLY,
  },
  {
    title: 'All Reminders',
    subtitle: 'Notify me for all reminders',
    key: REMINDERS_NOTIFICATION.REMINDERS_ALL,
  },
];

const Reminders = () => {
  return (
    <SectionWrapper
      title="Reminders"
      subtitle="These are notifications from the notes on the different system context on the platform"
      sectionInfoWidth="280px"
      justifyContent="flex-start"
      spacing={{ base: '16px', md: '20%' }}
      direction={{ base: 'column', md: 'row' }}
    >
      <VStack alignItems="flex-start" spacing="16px" width="full">
        <NotificationRadioGroup
          data={INFO}
          optionsObject={REMINDERS_NOTIFICATION}
          defaultOption={REMINDERS_NOTIFICATION.REMINDERS_NO_NOTIFICATIONS}
        />
      </VStack>
    </SectionWrapper>
  );
};

export default Reminders;
