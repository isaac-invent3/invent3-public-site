import { HStack, Icon } from '@chakra-ui/react';

import PageHeader from '../UI/PageHeader';
import { Button } from '@repo/ui/components';
import { AddIcon } from '../CustomIcons';
import { ROUTES } from '~/lib/utils/constants';

const Header = () => {
  return (
    <HStack width="full" justifyContent="space-between">
      <PageHeader>Task Management</PageHeader>
      <Button customStyles={{ width: '227px' }} href={`/${ROUTES.TASKS}/add`}>
        <Icon as={AddIcon} boxSize="18px" color="#D2FEFD" mr="4px" />
        Add New Task
      </Button>
    </HStack>
  );
};

export default Header;
