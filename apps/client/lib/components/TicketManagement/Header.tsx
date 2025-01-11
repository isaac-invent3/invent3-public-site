import { HStack, Icon, useDisclosure } from '@chakra-ui/react';
import { AddIcon } from '../CustomIcons';
import { Button } from '@repo/ui/components';
import PageHeader from '../UI/PageHeader';
import CreateTicketDrawer from './Drawers/CreateTicketDrawer';

const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <HStack width="full" justifyContent="space-between">
        <PageHeader>Ticket Management</PageHeader>
        <Button handleClick={onOpen} customStyles={{ width: '186px' }}>
          <Icon as={AddIcon} boxSize="18px" color="#D2FEFD" mr="4px" />
          Add New Ticket
        </Button>
      </HStack>

      {isOpen && <CreateTicketDrawer isOpen={isOpen} onClose={onClose} />}
    </>
  );
};

export default Header;
