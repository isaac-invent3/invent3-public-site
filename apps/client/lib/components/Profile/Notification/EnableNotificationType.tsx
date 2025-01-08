import { Switch, VStack } from '@chakra-ui/react';
import React from 'react';
import SectionWrapper from '../Common/SectionWrapper';

const EnableNotificationType = () => {
  return (
    <VStack width="full" alignItems="flex-start" spacing="24px">
      <SectionWrapper
        title="Mobile Push Notifications"
        subtitle="Enable notifications on mobile devices for updates"
        sectionInfoWidth="212px"
      >
        <Switch size="sm" />
      </SectionWrapper>
      <SectionWrapper
        title="Desktop Notifications"
        subtitle="Receive notifications directly on your desktop"
        sectionInfoWidth="212px"
      >
        <Switch size="sm" />
      </SectionWrapper>
      <SectionWrapper
        title="Email Notifications"
        subtitle="Receive updates and alerts via email"
        sectionInfoWidth="212px"
      >
        <Switch size="sm" />
      </SectionWrapper>
    </VStack>
  );
};

export default EnableNotificationType;
