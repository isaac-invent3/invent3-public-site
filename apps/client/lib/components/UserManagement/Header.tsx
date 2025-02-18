import { Stack } from '@chakra-ui/react';
import PageHeader from '../UI/PageHeader';
import { ROUTES } from '~/lib/utils/constants';
import usePermissionAccess from '~/lib/hooks/useRoleAccess';
import ActionButtonPopover from '../UI/ActionButtonsPopover';

const Header = () => {
  const canCreateUser = usePermissionAccess('user:create');
  return (
    <Stack
      width="full"
      justifyContent="space-between"
      direction={{ base: 'column', sm: 'row' }}
      spacing="16px"
      px={{ base: '16px', md: 0 }}
    >
      <PageHeader>User Management</PageHeader>
      {canCreateUser && (
        <ActionButtonPopover
          actions={[
            {
              label: 'Create a New User',
              route: `/${ROUTES.USERS}/add`,
            },
            {
              label: 'Create User from Active Directory',
              route: `/${ROUTES.USERS}/add`,
            },
          ]}
          buttonLabel="Add New User"
          actionsContainerStyle={{ spacing: '24px', alignItems: 'flex-start' }}
        />
      )}
    </Stack>
  );
};

export default Header;
