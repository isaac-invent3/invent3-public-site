import { HStack, Switch, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { SubModule } from '~/lib/interfaces/module.interfaces';
import { useAppDispatch, useAppSelector } from '~/lib/redux/hooks';
import { checkIfModuleIsSelected } from '../../utils';
import { updateFormRoleModules } from '~/lib/redux/slices/RoleSlice';

interface PermissionProps {
  data: SubModule;
  systemModuleContextTypeId: number;
}

export const Permission = (props: PermissionProps) => {
  const { data, systemModuleContextTypeId } = props;
  const {
    systemSubModuleContextTypeId,
    subModuleContextTypeName,
    description,
  } = data;
  const dispatch = useAppDispatch();
  const formRoleModules = useAppSelector((state) => state.role.formRoleModules);
  return (
    <HStack alignItems="flex-start" justifyContent="space-between" width="full">
      <VStack alignItems="flex-start" spacing="8px">
        <Text color="black" size="md" maxW="238px">
          {subModuleContextTypeName}
        </Text>
        <Text color="neutral.600">{description}</Text>
      </VStack>
      <Switch
        size="md"
        isChecked={checkIfModuleIsSelected(formRoleModules, {
          systemModuleContextTypeId,
          systemSubModuleContextTypeId,
        })}
        onChange={() =>
          dispatch(
            updateFormRoleModules({
              roleSystemModuleContextPermissionId: null,
              systemModuleContextTypeId,
              systemSubModuleContextTypeId,
            })
          )
        }
      />
    </HStack>
  );
};
