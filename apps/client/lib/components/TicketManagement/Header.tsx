import { HStack, Icon, useDisclosure, VStack } from '@chakra-ui/react';
import { AddIcon } from '../CustomIcons';
import GenericBreadCrumb from '../UI/BreadCrumb';
import PrimaryButton from '../UI/Button';
import PageHeader from '../UI/PageHeader';
import CreateTicketDrawer from './Drawers/CreateTicketDrawer';

const breadCrumbData = [
  {
    label: 'Dashboard',
    route: '/',
  },
  {
    label: 'Ticket Management',
    route: '#',
  },
];

const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <VStack spacing="58px" alignItems="flex-start" width="full" pt="12px">
      <GenericBreadCrumb routes={breadCrumbData} />
      <HStack width="full" justifyContent="space-between">
        <PageHeader>Ticket Management</PageHeader>
        <PrimaryButton handleClick={onOpen} customStyles={{ width: '186px' }}>
          <Icon as={AddIcon} boxSize="18px" color="#D2FEFD" mr="4px" />
          Add New Ticket
        </PrimaryButton>
      </HStack>

      {isOpen && <CreateTicketDrawer isOpen={isOpen} onClose={onClose} />}
    </VStack>
  );
};

export default Header;
