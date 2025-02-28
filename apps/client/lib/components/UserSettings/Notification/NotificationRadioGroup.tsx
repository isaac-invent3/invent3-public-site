import { HStack, Text, VStack } from '@chakra-ui/react';
import { RadioBox } from '@repo/ui/components';
import React from 'react';
import { useAppDispatch, useAppSelector } from '~/lib/redux/hooks';
import { filterOptionsById, getSystemConfigurationOptionIds } from '../utils';
import _ from 'lodash';
import { updateFormConfigurationOptions } from '~/lib/redux/slices/UserSlice';

interface NotificationRadioGroupProps {
  data: { title: string; subtitle: string; key: number }[];
  optionsObject: { [name: string]: number };
  defaultOption: number;
}
const NotificationRadioGroup = (props: NotificationRadioGroupProps) => {
  const { data, optionsObject, defaultOption } = props;
  const dispatch = useAppDispatch();
  const formConfigurationOptions = useAppSelector(
    (state) => state.user.formConfigurationOptions
  );
  const existingSystemConfigurationOptionIds = getSystemConfigurationOptionIds(
    formConfigurationOptions
  );

  const existingNotificationId = _.intersection(
    existingSystemConfigurationOptionIds,
    Object.values(optionsObject)
  );

  const selectedOption =
    existingNotificationId.length > 0
      ? existingNotificationId?.[0]
      : defaultOption;

  return data.map((item) => (
    <HStack spacing="18px" alignItems="flex-start" key={item.key}>
      <RadioBox
        isSelected={selectedOption === item.key}
        handleClick={() =>
          dispatch(
            updateFormConfigurationOptions({
              option: item.key,
              optionsToRemove: filterOptionsById(item.key, optionsObject),
            })
          )
        }
        borderColor="blue.500"
        boxStyle={{ bgColor: 'blue.500' }}
      />
      <VStack alignItems="flex-start" spacing="8px">
        <Text size="md" color="black">
          {item.title}
        </Text>
        <Text color="neutral.600" fontWeight={400}>
          {item.subtitle}
        </Text>
      </VStack>
    </HStack>
  ));
};

export default NotificationRadioGroup;
