import { Switch, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import SectionWrapper from '../../Profile/Common/SectionWrapper';

const NOTICATION_TYPE = [
  {
    title: 'Asset Maintenance Due',
    subtitle: 'Schedule service to avoid downtime',
  },
  {
    title: 'Compliance Violation',
    subtitle: 'Immediate action required for compliance',
  },
  {
    title: 'New User Added',
    subtitle: 'A new team member onboarded',
  },
  {
    title: 'Subscription Expiring Soon',
    subtitle: 'Renew now to avoid disruption',
  },
];
const AlertConfiguration = () => {
  return (
    <VStack spacing="24px" width="full" alignItems="flex-start">
      <Text fontWeight={700} size="lg">
        Alert Configuration
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

export default AlertConfiguration;
