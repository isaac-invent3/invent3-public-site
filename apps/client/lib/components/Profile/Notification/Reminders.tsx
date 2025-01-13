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
    title: 'Important Reminders only',
    subtitle: 'Only notify me if the reminder is tagged as important',
    key: 2,
  },
  {
    title: 'All Reminders',
    subtitle: 'Notify me for all reminders',
    key: 3,
  },
];

const Reminders = () => {
  const [markedKey, setMarkedKey] = useState<number | null>(
    INFO?.[0]?.key ?? null
  );
  return (
    <SectionWrapper
      title="Reminders"
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

export default Reminders;
