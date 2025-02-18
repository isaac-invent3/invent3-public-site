import { StackDivider, VStack } from '@chakra-ui/react';
import React from 'react';
import ScheduledMaintenance from './ScheduledMaintenance';
import BackupRestore from './BackupRestore';

const SystemMaintenanceBackupTab = () => {
  return (
    <VStack spacing="24px" width="full" alignItems="flex-end">
      <VStack
        spacing="32px"
        width="full"
        alignItems="flex-start"
        bgColor="white"
        p={{ base: '16px', md: '24px' }}
        pt={{ base: '23px', lg: '35px' }}
        rounded={{ md: '6px' }}
        minH={{ base: '60vh' }}
        divider={<StackDivider borderColor="#BBBBBB" />}
      >
        <ScheduledMaintenance />
        <BackupRestore />
      </VStack>
    </VStack>
  );
};

export default SystemMaintenanceBackupTab;
