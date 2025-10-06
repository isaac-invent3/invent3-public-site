'use client';

import { Flex } from '@chakra-ui/react';
import React from 'react';
import Header from './Header';
import Filters from './Filters';
import Summary from './Summary';
import SectionThree from './SectionThree';
import SectionFour from './SectionFour';

const LifecyleComparison = () => {
  return (
    <Flex width="full" direction="column" gap="25px" pb="24px">
      <Header />
      <Flex
        width="full"
        direction="column"
        gap="16px"
        px={{ base: '16px', md: 0 }}
      >
        <Filters />
        <Summary />
        <SectionThree />
        <SectionFour />
      </Flex>
    </Flex>
  );
};

export default LifecyleComparison;
