import { HStack, Stack } from '@chakra-ui/react';
import React from 'react';
import PageHeader from '../../UI/PageHeader';
import { Button } from '@repo/ui/components';
import ExportButtonPopover from '../../Feedback/Common/ExportButtonPopover';

const Header = () => {
  return (
    <Stack
      width="full"
      justifyContent="space-between"
      direction={{ base: 'column', sm: 'row' }}
      spacing="16px"
      px={{ base: '16px', md: 0 }}
    >
      <PageHeader>Cross-Facility Lifecycle Comparison</PageHeader>
      <HStack spacing="16px">
        <Button
          customStyles={{ width: 'max-content', height: '38px' }}
          variant="secondary"
        >
          Schedule Comparison
        </Button>
        <ExportButtonPopover />
      </HStack>
    </Stack>
  );
};

export default Header;
