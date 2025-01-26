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
    subtitle: 'Only notify me if the approval is directed to me.',
    key: 2,
  },
  {
    title: 'All Approvals',
    subtitle: 'Notify me to for all approvals',
    key: 3,
  },
];ap

const Approvals = () => {
  const [markedKey, setMarkedKey] = useState<number | null>(
    INFO?.[0]?.key ?? null
  );
  return (
    <SectionWrapper
      title="Approvals"
      subtitle="These are notifications from approval workflow"
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

export default Approvals;
