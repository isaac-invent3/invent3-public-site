import React from 'react';
import Header from '../Header';
import { Flex, VStack } from '@chakra-ui/react';
import SectionOne from './SectionOne';
import SectionTwo from './SectionTwo';
import SectionThree from './SectionThree';

const SuperAdmin = () => {
  return (
    <Flex width="full" direction="column" pb="24px">
      <Header />
      <VStack width="full" mt="44px" spacing="16px">
        <SectionOne />
        <SectionTwo />
        <SectionThree />
      </VStack>
    </Flex>
  );
};

export default SuperAdmin;
