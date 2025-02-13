import { Switch, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import SectionWrapper from '../../Profile/Common/SectionWrapper';

const NOTICATION_TYPE = [
  {
    title: 'Email Notifications',
    subtitle: 'Stay updated with important messages',
  },
  {
    title: 'Push Notifications',
    subtitle: 'Instant alerts for real-time updates',
  },
  {
    title: 'SMS Notifications',
    subtitle: 'Quick reminders straight to phone',
  },
];
const Preferences = () => {
  return (
    <VStack spacing="24px" width="full" alignItems="flex-start">
      <Text fontWeight={700} size="lg">
        Notification Preferences
      </Text>
      <VStack width="full" alignItems="flex-start" spacing="16px">
        {NOTICATION_TYPE.map((item, index) => {
          return (
            <SectionWrapper
              title={item.title}
              subtitle={item.subtitle}
              sectionInfoWidth="212px"
              key={index}
            >
              <Switch size="sm" isChecked={false} onChange={() => {}} />
            </SectionWrapper>
          );
        })}
      </VStack>
    </VStack>
  );
};

export default Preferences;
