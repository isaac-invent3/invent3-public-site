'use client';

import { Flex } from '@chakra-ui/react';
import React from 'react';
import Header from './Header';
import Summary from './Summary';
import TechnicianLoadDistribution from './TechnicianLoadDistribution';
import TechnicianCharts from './TechnicianCharts';

const TicketBalancing = () => {
  return (
    <Flex
      id="lifecycle-page"
      width="full"
      direction="column"
      gap="25px"
      pb="24px"
    >
      <Header />
      <Flex
        width="full"
        direction="column"
        gap="16px"
        px={{ base: '16px', md: 0 }}
      >
        <Summary />
        <TechnicianLoadDistribution />
        <TechnicianCharts />
      </Flex>
    </Flex>
  );
};

export default TicketBalancing;
