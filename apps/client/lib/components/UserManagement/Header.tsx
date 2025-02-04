import { HStack, Icon } from '@chakra-ui/react';

import { Button } from '@repo/ui/components';
import PageHeader from '../UI/PageHeader';
import { AddIcon } from '../CustomIcons';
import { ROUTES } from '~/lib/utils/constants';
import usePermissionAccess from '~/lib/hooks/useRoleAccess';

const Header = () => {
  const canCreateUser = usePermissionAccess('user:create');
  return (
    <HStack width="full" justifyContent="space-between">
      <PageHeader>User Management</PageHeader>
      {canCreateUser && (
        <Button customStyles={{ width: '146px' }} href={`/${ROUTES.USERS}/add`}>
          <Icon as={AddIcon} boxSize="18px" color="#D2FEFD" mr="4px" />
          Add New User
        </Button>
      )}
    </HStack>
  );
};

export default Header;
