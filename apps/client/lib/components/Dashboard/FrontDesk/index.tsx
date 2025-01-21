import React from 'react';
import Header from '../Header';
import { Flex, VStack } from '@chakra-ui/react';
import SectionOne from './SectionOne';
import SectionTwo from './SectionTwo';
import SectionThree from './SectionThree';
import SectionFour from './SectionFour';

const FrontDesk = () => {
  return (
    <Flex width="full" direction="column" pb="24px">
      <Header />
      <VStack width="full" mt="32px" spacing="16px">
        <SectionOne />
        <SectionTwo />
        <SectionThree />
        <SectionFour />
      </VStack>
    </Flex>
  );
};

export default FrontDesk;
