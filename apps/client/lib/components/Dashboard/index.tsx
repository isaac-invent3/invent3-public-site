'use client';

import { Flex } from '@chakra-ui/react';
import React from 'react';
// import OperationManager from './OperationManager';
// import FrontDesk from './FrontDesk';
// import FieldEngineer from './FieldEngineer';
import ClientAdmin from './ClientAdmin';

const Dashboard = () => {
  return (
    <Flex width="full" direction="column">
      {/* <OperationManager /> */}
      {/* <FrontDesk /> */}
      {/* <FieldEngineer /> */}
      <ClientAdmin />
    </Flex>
  );
};

export default Dashboard;
