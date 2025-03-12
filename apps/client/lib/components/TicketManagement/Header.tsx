import { Icon, Stack, useDisclosure } from '@chakra-ui/react';
import { AddIcon } from '../CustomIcons';
import { Button } from '@repo/ui/components';
import PageHeader from '../UI/PageHeader';
import CreateTicketDrawer from './Drawers/CreateTicketDrawer';
import usePermissionAccess from '~/lib/hooks/useRoleAccess';

const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const canCreateTicket = usePermissionAccess('ticket:create');
  return (
    <>
      <Stack
        width="full"
        justifyContent="space-between"
        direction={{ base: 'column', sm: 'row' }}
        spacing="16px"
        px={{ base: '16px', md: 0 }}
      >
        <PageHeader>Ticket Management</PageHeader>
        {canCreateTicket && (
          <Button
            handleClick={onOpen}
            customStyles={{
              width: '186px',
              height: { base: '36px', md: '50px' },
              alignSelf: { base: 'flex-end', md: 'initial' },
            }}
          >
            <Icon as={AddIcon} boxSize="18px" color="#D2FEFD" mr="4px" />
            Add New Ticket
          </Button>
        )}
      </Stack>

      {isOpen && <CreateTicketDrawer isOpen={isOpen} onClose={onClose} />}
    </>
  );
};

export default Header;
