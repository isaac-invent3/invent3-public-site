import React from 'react';
import SectionWrapper from '../Common/SectionWrapper';
import { VStack } from '@chakra-ui/react';
import NotificationRadioGroup from './NotificationRadioGroup';
import { APPROVAL_NOTIFICATION } from '../utils';

const INFO = [
  {
    title: 'Do not nofity me',
    subtitle: '',
    key: APPROVAL_NOTIFICATION.APPROVAL_NO_NOTIFICATIONS,
  },
  {
    title: 'Mentions only',
    subtitle: 'Only notify me if the approval is directed to me.',
    key: APPROVAL_NOTIFICATION.APPROVAL_MENTIONS_ONLY,
  },
  {
    title: 'All Approvals',
    subtitle: 'Notify me to for all approvals',
    key: APPROVAL_NOTIFICATION.APPROVAL_ALL,
  },
];

const Approvals = () => {
  return (
    <SectionWrapper
      title="Approvals"
      subtitle="These are notifications from approval workflow"
      sectionInfoWidth="280px"
      justifyContent="flex-start"
      spacing={{ base: '16px', md: '20%' }}
      direction={{ base: 'column', md: 'row' }}
    >
      <VStack alignItems="flex-start" spacing="16px" width="full">
        <NotificationRadioGroup
          data={INFO}
          optionsObject={APPROVAL_NOTIFICATION}
          defaultOption={APPROVAL_NOTIFICATION.APPROVAL_NO_NOTIFICATIONS}
        />
      </VStack>
    </SectionWrapper>
  );
};

export default Approvals;
