import { SimpleGrid } from '@chakra-ui/react';
import React from 'react';
import Detail from './Detail';
import Steps from './Steps';
import { Button } from '@repo/ui/components';

const HowItWorks = () => {
  return (
    <SimpleGrid
      width="full"
      columns={{ base: 1, lg: 2 }}
      gap={{ base: '40px', lg: '158px' }}
    >
      <Detail />
      <Steps />
      <Button
        customStyles={{
          width: { base: 'full', sm: '174px' },
          display: { base: 'flex', lg: 'none' },
        }}
        href="/waitlist"
      >
        Get Started
      </Button>
    </SimpleGrid>
  );
};

export default HowItWorks;
