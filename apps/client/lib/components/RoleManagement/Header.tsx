import { HStack, Icon } from '@chakra-ui/react';

import { Button } from '@repo/ui/components';
import PageHeader from '../UI/PageHeader';
import { AddIcon } from '../CustomIcons';

const Header = () => {
  return (
    <HStack width="full" justifyContent="space-between">
      <PageHeader>Role Management</PageHeader>
      <Button customStyles={{ width: '146px' }}>
        <Icon as={AddIcon} boxSize="18px" color="#D2FEFD" mr="4px" />
        Add New Role
      </Button>
    </HStack>
  );
};

export default Header;
