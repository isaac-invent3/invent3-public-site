'use client';
import React from 'react';
import { Flex } from '@chakra-ui/react';
import HeroHeader from '../Common/HeroHeader';
import CoreFeatures from './CoreFeatures';
import HowItWorks from './HowItWorks';
import AIAutomation from './AIAutomation';
import TheInvent3Advantage from './TheInvent3Advantage';
import OurIntegrations from './OurIntegrations';
import Industries from './Industries';
import DataSecurity from './DataSecurity';
import CTA from './CTA';

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
      <AIAutomation />
      <TheInvent3Advantage />
      <OurIntegrations />
      <Industries />
      <DataSecurity />
      <CTA />
    </Flex>
  );
};

export default Solutions;
