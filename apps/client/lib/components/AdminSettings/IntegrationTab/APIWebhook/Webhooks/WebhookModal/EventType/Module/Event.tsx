import { HStack, Text } from '@chakra-ui/react';
import { CheckBox } from '@repo/ui/components';
import React from 'react';
import { checkIfModuleIsSelected } from '~/lib/components/RoleManagement/utils';
import { SubModule } from '~/lib/interfaces/module.interfaces';
import { useAppDispatch, useAppSelector } from '~/lib/redux/hooks';
import { updateFormRoleModules } from '~/lib/redux/slices/RoleSlice';

interface PermissionProps {
  data: SubModule;
  systemModuleContextTypeId: number;
}

export const Permission = (props: PermissionProps) => {
  const { data, systemModuleContextTypeId } = props;
  const { systemSubModuleContextTypeId, subModuleContextTypeName } = data;
  const dispatch = useAppDispatch();
  const formRoleModules = useAppSelector((state) => state.role.formRoleModules);

  return (
    <HStack alignItems="flex-start" spacing="8px" width="full">
      <CheckBox
        isChecked={checkIfModuleIsSelected(formRoleModules, {
          systemModuleContextTypeId,
          systemSubModuleContextTypeId,
        })}
        handleChange={() =>
          dispatch(
            updateFormRoleModules({
              roleSystemModuleContextPermissionId: null,
              systemModuleContextTypeId,
              systemSubModuleContextTypeId,
            })
          )
        }
      />
      <Text color="black" size="md">
        {subModuleContextTypeName}
      </Text>
    </HStack>
  );
};
