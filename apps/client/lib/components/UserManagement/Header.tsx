import { HStack, Icon, Stack } from '@chakra-ui/react';

import { Button } from '@repo/ui/components';
import PageHeader from '../UI/PageHeader';
import { AddIcon } from '../CustomIcons';
import { ROUTES } from '~/lib/utils/constants';
import usePermissionAccess from '~/lib/hooks/useRoleAccess';

const Header = () => {
  const canCreateUser = usePermissionAccess('user:create');
  return (
    <Stack
      width="full"
      justifyContent="space-between"
      spacing="10px"
      px={{ base: '16px', md: 0 }}
      direction={{ base: 'column', md: 'row' }}
    >
      <PageHeader>User Management</PageHeader>
      {canCreateUser && (
        <Button
          customStyles={{
            width: 'max-content',
            px: '16px',
            height: { base: '36px', md: 'min-content' },
            alignSelf: 'end',
          }}
          href={`/${ROUTES.USERS}/add`}
        >
          <Icon as={AddIcon} boxSize="18px" color="#D2FEFD" mr="4px" />
          Add New User
        </Button>
      )}
    </Stack>
  );
};

export default Header;
