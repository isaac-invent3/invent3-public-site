import { Icon, Stack, useDisclosure } from '@chakra-ui/react';
import { Button } from '@repo/ui/components';
import usePermissionAccess from '~/lib/hooks/useRoleAccess';
import { AddIcon } from '../CustomIcons';
import PageHeader from '../UI/PageHeader';
import { ROUTES } from '~/lib/utils/constants';

const Header = () => {
  const canCreateCompany = usePermissionAccess('company:create');
  const { isOpen, onClose, onOpen } = useDisclosure();
  return (
    <Stack
      width="full"
      justifyContent="space-between"
      direction={{ base: 'column', sm: 'row' }}
      spacing="16px"
      px={{ base: '16px', md: 0 }}
    >
      <PageHeader>Company Management</PageHeader>

      {!canCreateCompany && (
        <Button
          handleClick={onOpen}
          href={`/${ROUTES.ASSETS}/add`}
          customStyles={{
            width: '186px',
            height: { base: '36px', md: '50px' },
            alignSelf: { base: 'flex-end', md: 'initial' },
          }}
        >
          <Icon as={AddIcon} boxSize="18px" color="#D2FEFD" mr="4px" />
          Add New Company
        </Button>
      )}
    </Stack>
  );
};

export default Header;
