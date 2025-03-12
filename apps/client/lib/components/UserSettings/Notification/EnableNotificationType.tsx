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
} from '../utils';
import { updateFormConfigurationOptions } from '~/lib/redux/slices/UserSlice';

const NOTICATION_TYPE = [
  {
    title: 'Mobile Push Notifications',
    subtitle: 'Enable notifications on mobile devices for updates',
    onKey: MOBILE_NOTIFICATION.MOBILE_PUSH_NOTIFICATION_ON,
    offKey: MOBILE_NOTIFICATION.MOBILE_PUSH_NOTIFICATION_OFF,
    typeObject: MOBILE_NOTIFICATION,
  },
  {
    title: 'Desktop Notifications',
    subtitle: 'Receive notifications directly on your desktop',
    onKey: DESKTOP_NOTIFICATION.DESKTOP_NOTIFICATION_ON,
    offKey: DESKTOP_NOTIFICATION.DESKTOP_NOTIFICATION_OFF,
    typeObject: DESKTOP_NOTIFICATION,
  },
  {
    title: 'Email Notifications',
    subtitle: 'Enable notifications on mobile devices for updates',
    onKey: EMAIL_NOTIFICATION.EMAIL_NOTIFICATION_ON,
    offKey: EMAIL_NOTIFICATION.EMAIL_NOTIFICATION_OFF,
    typeObject: EMAIL_NOTIFICATION,
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
            sectionInfoWidth="212px"
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
