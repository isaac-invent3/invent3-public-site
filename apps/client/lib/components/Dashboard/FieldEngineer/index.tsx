import React from 'react';
import Header from '../Header';
import { Flex, VStack } from '@chakra-ui/react';
import SectionTwo from './SectionTwo';
import SectionOne from './SectionOne';

const FieldEngineer = () => {
  return (
    <Flex width="full" direction="column" pb="24px">
      <Header />
      <VStack width="full" mt="32px" spacing="16px">
        <SectionOne />
        <SectionTwo />
      </VStack>
    </Flex>
  );
};

export default FieldEngineer;
