import { Icon, Stack } from '@chakra-ui/react';

import { Button } from '@repo/ui/components';
import usePermissionAccess from '~/lib/hooks/useRoleAccess';
import { ROUTES } from '~/lib/utils/constants';
import { AddIcon } from '../CustomIcons';
import PageHeader from '../UI/PageHeader';

const Header = () => {
  const canCreateTask = usePermissionAccess('task:create');
  return (
    <Stack
      width="full"
      justifyContent="space-between"
      direction={{ base: 'column', md: 'row' }}
      spacing="10px"
      px={{ base: '16px', md: 0 }}
    >
      <PageHeader>Task Management</PageHeader>
      {canCreateTask && (
        <Button
          customStyles={{
            width: '184px',
            height: { base: '36px', md: 'min-content' },
            alignSelf: 'end',
          }}
          href={`/${ROUTES.TASKS}/add`}
        >
          <Icon as={AddIcon} boxSize="18px" color="#D2FEFD" mr="4px" />
          Add New Task
        </Button>
      )}
    </Stack>
  );
};

export default Header;
