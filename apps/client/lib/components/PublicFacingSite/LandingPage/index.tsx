'use client';

import { Flex } from '@chakra-ui/react';
import React from 'react';
import Hero from './Hero';
import Explore from './Explore';
import Features from './Features';
import Benefits from './Benefits';
import CTA from '../Common/CallToAction';
import FaqAccordion from '../FAQ/FaqAccordion';

const LandingPage = () => {
  return (
    <Flex direction="column" bgColor="#FFFFFF">
      <Hero />
      <Explore />
      <Features />
      <Benefits />
      <FaqAccordion />
      <CTA />
    </Flex>
  );
};

export default LandingPage;
