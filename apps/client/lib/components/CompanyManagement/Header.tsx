import { Stack } from '@chakra-ui/react';
import usePermissionAccess from '~/lib/hooks/useRoleAccess';
import PageHeader from '../UI/PageHeader';
import { ROUTES } from '~/lib/utils/constants';
import ActionButtonPopover from '../UI/ActionButtonsPopover';

const Header = () => {
  const canCreateCompany = usePermissionAccess('company:create');
  return (
    <Stack
      width="full"
      justifyContent="space-between"
      direction={{ base: 'column', sm: 'row' }}
      spacing="16px"
      px={{ base: '16px', md: 0 }}
    >
      <PageHeader>Company Management</PageHeader>

      {!canCreateCompany && (
        <ActionButtonPopover
          actions={[
            {
              label: 'Manage Own Data',
              route: `/${ROUTES.COMPANY}/add`,
            },
            {
              label: 'Manage Data by other Companies',
              route: `/${ROUTES.COMPANY}/add/manage-data`,
            },
          ]}
          buttonLabel="Add New Company"
          actionsContainerStyle={{ spacing: '24px', alignItems: 'flex-start' }}
        />
      )}
    </Stack>
  );
};

export default Header;
