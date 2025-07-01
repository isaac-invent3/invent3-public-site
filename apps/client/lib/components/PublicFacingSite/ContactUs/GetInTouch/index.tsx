import { Flex } from '@chakra-ui/react';
import React from 'react';
import ContactForm from './ContactForm';
import Image from 'next/image';

const GetInTouch = () => {
  return (
    <Flex justifyContent="center" width="full">
      <Flex
        width="full"
        justifyContent="space-between"
        alignItems="flex-start"
        pt={{ base: '80px', lg: '120px' }}
        px={{ base: '16px', md: '40px', '2xl': '80px' }}
        maxW="1440px"
        position="relative"
        direction={{ base: 'column', lg: 'row' }}
        gap={{ base: '40px', lg: '87px' }}
      >
        <Flex width={{ base: 'full', lg: '46%' }}>
          <Flex
            position="relative"
            height={{ base: '240px', lg: '472px' }}
            width="full"
            maxW={{ base: '350px', lg: '518px' }}
          >
            <Image src="/contact-us.svg" alt="contact-us" fill />
          </Flex>
        </Flex>
        <Flex width={{ base: 'full', lg: '54%' }}>
          <ContactForm />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default GetInTouch;
