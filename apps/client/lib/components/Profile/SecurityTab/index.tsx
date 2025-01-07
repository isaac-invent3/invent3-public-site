import { VStack } from '@chakra-ui/react';
import React from 'react';
import Email from './Email';
import Password from './Password';
import TwoStepVerification from './TwoStepVerification';
import DeactivateAccount from './DeactivateAccount';
import DeleteAccount from './DeleteAccount';

const SecurityTab = () => {
  return (
    <VStack
      spacing="24px"
      width="full"
      alignItems="flex-start"
      bgColor="white"
      p="24px"
      pt="32px"
      rounded="6px"
      minH="60vh"
    >
      <Email />
      <Password />
      <TwoStepVerification />
      <DeactivateAccount />
      <DeleteAccount />
    </VStack>
  );
};

export default SecurityTab;
