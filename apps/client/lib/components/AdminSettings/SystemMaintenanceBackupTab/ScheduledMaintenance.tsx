import { HStack, Switch, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import SectionWrapper from '../../UserSettings/Common/SectionWrapper';
import { DateTimeButtons } from '@repo/ui/components';

const NotificationPreferences = ['Email', 'SMS', 'In App Alert'];
const ScheduledMaintenance = () => {
  return (
    <VStack spacing="24px" width="full" alignItems="flex-start">
      <Text fontWeight={700} size="lg">
        Scheduled Maintenance
      </Text>
      <VStack width="full" alignItems="flex-start" spacing="24px">
        <SectionWrapper
          title="Next Scheduled Maintenance Date"
          subtitle="Track upcoming maintenance tasks easily"
        >
          <DateTimeButtons
            buttonVariant="secondary"
            includeTime={false}
            customDateHeader="Date"
            customButtonLabel="Custom"
            showPredefinedDates
          />
        </SectionWrapper>
        <SectionWrapper
          title="Downtime Notification Preferences"
          subtitle="Set alerts for system downtimes instantly"
          spacing={{ base: '8px', sm: '24px' }}
          direction={{ base: 'column', sm: 'row' }}
        >
          <VStack spacing="16px">
            {NotificationPreferences.map((item, index) => (
              <HStack spacing="27px" key={index}>
                <Text color="primary.500" minW="64px">
                  {item}
                </Text>
                <Switch size="sm" isChecked />
              </HStack>
            ))}
          </VStack>
        </SectionWrapper>
      </VStack>
    </VStack>
  );
};

export default ScheduledMaintenance;
