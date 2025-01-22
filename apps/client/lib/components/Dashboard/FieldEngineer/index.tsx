import React from 'react';
import Header from '../Header';
import { Flex, VStack } from '@chakra-ui/react';

const FieldEngineer = () => {
  return (
    <Flex width="full" direction="column" pb="24px">
      <Header />
      <VStack width="full" mt="32px" spacing="16px" />
    </Flex>
  );
};

export default FieldEngineer;
