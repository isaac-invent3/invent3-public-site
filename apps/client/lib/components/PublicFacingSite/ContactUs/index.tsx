'use client';

import { Flex } from '@chakra-ui/react';
import React from 'react';
import Hero from './Hero';
import Actions from './Actions';
import GetInTouch from './GetInTouch';

const ContactUs = () => {
  return (
    <Flex direction="column">
      <Hero />
      <Actions />
      <GetInTouch />
    </Flex>
  );
};

export default ContactUs;
