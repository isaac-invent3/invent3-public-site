'use client';

import { Flex, VStack } from '@chakra-ui/react';
import PageHeader from '../../UI/PageHeader';
import { Role } from '~/lib/interfaces/role.interfaces';
import RoleInfo from './RoleInfo';
import Permissions from '../Permissions';

interface RoleDetailsProps {
  role: Role;
}
const RoleDetails = ({ role }: RoleDetailsProps) => {
  return (
    <Flex width="full" direction="column" pb="24px">
      <VStack width="full" spacing="32px" alignItems="flex-start">
        <PageHeader>Role Permissions</PageHeader>
        <VStack spacing="24px" width="full">
          <VStack spacing={0} width="full">
            <RoleInfo role={role} />
            <Permissions />
          </VStack>
        </VStack>
      </VStack>
    </Flex>
  );
};

export default RoleDetails;
