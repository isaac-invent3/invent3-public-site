import { HStack, Text, VStack } from '@chakra-ui/react';
import { CheckBox } from '@repo/ui/components';
import React from 'react';
import { getSystemConfigurationOptionIds, NOTIFY_ME_WHEN } from '../utils';
import { useAppDispatch, useAppSelector } from '~/lib/redux/hooks';
import { updateFormConfigurationOptions } from '~/lib/redux/slices/UserSlice';

const INFO = [
  {
    label: 'There is an alert',
    key: NOTIFY_ME_WHEN.NOTIFY_ALERT,
  },
  {
    label:
      'New event created ( eg. when new asset is created or new maintenance plan is created)',
    key: NOTIFY_ME_WHEN.NOTIFY_NEW_EVENT_CREATED,
  },
  {
    label: 'An event is modified or edited',
    key: NOTIFY_ME_WHEN.NOTIFY_EVENT_MODIFIED,
  },
];
const WhenToNotify = () => {
  const formConfigurationOptions = useAppSelector(
    (state) => state.user.formConfigurationOptions
  );
  const dispatch = useAppDispatch();

  return (
    <VStack width="full" alignItems="flex-start" spacing="8px">
      <Text size="md" color="black">
        Notify me when...
      </Text>
      {INFO.map((item, index) => (
        <HStack spacing="8px" key={index}>
          <CheckBox
            isChecked={getSystemConfigurationOptionIds(
              formConfigurationOptions
            ).includes(item.key)}
            handleChange={() =>
              dispatch(updateFormConfigurationOptions({ option: item.key }))
            }
          />
          <Text fontWeight={400} color="neutral.600">
            {item.label}
          </Text>
        </HStack>
      ))}
    </VStack>
  );
};

export default WhenToNotify;
