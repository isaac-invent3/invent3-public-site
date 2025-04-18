import { Stack } from '@chakra-ui/react';
import React from 'react';
import PageHeader from '~/lib/components/UI/PageHeader';

const Header = () => {
  return (
    <Stack
      width="full"
      direction={{ base: 'column', lg: 'row' }}
      spacing="24px"
      justifyContent="space-between"
      alignItems="flex-start"
    >
      <PageHeader>BMS Dashboard</PageHeader>
    </Stack>
  );
};

export default Header;
