import { Switch, VStack } from '@chakra-ui/react';
import React from 'react';
import SectionWrapper from '../Common/SectionWrapper';
import { useAppDispatch, useAppSelector } from '~/lib/redux/hooks';
import {
  DESKTOP_NOTIFICATION,
  EMAIL_NOTIFICATION,
  filterOptionsById,
  getSystemConfigurationOptionIds,
  MOBILE_NOTIFICATION,
  WHATSAPP_NOTIFICATION,
} from '../utils';
import { updateFormConfigurationOptions } from '~/lib/redux/slices/UserSlice';

const NOTICATION_TYPE = [
  {
    title: 'Push Notifications',
    subtitle: 'Enable notifications on mobile and desktop devices for updates',
    onKey: MOBILE_NOTIFICATION.MOBILE_PUSH_NOTIFICATION_ON,
    offKey: MOBILE_NOTIFICATION.MOBILE_PUSH_NOTIFICATION_OFF,
    typeObject: MOBILE_NOTIFICATION,
  },
  {
    title: 'SMS Notifications',
    subtitle: 'Receive notifications directly via SMS',
    onKey: DESKTOP_NOTIFICATION.DESKTOP_NOTIFICATION_ON,
    offKey: DESKTOP_NOTIFICATION.DESKTOP_NOTIFICATION_OFF,
    typeObject: DESKTOP_NOTIFICATION,
  },
  // {
  //   title: 'Desktop Notifications',
  //   subtitle: 'Receive notifications directly on your desktop',
  //   onKey: DESKTOP_NOTIFICATION.DESKTOP_NOTIFICATION_ON,
  //   offKey: DESKTOP_NOTIFICATION.DESKTOP_NOTIFICATION_OFF,
  //   typeObject: DESKTOP_NOTIFICATION,
  // },
  {
    title: 'Email Notifications',
    subtitle: 'Receive updates and alerts via email',
    onKey: EMAIL_NOTIFICATION.EMAIL_NOTIFICATION_ON,
    offKey: EMAIL_NOTIFICATION.EMAIL_NOTIFICATION_OFF,
    typeObject: EMAIL_NOTIFICATION,
  },
  {
    title: 'Whatsapp Notifications',
    subtitle: [
      'Receive updates and alerts via Whatsapp.',
      ['(Ensure the phone number on your profile is Whatsapp enabled.)'],
    ],
    onKey: WHATSAPP_NOTIFICATION.WHATSAPP_NOTIFICATION_ON,
    offKey: WHATSAPP_NOTIFICATION.WHATSAPP_NOTIFICATION_OFF,
    typeObject: WHATSAPP_NOTIFICATION,
  },
];
const EnableNotificationType = () => {
  const formConfigurationOptions = useAppSelector(
    (state) => state.user.formConfigurationOptions
  );
  const existingSystemConfigurationOptionIds = getSystemConfigurationOptionIds(
    formConfigurationOptions
  );
  const dispatch = useAppDispatch();

  const handleToggleNotificationType = ({
    option,
    notificationObject,
  }: {
    option: number;
    notificationObject: { [name: string]: number };
  }) => {
    dispatch(
      updateFormConfigurationOptions({
        option,
        optionsToRemove: filterOptionsById(option, notificationObject),
      })
    );
  };

  return (
    <VStack width="full" alignItems="flex-start" spacing="24px">
      {NOTICATION_TYPE.map((item, index) => {
        const isOn = existingSystemConfigurationOptionIds.includes(item.onKey);
        return (
          <SectionWrapper
            title={item.title}
            subtitle={item.subtitle}
            sectionInfoWidth="325px"
            nestedSubtitleStyle={{ fontStyle: 'italic', color: 'neutral.700' }}
            key={index}
          >
            <Switch
              size="sm"
              isChecked={existingSystemConfigurationOptionIds.includes(
                item.onKey
              )}
              onChange={() =>
                handleToggleNotificationType({
                  option: isOn ? item.offKey : item.onKey,
                  notificationObject: item.typeObject,
                })
              }
            />
          </SectionWrapper>
        );
      })}
    </VStack>
  );
};

export default EnableNotificationType;
