import { Icon, Stack } from '@chakra-ui/react';
import usePermissionAccess from '~/lib/hooks/useRoleAccess';
import PageHeader from '../UI/PageHeader';
import { ROLE_IDS_ENUM, ROUTES } from '~/lib/utils/constants';
import ActionButtonPopover from '../UI/ActionButtonsPopover';
import { useSession } from 'next-auth/react';
import { Button } from '@repo/ui/components';
import { AddIcon } from '../CustomIcons';

const Header = () => {
  const canCreateCompany = usePermissionAccess('company:create');
  const session = useSession();
  const user = session?.data?.user;
  return (
    <Stack
      width="full"
      justifyContent="space-between"
      direction={{ base: 'column', sm: 'row' }}
      spacing="16px"
      px={{ base: '16px', md: 0 }}
    >
      <PageHeader>Company Management</PageHeader>

      {canCreateCompany &&
        (user?.roleIds.includes(ROLE_IDS_ENUM.THIRD_PARTY) ? (
          <Button
            customStyles={{
              width: '184px',
              height: { base: '36px', md: 'min-content' },
              alignSelf: 'end',
            }}
            href={`/${ROUTES.COMPANY}/add`}
          >
            <Icon as={AddIcon} boxSize="18px" color="#D2FEFD" mr="4px" />
            Add New Company
          </Button>
        ) : (
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
            actionsContainerStyle={{
              spacing: '24px',
              alignItems: 'flex-start',
            }}
          />
        ))}
    </Stack>
  );
};

export default Header;
