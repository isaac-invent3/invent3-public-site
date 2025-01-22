'use client';

import { Flex } from '@chakra-ui/react';
import React from 'react';
// import OperationManager from './OperationManager';
import FrontDesk from './FrontDesk';
import FieldEngineer from './FieldEngineer';

const Dashboard = () => {
  return (
    <Flex width="full" direction="column">
      {/* <OperationManager /> */}
      <FrontDesk />
      <FieldEngineer />
    </Flex>
  );
};

export default Dashboard;
