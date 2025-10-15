'use client';

import { Flex } from '@chakra-ui/react';
import React from 'react';
import Hero from './Hero';
import CTA from '../Common/CallToAction';
import FaqAccordion from './FaqAccordion';

const FAQ = () => {
  return (
    <Flex direction="column">
      <Hero />
      <FaqAccordion />
      <CTA />
    </Flex>
  );
};

export default FAQ;
