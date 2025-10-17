import { HStack, Icon, Stack, useDisclosure } from '@chakra-ui/react';
import { Button } from '@repo/ui/components';
import PageHeader from '../../UI/PageHeader';
import { AddIcon } from '../../CustomIcons';
import AIConfigurationPanelDrawer from './AIConfigurationPanelDrawer.tsx';

const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Stack
        width="full"
        justifyContent="space-between"
        direction={{ base: 'column', md: 'row' }}
        spacing="16px"
        px={{ base: '16px', md: 0 }}
      >
        <PageHeader>AI-Based Ticket Balancing</PageHeader>
        <HStack spacing="16px">
          <Button
            handleClick={onOpen}
            customStyles={{
              width: '196px',
              height: { base: '36px', md: '50px' },
              alignSelf: { base: 'flex-end', md: 'initial' },
            }}
            variant="outline"
          >
            Configure Balancing Rules
          </Button>
          <Button
            handleClick={onOpen}
            customStyles={{
              width: '186px',
              height: { base: '36px', md: '50px' },
              alignSelf: { base: 'flex-end', md: 'initial' },
            }}
          >
            <Icon as={AddIcon} boxSize="18px" color="#D2FEFD" mr="4px" />
            Rebalance Now
          </Button>
        </HStack>
      </Stack>

      {isOpen && (
        <AIConfigurationPanelDrawer isOpen={isOpen} onClose={onClose} />
      )}
    </>
  );
};

export default Header;
