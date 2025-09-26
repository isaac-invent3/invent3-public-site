import { HStack, Text } from '@chakra-ui/react';
import { CheckBox } from '@repo/ui/components';
import React from 'react';
import { SubModule } from '~/lib/interfaces/module.interfaces';

interface PermissionProps {
  data: SubModule;
  systemModuleContextTypeId: number;
}

export const Permission = (props: PermissionProps) => {
  const { data, systemModuleContextTypeId } = props;
  const { systemSubModuleContextTypeId, subModuleContextTypeName } = data;
  return (
    <HStack alignItems="flex-start" spacing="8px" width="full">
      <CheckBox isChecked={false} />
      <Text color="black" size="md">
        {subModuleContextTypeName}
      </Text>
    </HStack>
  );
};
