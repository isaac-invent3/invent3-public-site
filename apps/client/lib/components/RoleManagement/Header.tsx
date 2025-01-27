import { HStack, Icon } from '@chakra-ui/react';

import { Button } from '@repo/ui/components';
import PageHeader from '../UI/PageHeader';
import { AddIcon } from '../CustomIcons';
import { ROUTES } from '~/lib/utils/constants';

const Header = ({ type }: { type: 'role' | 'group' }) => {
  const isRole = type === 'role';
  return (
    <HStack width="full" justifyContent="space-between">
      <PageHeader>Role Management</PageHeader>
      <Button
        customStyles={{ width: '146px' }}
        href={`/${ROUTES.ROLES}/${isRole ? 'role' : 'group'}/add`}
      >
        <Icon as={AddIcon} boxSize="18px" color="#D2FEFD" mr="4px" />
        Add New {isRole ? 'Role' : 'Group'}
      </Button>
    </HStack>
  );
};

export default Header;
