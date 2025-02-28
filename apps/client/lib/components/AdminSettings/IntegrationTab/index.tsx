import { StackDivider, VStack } from '@chakra-ui/react';
import React from 'react';
import APIWebhook from './APIWebhook';
import ThirdParty from './ThirdParty';

const IntegrationTab = () => {
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
        <APIWebhook />
        <ThirdParty />
      </VStack>
    </VStack>
  );
};

export default IntegrationTab;
