import { HStack, Stack } from '@chakra-ui/react';
import React from 'react';
import PageHeader from '../../UI/PageHeader';
import { Button } from '@repo/ui/components';

const Header = () => {
  return (
    <Stack
      width="full"
      justifyContent="space-between"
      direction={{ base: 'column', md: 'row' }}
      spacing="16px"
      px={{ base: '16px', md: 0 }}
    >
      <PageHeader>Predicted Failures Schedule</PageHeader>
      <HStack spacing="18px" flexWrap="wrap">
        <Button
          variant="secondary"
          customStyles={{
            width: 'min-content',
            height: { base: '36px', md: 'min-content' },
          }}
        >
          Manual Predictive Data Input
        </Button>
        <Button
          customStyles={{
            width: '215px',
            height: { base: '36px', md: 'min-content' },
          }}
        >
          Download Schedule
        </Button>
      </HStack>
    </Stack>
  );
};

export default Header;
