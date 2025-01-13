import { HStack, Text, VStack } from '@chakra-ui/react';
import { RadioBox } from '@repo/ui/components';
import React from 'react';

interface NotificationRadioGroupProps {
  data: { title: string; subtitle: string; key: number }[];
  selectedOption: number | null;
  handleSelect: React.Dispatch<React.SetStateAction<number | null>>;
}
const NotificationRadioGroup = (props: NotificationRadioGroupProps) => {
  const { data, selectedOption, handleSelect } = props;
  return data.map((item) => (
    <HStack spacing="18px" alignItems="flex-start" key={item.key}>
      <RadioBox
        isSelected={selectedOption === item.key}
        handleClick={() => handleSelect(item.key)}
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
