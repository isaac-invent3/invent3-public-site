import { HStack, Icon } from '@chakra-ui/react';

import { Button } from '@repo/ui/components';
import PageHeader from '../UI/PageHeader';
import { AddIcon } from '../CustomIcons';
import { ROUTES } from '~/lib/utils/constants';
import usePermissionAccess from '~/lib/hooks/useRoleAccess';

const Header = () => {
  const canCreateVendor = usePermissionAccess('vendor:create');
  return (
    <HStack width="full" justifyContent="space-between">
      <PageHeader>Vendor Management</PageHeader>
      {canCreateVendor && (
        <Button
          customStyles={{ width: 'max-content', px: '16px' }}
          href={`/${ROUTES.VENDOR}/add`}
        >
          <Icon as={AddIcon} boxSize="18px" color="#D2FEFD" mr="4px" />
          Add New Vendor
        </Button>
      )}
    </HStack>
  );
};

export default Header;
