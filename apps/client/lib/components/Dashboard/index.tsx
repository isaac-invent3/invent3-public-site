'use client';

import { Flex } from '@chakra-ui/react';
import React from 'react';
import PageHeader from '../UI/PageHeader';

const Dashboard = () => {
  return (
    <Flex width="full" direction="column" mt="117px">
      <PageHeader>Dashboard</PageHeader>
    </Flex>
  );
};

export default Dashboard;
