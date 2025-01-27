import { HStack, Switch, Text, VStack } from '@chakra-ui/react';
import React from 'react';

interface PermissionProps {
  title: string;
  description: string;
  keyName: string;
  isChecked?: boolean;
}

export const Permission = (props: PermissionProps) => {
  const { title, description, isChecked } = props;
  return (
    <HStack spacing="101px" alignItems="flex-start">
      <VStack alignItems="flex-start" spacing="8px" maxW="238px">
        <Text color="black" size="md">
          {title}
        </Text>
        <Text color="neutral.600">{description}</Text>
      </VStack>
      <Switch size="md" isChecked={isChecked} />
    </HStack>
  );
};
