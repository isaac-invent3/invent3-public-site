'use client';

import { Flex } from '@chakra-ui/react';
import React from 'react';
import CEOMessage from './CEOMessage';
import MissionVision from './MissionVision';
import OurStrategy from './Strategy';
import WhyUs from './WhyUs';
import HeroHeader from '../Common/HeroHeader';

const AboutUs = () => {
  return (
    <Flex direction="column">
      <HeroHeader
        title="Empowering Businesses with Smarter Asset Management"
        subtitle="At Invent3.ai, we believe in revolutionizing asset and facility management through AI-driven automation. Our mission is to help businesses streamline operations, reduce downtime, and maximize asset value with cutting-edge technology."
        customHeading={{ maxW: '617px' }}
        containerStyle={{ spacing: { base: '16px', lg: '24px' } }}
        subTitleStyle={{ maxW: { lg: '617px' } }}
        bgDesktop="/about-hero-desktop.png"
        bgMobile="/about-hero-mobile.png"
      />
      <CEOMessage />
      <MissionVision />
      <OurStrategy />
      <WhyUs />
    </Flex>
  );
};

export default AboutUs;
