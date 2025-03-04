import { Flex } from '@chakra-ui/react';
import React from 'react';
import Detail from './Detail';
import ContactForm from './ContactForm';

const GetInTouch = () => {
  return (
    <Flex justifyContent="center" width="full">
      <Flex
        width="full"
        justifyContent="space-between"
        alignItems="flex-start"
        pt={{ base: '40px', lg: '120px' }}
        pb="40px"
        px={{ base: '16px', md: '40px', '2xl': '80px' }}
        maxW="1440px"
        position="relative"
        direction={{ base: 'column', lg: 'row' }}
        gap={{ base: '40px', lg: '80px', xl: '188px' }}
      >
        <Flex width={{ base: 'full', lg: '46%' }}>
          <Detail />
        </Flex>
        <Flex width={{ base: 'full', lg: '54%' }}>
          <ContactForm />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default GetInTouch;
