'use client';

import { Flex } from '@chakra-ui/react';
import React from 'react';
import Hero from './Hero';
import Explore from './Explore';
import Features from './Features';
import Benefits from './Benefits';
import CTA from './CallToAction';
import FAQ from './FAQ';

const LandingPage = () => {
  return (
    <Flex direction="column" bgColor="#FFFFFF">
      <Hero />
      <Explore />
      <Features />
      <Benefits />
      <FAQ />
      <CTA />
    </Flex>
  );
};

export default LandingPage;
