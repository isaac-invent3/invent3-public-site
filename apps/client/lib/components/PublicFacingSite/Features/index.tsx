'use client';

import { Flex } from '@chakra-ui/react';
import React from 'react';
import Hero from './Hero';
import CTA from '../Common/CallToAction';
import FeatureItems from './FeatureItems';
import HowItWorks from './HowItWorks';
import WhyChooseUs from './WhyChooseUs';

const Features = () => {
  return (
    <Flex direction="column" width="full" gap={{ base: '40px', lg: '120px' }}>
      <Hero />
      <Flex
        justifyContent="center"
        width="full"
        height="full"
        position="relative"
      >
        <Flex
          width="full"
          px={{ base: '16px', md: '40px', '2xl': '80px' }}
          maxW="1440px"
          position="relative"
          direction="column"
          gap={{ base: '40px', lg: '120px' }}
        >
          <FeatureItems />
          <HowItWorks />
          <WhyChooseUs />
        </Flex>
      </Flex>
      <CTA />
    </Flex>
  );
};

export default Features;
