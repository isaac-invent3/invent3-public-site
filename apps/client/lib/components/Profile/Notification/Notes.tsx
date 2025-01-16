import React from 'react';
import SectionWrapper from '../Common/SectionWrapper';
import { VStack } from '@chakra-ui/react';
import NotificationRadioGroup from './NotificationRadioGroup';
import { NOTES_NOTIFICATION } from '../utils';

const INFO = [
  {
    title: 'Do not nofity me',
    subtitle: '',
    key: NOTES_NOTIFICATION.NOTES_NO_NOTIFICATIONS,
  },
  {
    title: 'Mentions only',
    subtitle: 'Only notify me if I’m mentioned in a note',
    key: NOTES_NOTIFICATION.NOTES_MENTIONS_ONLY,
  },
  {
    title: 'All Notes',
    subtitle: 'Notify me for all notes',
    key: NOTES_NOTIFICATION.NOTES_ALL_NOTES,
  },
];

const Notes = () => {
  return (
    <SectionWrapper
      title="Notes"
      subtitle="These are notifications from the notes on the different system context on the platform"
      sectionInfoWidth="280px"
      justifyContent="flex-start"
      spacing="20%"
    >
      <VStack alignItems="flex-start" spacing="16px" width="full">
        <NotificationRadioGroup
          data={INFO}
          optionsObject={NOTES_NOTIFICATION}
          defaultOption={NOTES_NOTIFICATION.NOTES_NO_NOTIFICATIONS}
        />
      </VStack>
    </SectionWrapper>
  );
};

export default Notes;
