'use client';

import { Flex } from '@chakra-ui/react';
import React, { useEffect } from 'react';
// import OperationManager from './OperationManager';
// import FrontDesk from './FrontDesk';
// import FieldEngineer from './FieldEngineer';
// import ClientAdmin from './ClientAdmin';
import SuperAdmin from './SuperAdmin';
import usePermissionAccess from '~/lib/hooks/useRoleAccess';

const Dashboard = () => {
  const hasDashboardAccess = usePermissionAccess('asset');
  useEffect(() => {
    console.log({ hasDashboardAccess });
  }, [hasDashboardAccess]);

  return (
    <Flex width="full" direction="column">
      {/* <OperationManager /> */}
      {/* <FrontDesk /> */}
      {/* <FieldEngineer /> */}
      {/* <ClientAdmin /> */}
      <SuperAdmin />
    </Flex>
  );
};

export default Dashboard;
