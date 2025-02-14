import { Stack, Icon, useDisclosure } from '@chakra-ui/react';

import { Button } from '@repo/ui/components';
import PageHeader from '../UI/PageHeader';
import { AddIcon } from '../CustomIcons';
import { ROUTES } from '~/lib/utils/constants';
import usePermissionAccess from '~/lib/hooks/useRoleAccess';
import UserGroupDrawer from './UserGroup/UserGroupForm';

const Header = ({ type }: { type: 'role' | 'group' }) => {
  const isRole = type === 'role';
  const canAddRole = usePermissionAccess('role:create');
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Stack
        width="full"
        justifyContent="space-between"
        direction={{ base: 'column', md: 'row' }}
        spacing="10px"
        px={{ base: '16px', md: 0 }}
      >
        <PageHeader>Role Management</PageHeader>
        {canAddRole && (
          <Button
            customStyles={{
              width: '146px',
              height: { base: '36px', md: 'min-content' },
              alignSelf: 'end',
            }}
            {...(type === 'role' ? { href: `/${ROUTES.ROLES}/role/add` } : {})}
            {...(type === 'group' ? { handleClick: onOpen } : {})}
          >
            <Icon as={AddIcon} boxSize="18px" color="#D2FEFD" mr="4px" />
            Add New {isRole ? 'Role' : 'Group'}
          </Button>
        )}
      </Stack>
      <UserGroupDrawer isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default Header;
