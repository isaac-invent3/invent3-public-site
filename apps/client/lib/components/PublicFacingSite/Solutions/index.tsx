'use client';
import React from 'react';
import { Flex } from '@chakra-ui/react';
import HeroHeader from '../Common/HeroHeader';
import CoreFeatures from './CoreFeatures';
import DataSecurity from '../LandingPage/DataSecurity';
import LandingPageSolutions from '../LandingPage/Solutions';
import CTA from '../Common/CallToAction';
import OurIntegrations from '../LandingPage/OurIntegrations';
import About from '../LandingPage/About';
import HowItWorks from './HowItWorks';

const Solutions = () => {
  return (
    <Flex direction="column">
      <HeroHeader
        title="The Ultimate Asset & Facility Management Solution"
        subtitle="From real-time asset tracking to AI-powered maintenance automation, Invent3Pro transforms how businesses manage their most valuable resources. See how our platform gives you complete control over your operations"
        customHeading={{ maxW: '617px' }}
        containerStyle={{ spacing: { base: '16px', lg: '24px' } }}
        subTitleStyle={{ maxW: { lg: '617px' } }}
        bgDesktop="/solutions-hero-desktop.png"
        bgMobile="/solutions-hero-mobile.png"
      />
      <CoreFeatures />
      <HowItWorks />
      <About image="/solution-about-image.png" animate={false} />
      <OurIntegrations />
      <LandingPageSolutions animate={false} />
      <DataSecurity customStyles={{ pt: { base: '107px', lg: '0px' } }} />
      <CTA />
    </Flex>
  );
};

export default Solutions;
