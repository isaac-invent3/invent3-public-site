import { StackDivider, VStack } from '@chakra-ui/react';
import React from 'react';
import LoggingPreference from './LoggingPreferences';
import ExportSettings from './ExportSettings';

const AuditTab = () => {
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
        <LoggingPreference />
        <ExportSettings />
      </VStack>
    </VStack>
  );
};

export default AuditTab;
