import { Switch, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import SectionWrapper from '../../UserSettings/Common/SectionWrapper';
import { useFormikContext } from 'formik';
import { Settings } from '~/lib/interfaces/settings.interfaces';

type KeyType =
  | 'emailNotifications'
  | 'pushNotifications'
  | 'smsnotifications'
  | 'whatsappNotifications';

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
    name: 'smsnotifications',
  },
  {
    title: 'Whatsapp Notifications',
    subtitle:
      'Receive updates and alerts via Whatsapp. (Ensure the phone number on your profile is Whatsapp enabled.)',
    name: 'WhatsappNotifications',
  },
  {
    title: 'Webhook Notifications',
    subtitle: 'Allow Notifications for a third-party',
    name: 'WhatsappNotifications',
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
              sectionInfoWidth="547px"
              key={index}
            >
              <Switch
                size="sm"
                isChecked={values[item.name as KeyType]}
                onChange={() =>
                  setFieldValue(
                    item.name as KeyType,
                    !values[item.name as KeyType]
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
