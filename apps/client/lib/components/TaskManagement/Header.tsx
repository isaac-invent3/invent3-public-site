import { HStack, Icon } from '@chakra-ui/react';

import PageHeader from '../UI/PageHeader';
import { Button } from '@repo/ui/components';
import { AddIcon } from '../CustomIcons';

const Header = () => {
  return (
    <HStack width="full" justifyContent="space-between">
      <PageHeader>Task Management</PageHeader>
      <Button customStyles={{ width: '227px' }} href="/task-management/add">
        <Icon as={AddIcon} boxSize="18px" color="#D2FEFD" mr="4px" />
        Add New Task
      </Button>
    </HStack>
  );
};

export default Header;
