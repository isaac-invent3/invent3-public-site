'use client';

import { Flex, HStack, useDisclosure, VStack } from '@chakra-ui/react';
import PageHeader from '../../UI/PageHeader';
import { Role } from '~/lib/interfaces/role.interfaces';
import RoleInfo from './RoleInfo';
import Permissions from '../Permissions';
import { Button, ErrorMessage, GenericSuccessModal } from '@repo/ui/components';
import { FORM_ENUM, ROUTES } from '~/lib/utils/constants';
import { useRouter } from 'next/navigation';
import { useUpdateRoleModulePermissionMutation } from '~/lib/redux/services/role.services';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import { useAppSelector } from '~/lib/redux/hooks';
import { useState } from 'react';
import { getSession } from 'next-auth/react';
import _ from 'lodash';

interface RoleDetailsProps {
  role: Role;
}
const RoleDetails = ({ role }: RoleDetailsProps) => {
  const { initialRoleModules, formRoleModules } = useAppSelector(
    (state) => state.role
  );
  const { handleSubmit } = useCustomMutation();
  const [updateRolePermission, { isLoading }] =
    useUpdateRoleModulePermissionMutation();
  const { isOpen, onOpen } = useDisclosure();
  const [permissionError, setPermissionError] = useState('');
  const router = useRouter();

  const handleUpdateRolePermissions = async () => {
    setPermissionError('');
    if (formRoleModules.length < 1) {
      setPermissionError('Please select a permission');
      return;
    }
    const session = await getSession();
    const username = session?.user?.username;
    // Find deleted permissions
    const deletedPermissions = _.differenceWith(
      initialRoleModules,
      formRoleModules,
      (a, b) =>
        a.systemModuleContextTypeId === b.systemModuleContextTypeId &&
        a.systemSubModuleContextTypeId === b.systemSubModuleContextTypeId
    );

    // Find newly added permissions
    const newPermissions = _.differenceWith(
      formRoleModules,
      initialRoleModules,
      (a, b) =>
        a.systemModuleContextTypeId === b.systemModuleContextTypeId &&
        a.systemSubModuleContextTypeId === b.systemSubModuleContextTypeId
    );
    const newPermissionDtoArray = newPermissions.map((item) => ({
      roleSystemModuleContextPermissionId:
        item.roleSystemModuleContextPermissionId,
      roleId: role.roleId,
      systemModuleContextTypeId: item.systemModuleContextTypeId!,
      systemSubModuleContextTypeId: item.systemSubModuleContextTypeId!,
      actionType: FORM_ENUM.add,
      changeInitiatedBy: username!,
    }));

    const deletedPermissionDtoArray = deletedPermissions.map((item) => ({
      roleSystemModuleContextPermissionId:
        item.roleSystemModuleContextPermissionId,
      roleId: role.roleId,
      systemModuleContextTypeId: item.systemModuleContextTypeId!,
      systemSubModuleContextTypeId: item.systemSubModuleContextTypeId!,
      actionType: FORM_ENUM.delete,
      changeInitiatedBy: username!,
    }));

    const allPermissionDto = [
      ...deletedPermissionDtoArray,
      ...newPermissionDtoArray,
    ];

    const response = await handleSubmit(
      updateRolePermission,
      {
        updateRoleDto: {
          roleId: role.roleId,
          lastModifiedBy: username!,
        },
        updateRoleSystemModuleContextPermissionDtos: allPermissionDto,
      },
      ''
    );
    if (response?.data) {
      onOpen();
    }
  };

  return (
    <>
      <Flex width="full" direction="column" pb="24px">
        <VStack width="full" spacing="32px" alignItems="flex-start">
          <PageHeader>Role Permissions</PageHeader>
          <VStack spacing="24px" width="full">
            <VStack spacing={0} width="full">
              <RoleInfo role={role} />
              <Permissions />
              {permissionError && (
                <Flex width="full" mt="4px">
                  <ErrorMessage>{permissionError}</ErrorMessage>
                </Flex>
              )}
            </VStack>
            <HStack width="full" justifyContent="space-between">
              <Button
                variant="secondary"
                customStyles={{ width: '96px' }}
                href={`/${ROUTES.ROLES}`}
              >
                Back
              </Button>
              <Button
                type="submit"
                customStyles={{ width: '161px' }}
                handleClick={() => handleUpdateRolePermissions()}
                isLoading={isLoading}
              >
                Save Changes
              </Button>
            </HStack>
          </VStack>
        </VStack>
      </Flex>
      <GenericSuccessModal
        isOpen={isOpen}
        onClose={() => router.push(`${ROUTES.ROLES}`)}
        successText="Role and Permissions Updated Successfully"
        mainModalStyle={{ closeOnOverlayClick: false, closeOnEsc: false }}
      >
        <Button
          customStyles={{ width: '193px' }}
          handleClick={() => router.push(`/${ROUTES.ROLES}`)}
        >
          Continue
        </Button>
      </GenericSuccessModal>
    </>
  );
};

export default RoleDetails;
