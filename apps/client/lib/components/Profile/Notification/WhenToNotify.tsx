import { HStack, Text, VStack } from '@chakra-ui/react';
import { CheckBox } from '@repo/ui/components';
import React, { useState } from 'react';

const INFO = [
  {
    label: 'There is an alert',
    key: 1,
  },
  {
    label:
      'New event created ( eg. when new asset is created or new maintenance plan is created)',
    key: 2,
  },
  {
    label: 'An event is modified or edited',
    key: 3,
  },
];
const WhenToNotify = () => {
  const [allKeys, setKeys] = useState<Record<number, boolean>>({
    1: false,
    2: false,
    3: false,
  });
  return (
    <VStack width="full" alignItems="flex-start" spacing="8px">
      <Text size="md" color="black">
        Notify me when...
      </Text>
      {INFO.map((item) => (
        <HStack spacing="8px">
          <CheckBox
            isChecked={allKeys[item.key] ?? false}
            handleChange={() =>
              setKeys((prev) => ({ ...prev, [item.key]: !allKeys[item.key] }))
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
