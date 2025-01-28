import { HStack, Switch, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { SubModule } from '~/lib/interfaces/module.interfaces';

interface PermissionProps {
  data: SubModule;
}

export const Permission = (props: PermissionProps) => {
  const { data } = props;
  const { subModuleContextTypeName, description } = data;
  return (
    <HStack spacing="101px" alignItems="flex-start">
      <VStack alignItems="flex-start" spacing="8px" maxW="238px">
        <Text color="black" size="md">
          {subModuleContextTypeName}
        </Text>
        <Text color="neutral.600">{description}</Text>
      </VStack>
      <Switch size="md" isChecked={false} />
    </HStack>
  );
};
