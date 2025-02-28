import { Switch, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import SectionWrapper from '../../UserSettings/Common/SectionWrapper';
import { useFormikContext } from 'formik';
import { Settings } from '~/lib/interfaces/settings.interfaces';

const NOTICATION_TYPE = [
  {
    title: 'Email Notifications',
    subtitle: 'Stay updated with important messages',
    name: 'emailNotifications',
  },
  {
    title: 'Push Notifications',
    subtitle: 'Instant alerts for real-time updates',
    name: 'pushNotifications',
  },
  {
    title: 'SMS Notifications',
    subtitle: 'Quick reminders straight to phone',
    name: 'smsNotifications',
  },
];
const Preferences = () => {
  const { setFieldValue, values } = useFormikContext<Settings>();
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
              <Switch
                size="sm"
                isChecked={
                  values[
                    item.name as
                      | 'emailNotifications'
                      | 'pushNotifications'
                      | 'smsnotifications'
                  ]
                }
                onChange={() =>
                  setFieldValue(
                    item.name as
                      | 'emailNotifications'
                      | 'pushNotifications'
                      | 'smsnotifications',
                    !values[
                      item.name as
                        | 'emailNotifications'
                        | 'pushNotifications'
                        | 'smsnotifications'
                    ]
                  )
                }
              />
            </SectionWrapper>
          );
        })}
      </VStack>
    </VStack>
  );
};

export default Preferences;
