import React, { useState } from 'react';
import SectionWrapper from '../Common/SectionWrapper';
import { VStack } from '@chakra-ui/react';
import NotificationRadioGroup from './NotificationRadioGroup';

const INFO = [
  {
    title: 'Do not nofity me',
    subtitle: '',
    key: 1,
  },
  {
    title: 'Mentions only',
    subtitle: 'Only notify me if I’m mentioned in a note',
    key: 2,
  },
  {
    title: 'All Notes',
    subtitle: 'Notify me for all notes',
    key: 3,
  },
];

const Notes = () => {
  const [markedKey, setMarkedKey] = useState<number | null>(
    INFO?.[0]?.key ?? null
  );
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
          selectedOption={markedKey}
          handleSelect={setMarkedKey}
        />
      </VStack>
    </SectionWrapper>
  );
};

export default Notes;
