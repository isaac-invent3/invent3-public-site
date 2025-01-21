'use client';

import { Flex } from '@chakra-ui/react';
import React from 'react';
// import OperationManager from './OperationManager';
import FrontDesk from './FrontDesk';

const Dashboard = () => {
  return (
    <Flex width="full" direction="column">
      {/* <OperationManager /> */}
      <FrontDesk />
    </Flex>
  );
};

export default Dashboard;
