import React from 'react';
import Header from '../Header';
import { Flex, VStack } from '@chakra-ui/react';
import SectionOne from './SectionOne';
import SectionTwo from './SectionTwo';
import SectionFour from './SectionFour';
import SectionFive from './SectionFive';
import SectionThree from './SectionThree';

const Executive = () => {
  return (
    <Flex width="full" direction="column" pb="24px">
      <Header />
      <VStack width="full" mt="32px" spacing="16px">
        <SectionOne />
        <SectionTwo />
        <SectionThree />
        <SectionFour />
        <SectionFive />
      </VStack>
    </Flex>
  );
};

export default Executive;
