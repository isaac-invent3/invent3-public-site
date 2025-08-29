import { Icon, Stack } from '@chakra-ui/react';
import PageHeader from '../UI/PageHeader';
import { ROUTES } from '~/lib/utils/constants';
import usePermissionAccess from '~/lib/hooks/useRoleAccess';
import { Button } from '@repo/ui/components';
import { AddIcon } from '../CustomIcons';

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
        <Button
          customStyles={{
            width: '184px',
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
