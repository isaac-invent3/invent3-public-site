import { StackDivider, VStack } from '@chakra-ui/react';
import React from 'react';
import LoginSecurity from './LoginSecurity';
import PasswordPolicy from './PasswordPolicy';

const SecurityAuthentication = () => {
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
        <LoginSecurity />
        <PasswordPolicy />
      </VStack>
    </VStack>
  );
};

export default SecurityAuthentication;
