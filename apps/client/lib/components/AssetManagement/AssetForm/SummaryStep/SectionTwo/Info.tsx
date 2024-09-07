import { Text, VStack } from '@chakra-ui/react';
import React from 'react';

interface InfoProps {
  label: string;
  value: string | number | React.ReactNode;
}
const Info = (props: InfoProps) => {
  const { label, value } = props;

  return (
    <VStack width="full" spacing="4px" alignItems="flex-start">
      <Text color="neutral.600">{label}</Text>
      <Text size="md" color="black">
        {value}
      </Text>
    </VStack>
  );
};

export default Info;
