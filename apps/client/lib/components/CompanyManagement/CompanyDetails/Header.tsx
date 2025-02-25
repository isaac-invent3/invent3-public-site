'use client';
import { Stack } from '@chakra-ui/react';
import { Button } from '@repo/ui/components';
import PageHeader from '../../UI/PageHeader';

const Header = () => {
  return (
    <Stack
      width="full"
      direction={{ base: 'column', sm: 'row' }}
      spacing="16px"
      justifyContent="space-between"
    >
      <PageHeader>Company Detail</PageHeader>
      <Stack direction={{ base: 'column', sm: 'row' }} spacing="8px">
        <Button>Edit Company</Button>
        <Button variant="outline" customStyles={{ px: '32px' }}>
          Manage Subscription
        </Button>
        <Button variant="secondary">Deactivate</Button>
      </Stack>
    </Stack>
  );
};

export default Header;
